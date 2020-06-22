import * as React from 'react';
import { Link } from 'react-router-dom';

import { IDropdownOption } from 'platform/constants/interfaces';
import { LanguageEnum } from 'platform/constants/enums';
import ROUTES from 'platform/constants/routes';
import Select from '../select';
import Settings from 'platform/services/settings';
import Storage from 'platform/services/storage';
import GetMyOrder from './components/get-my-order';
import { IOrderGuestRequestModel } from 'platform/api/order';
import HelperComponent from 'platform/classes/helper-component';

import facebookIcon from 'assets/images/ic_facebook.png';
import linkedinIcon from 'assets/images/ic_linkedin.png';
import instagramIcon from 'assets/images/ic_instagram.png';

import AppStore from 'assets/images/app_store.png';
import GooglePlay from 'assets/images/google_play.png';

import './style.scss';

interface IState {
  orderQueryData: IOrderGuestRequestModel | null;
  isGetMyOrderOpen: boolean;
};

class Footer extends HelperComponent<{}, IState> {

  public state: IState = {
    orderQueryData: null,
    isGetMyOrderOpen: false,
  };

  public componentDidMount() {
    !Storage.profile && this.checkOrderQuery();
  }

  private currentYear = new Date().getFullYear();

  private checkOrderQuery = () => {
    const query = new URLSearchParams(window.location.search);
    const email = query.get('orderEmail');
    const code = query.get('orderCode');

    if (email && code) {
      const orderQueryData = { email, code };
      this.safeSetState({ isGetMyOrderOpen: true, orderQueryData });
    }
  }

  private changeLanguage = (option: IDropdownOption<LanguageEnum>) => {
    Settings.language = option.value;
    window.location.reload();
  }

  private toggleGetMyOrder = () => {
    const { isGetMyOrderOpen } = this.state;
    this.safeSetState({ isGetMyOrderOpen: !isGetMyOrderOpen, orderQueryData: null });
  }

  public render() {
    const { isGetMyOrderOpen, orderQueryData } = this.state;

    return (
      <footer>
        <div className="P-footer-column">
          <h3>{Settings.translations.about_us}</h3>
          <Link to={ROUTES.CONTRACT}>{Settings.translations.contract}</Link>
          <Link to={ROUTES.FAQ}>{Settings.translations.faq}</Link>
          <Link to={ROUTES.CONFIDENTIALITY_CONDITIONS}>{Settings.translations.confidentiality_conditions}</Link>
          <Link to={ROUTES.EXCHANGE_RETURN}>{Settings.translations.products_exchange_and_return}</Link>
          {!Storage.profile && <a onClick={this.toggleGetMyOrder}>{Settings.translations.get_my_order}</a>}
        </div>
        <div className="P-footer-column">
          {/* <h3>{Settings.translations.for_partners}</h3>
          <Link to={ROUTES.CONTRACT}>{Settings.translations.help_for_partners}</Link>
          <Link to={ROUTES.FAQ}>{Settings.translations.faq}</Link>
          <Link to={ROUTES.CONFIDENTIALITY_CONDITIONS}>{Settings.translations.invitation_to_cooperate}</Link>
          <Link to={ROUTES.EXCHANGE_RETURN}>{Settings.translations.partners_account_login}</Link> */}
        </div>
        <div className="P-footer-column column-app-download">
        <h3>{Settings.translations.ineed_app}</h3>
        
          <a href={Settings.appStoreURL} target="_blank" className="P-app-store"><img src={AppStore} alt="app store" /></a>
          <a href={Settings.googlePlayURL} target="_blank" className="P-google-play"><img src={GooglePlay} alt="google play" /></a>

        </div>

        <div className="P-footer-bottom">
        <h3 className="P-footer-copyright">&#9400; {Settings.translations.copyright}, {this.currentYear}</h3>
        {isGetMyOrderOpen && <GetMyOrder onClose={this.toggleGetMyOrder} queryData={orderQueryData} />}
        <div className="social-medias">
          <a href = "https://www.linkedin.com/company/ineed-market/" className="social-media" target="_blank">
            <img src={linkedinIcon} alt="linkedin"/>
          </a>
          <a href = "https://www.facebook.com/ineedmarket/" className="social-media" target="_blank">
            <img src={facebookIcon} alt="facebook"/>
          </a>
          <a href = "https://www.instagram.com/ineed.market/" className="social-media" target="_blank">
            <img src={instagramIcon} alt="instagram"/>
          </a>

        </div>
        </div>
      </footer>
    );
  }
}

export default Footer;