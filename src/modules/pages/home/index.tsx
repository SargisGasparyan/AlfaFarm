import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import environment from 'platform/services/environment';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import DiscountedProducts from './components/discounted-products';
import Carousel from './components/carousel';
import News from './components/news';
import ContactUs from './components/contact-us';
import ForPartners from './components/for-partners';
import Settings from 'platform/services/settings';
import PaymentController from 'platform/api/payment';
import SuccessModal from 'components/success-modal';

import './style.scss';
import { Shared } from 'modules';

interface IState {
  authModalOpen: boolean;
  orderSuccessModalOpen: boolean;
}

@byRoute(ROUTES.HOME)
class Home extends HelperComponent<{}, IState> {

  public state: IState = {
    authModalOpen: false,
    orderSuccessModalOpen: false,
  };

  // shat romantik grdon
  // if(this.armLeng === this.armLeng) {
  //   document.body.classList.add('armenianFont');
  // }else {
  //   document.body.classList.remove('armenianFont');
  // }

  public componentDidMount() { this.checkForPaymentSuccess(); }

  private checkForPaymentSuccess = async () => {
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get('orderId');

    if (orderId) {
      const result = await PaymentController.confirm(orderId);
      result.success && this.safeSetState({ orderSuccessModalOpen: true });
    }
  }

  private toggleAuthModal = () => {
    const { authModalOpen } = this.state;
    this.safeSetState({ successModalOpen: false, authModalOpen: !authModalOpen });
  }

  private closeOrderSuccessModal = () => this.safeSetState({ orderSuccessModalOpen: false });

  public render() {
    const { authModalOpen, orderSuccessModalOpen } = this.state;

    return (
      <section className="P-home-page">
        <Carousel />
        <DiscountedProducts />
        {environment.WHOLESALE ? <ForPartners /> : <News />}
        <ContactUs />

        {orderSuccessModalOpen && <SuccessModal onClose={this.closeOrderSuccessModal}>
          {Settings.guest ? <>
            <h3>{Settings.translations.guest_order_success}</h3>
            <button className="G-main-button G-normal-link G-mt-30 P-register-button" onClick={this.toggleAuthModal}>{Settings.translations.sign_up}</button>
          </>: <>
            <h3>{Settings.translations.order_success}</h3>
            <Link className="G-main-button G-normal-link G-mt-30" to={ROUTES.PROFILE.ORDERS.MAIN}>{Settings.translations.order_history}</Link>
          </>}
        </SuccessModal>}

        {authModalOpen && <Shared.Auth onClose={this.toggleAuthModal} />}
      </section>
    );
  }
}

export default Home;
