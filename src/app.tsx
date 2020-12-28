import * as React from 'react';
import * as moment from 'moment';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/header';
import RouteService from './platform/services/routes';
import PageLoader from './components/page-loader';
import ROUTES from './platform/constants/routes';
import Storage from './platform/services/storage';
import Settings from './platform/services/settings';
import Footer from './components/footer';
import ConfirmModal from './components/confirm-modal';
import Socket from './platform/services/socket';
import HelperComponent from './platform/classes/helper-component';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './modules';

import 'moment/locale/hy-am';
import 'moment/locale/ru';
import 'moment/locale/en-gb';

import './assets/styles/index.scss';

interface IState {
  confirmOpen: boolean;
  confirmText: string;
  initialLoading: boolean;
  generalAPILoaded: boolean;
};

class App extends HelperComponent<{}, IState> {

  public state: IState = {
    generalAPILoaded: false,
    initialLoading: false,
    confirmOpen: false,
    confirmText: '',
  };

  public async componentDidMount() {
    //? Library config

    const alertify = await import('alertifyjs');
    moment.locale(Settings.shortCode);
    alertify.set('notifier','position', 'bottom-center');
    alertify.set('notifier','delay', 5);

    //? For SSR to fully load Browser API (general for 'window')

    window.abortableRequests = [];
    window.routerHistory = createBrowserHistory();
    window.routerHistory.listen(() => {
      if (location.pathname !== '/products') {
        setTimeout(() => {
          window.scrollTo(0, 0);
        })
      }
    });

    window.addEventListener(DispatcherChannels.ToggleConfirm, this.toggleConfirm);

    this.safeSetState({ generalAPILoaded: true });

    //? Seed

    try { await Socket.connect(); }
    catch { /* */ }

    //? Backend initial data fetch

    const success = await Storage.fetchDefault();
    if (success) this.safeSetState({ initialLoading: true });
    else window.location.reload();

    //? Check for invitation

    const query = new URLSearchParams(window.location.search);
    const referralCode = query.get('referral');
    if (referralCode) Settings.referralCode = referralCode;
  }

  private toggleConfirm = (e: CustomEvent) => {
    const { confirmOpen } = this.state;
    this.safeSetState({ confirmOpen: !confirmOpen, confirmText: e.detail || '' });
  }

  public render() {
    const { generalAPILoaded, initialLoading, confirmOpen, confirmText } = this.state;

    return generalAPILoaded ? (
      <Router history={window.routerHistory}>
        {initialLoading ? <>
          <Header />
          <section className="G-page-content">
            <Switch>
              {RouteService.subscribeUnauthorized(routes => routes.map(item => <Route
                exact={true}
                key={item.path}
                path={item.path}
                component={item.component}
              />))}

              {!!Settings.token && !Settings.guest && RouteService.subscribeAuthorized(routes => routes.map(item => <Route
                exact={true}
                key={item.path}
                path={item.path}
                component={item.component}
              />))}

              <Redirect to={ROUTES.HOME} />
            </Switch>
          </section>
          {confirmOpen && <ConfirmModal text={confirmText} />}
          <Footer />
        </> : <PageLoader />}
      </Router>
    ) : null;
  }
}

export default App;
