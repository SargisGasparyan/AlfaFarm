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
import ConfirmModal, { IProps as IConfirmModalProps } from './components/confirm-modal';
import Socket from './platform/services/socket';
import HelperComponent from './platform/classes/helper-component';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import { initYMapsScript } from 'platform/services/yandex';

import './modules';

import 'moment/locale/hy-am';
import 'moment/locale/ru';
import 'moment/locale/en-gb';

import './assets/styles/index.scss';
import SearchHistory from 'platform/services/searchHistory';
import PaymentController from './platform/api/payment';

interface IState {
  confirmOpen: boolean;
  confirmProps: IConfirmModalProps;
  initialLoading: boolean;
  generalAPILoaded: boolean;
};

class App extends HelperComponent<{}, IState> {

  public state: IState = {
    generalAPILoaded: false,
    initialLoading: false,
    confirmOpen: false,
    confirmProps: {}
  };

  public async componentDidMount() {
    //? Library config

    const alertify = await import('alertifyjs');
    moment.locale(Settings.shortCode);
    alertify.set('notifier', 'position', 'bottom-center');
    alertify.set('notifier', 'delay', 5);

    //? For SSR to fully load Browser API (general for 'window')

    window.abortableRequests = [];
    window.routerHistory = createBrowserHistory();
    window.routerHistory.listen(() => {
      if (location.pathname !== '/products') {
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      }
    });

    window.addEventListener(DispatcherChannels.ToggleConfirm, this.toggleConfirm);

    this.safeSetState({ generalAPILoaded: true });

    //? Seed

    try {
      initYMapsScript();
      await Socket.connect();
    } catch { /* */
    }

    //? Backend initial data fetch

    const success = await Storage.fetchDefault();
    if (success) this.safeSetState({ initialLoading: true });
    else window.location.reload();

    //? Check for invitation

    const query = new URLSearchParams(window.location.search);
    const referralCode = query.get('referral');
    if (referralCode) {
      Settings.referralCode = referralCode;
    }

    //? Check card
    await this.checkForPaymentSuccess();
  }

  private checkForPaymentSuccess = async () => {
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get('orderId');
    const isCard = query.get('isCard');

    if (orderId) {
      if (isCard) {
        const result = await PaymentController.saveCard(orderId);
        // result.success && window.routerHistory.push(`${ROUTES.PROFILE.MY_WALLET}`);
      } else {
        const result = await PaymentController.confirm(orderId);
        result.success && this.safeSetState({ orderSuccessModalOpen: true });
      }
    }
  };

  private toggleConfirm = (e: CustomEvent) => {
    const { confirmOpen } = this.state;
    this.safeSetState({ confirmOpen: !confirmOpen, confirmProps: e.detail || {} });
  };

  public render() {
    const { generalAPILoaded, initialLoading, confirmOpen, confirmProps } = this.state;

    return generalAPILoaded ? (
      <Router history={window.routerHistory}>
        {initialLoading ? <>
          <Header/>
          <section className="G-page-content">
            <Switch>
              {RouteService.subscribeUnauthorized(routes => routes.map(item => <Route
                exact={true}
                key={item.path}
                path={item.path}
                component={item.component}
              />))}

              {!!Settings.token && !Settings.guest && RouteService.subscribeAuthorized(routes => routes.map(item =>
                <Route
                  exact={true}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />))}

              <Redirect to={ROUTES.HOME}/>
            </Switch>
          </section>
          {confirmOpen && <ConfirmModal {...confirmProps} />}
          <Footer/>
        </> : <PageLoader/>}
      </Router>
    ) : null;
  }
}

export default App;
