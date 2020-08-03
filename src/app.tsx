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
// import RequestButton from 'modules/shared/request/components/request-button';
import Footer from './components/footer';
import ConfirmModal from './components/confirm-modal';
import Socket from './platform/services/socket';
import Notifications from './platform/services/notifications';
import HelperComponent from './platform/classes/helper-component';
import Modal from 'react-modal';

import './modules';

import 'moment/locale/hy-am';
import 'moment/locale/ru';
import 'moment/locale/en-gb';

import './assets/styles/index.scss';

interface IState {
  confirmOpen: boolean;
  initialLoading: boolean;
  generalAPILoaded: boolean;
};

class App extends HelperComponent<{}, IState> {

  public state: IState = {
    generalAPILoaded: false,
    initialLoading: false,
    confirmOpen: false,
  };

  public async componentDidMount() {    
    //? Seed
    Socket.connect();
    Notifications.init();

    //? Library config
    const alertify = await import('alertifyjs');
    moment.locale(Settings.shortCode);
    alertify.set('notifier','position', 'bottom-center');
    alertify.set('notifier','delay', 20);

    //? For SSR to fully load Browser API (general for 'window')
    window.abortableRequests = [];
    window.routerHistory = createBrowserHistory();
    window.routerHistory.listen(() => window.scrollTo(0, 0));
    this.safeSetState({ generalAPILoaded: true });

    //? Backend initial data fetch
    const success = await Storage.fetchDefault();
    if (success) this.safeSetState({ initialLoading: true });
    else window.location.reload();

    window.addEventListener('toggleconfirm', this.toggleConfirm);
  }

  private toggleConfirm = () => {
    const { confirmOpen } = this.state;
    this.safeSetState({ confirmOpen: !confirmOpen });
  }
 
  public render() {
    const { generalAPILoaded, initialLoading, confirmOpen } = this.state;
    

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

              {!!Settings.token && RouteService.subscribeAuthorized(routes => routes.map(item => <Route
                exact={true}
                key={item.path}
                path={item.path}
                component={item.component}
              />))}
              
              <Redirect to={ROUTES.HOME.MAIN} />
            </Switch>
          </section>
          {confirmOpen && <ConfirmModal />}
          <div className="responsive-footer">
            <Footer /> 
          </div>
          {/* <RequestButton /> */}
        </> : <PageLoader />}
      </Router>
    ) : null;
  }
}

export default App;
