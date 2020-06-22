import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import AppStore from 'assets/images/app_store.png';
import GooglePlay from 'assets/images/google_play.png';
// import DownloadBackground from 'assets/images/download_background.png';
import Settings from 'platform/services/settings';
import RequestModal from '../request/components/request-modal';
import Promotions from './components/promotions';
import PopularCategories from './components/popular-categories';
import Proposal from './components/proposal';
import BestSelling from './components/best-selling';
import Brands from './components/brands';
import MainCategories from './components/main-categories';
import Storage from 'platform/services/storage';
import HelperComponent from 'platform/classes/helper-component';
import { LanguageEnum } from 'platform/constants/enums';

import RequestBackground1 from 'assets/images/request_background_1.jpg';
import RequestBackground2 from 'assets/images/request_background_2.jpg';

import MobileRequestBackground1 from 'assets/images/mobile_request_background_1.jpg';
import MobileRequestBackground2 from 'assets/images/mobile_request_background_2.jpg';
// import MobileRequestBackground1new from 'assets/images/newYearHome1.jpg';
// import MobileRequestBackground2new from 'assets/images/newYearHome2.jpg';




import './style.scss';
import CartManager from '../cart/services/manager';


// import { ContentProperty } from 'csstype';
// import { string } from 'prop-types';
// import { stringify } from 'querystring';

interface IState { requestOpen: boolean };

@byRoute([ROUTES.HOME.MAIN, ROUTES.HOME.FAIL, ROUTES.HOME.SUCCESS])

class Home extends HelperComponent<{}, IState> {

  public state: IState = { requestOpen: false };

  public bannerImage: string;

  public armLeng = LanguageEnum.Armenian;
  public IosLink = Settings.appStoreURL;
  public androidLink = Settings.googlePlayURL;

  public componentDidMount() {
    this.checkLanguage();
    this.IdramNotificationSuccess();
  }

  public checkLanguage = () => {

    // shat romantik grdon
    // if(this.armLeng === this.armLeng) {
    //   document.body.classList.add('armenianFont');
    // }else {
    //   document.body.classList.remove('armenianFont');
    // }
  };
  
  private IfBannerImage = () => {
    if(window.innerWidth > 992) {
      return this.bannerImage = `${Math.random() >= 0.5 ? RequestBackground1 : RequestBackground2}`;
    } else {
    //  return this.bannerImage = `${Math.random() >= 0.5 ? MobileRequestBackground1 : MobileRequestBackground2}`;
    return this.bannerImage = `${Math.random() >= 0.5 ? MobileRequestBackground1 : MobileRequestBackground2}`;
    }
  };

  private checkGadget = () => {
    if(navigator.userAgent.match(/Android/i)) {
      return this.androidLink
    } else if (navigator.userAgent.match(/iphone/i) || (navigator.userAgent.match(/ipad/i)) || (navigator.userAgent.match(/ipad/i)) ) {
      return this.IosLink
    } return '';
  }

  private checkPlatform = () => {
    if(navigator.userAgent.match(/Android/i)) {
      return GooglePlay
    } else if (navigator.userAgent.match(/iphone/i) || (navigator.userAgent.match(/ipad/i) || (navigator.userAgent.match(/ipadpro/i))) ) {
      return AppStore
    } return '';
  }

  public WindowResize = window.addEventListener('resize', this.IfBannerImage);
  
  private get welcomeText() {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 12) return Settings.translations.good_morning;
    else if (hours >= 12 && hours < 18) return Settings.translations.good_afternoon;
    else return Settings.translations.good_evening;
  }

  public IdramNotificationSuccess = async () => {
    const alertify = await import('alertifyjs');
      if(window.location.href.includes("fail")) {
        window.routerHistory.push('/cart');
        setTimeout(() => {
          alertify.error(Settings.translations.notification_texts.order_idram_failed.title);
        }, 1000);
      }
      if(window.location.href.includes("success")){
        window.routerHistory.push('/profile/my-orders');
        setTimeout(() => {
          alertify.success(Settings.translations.order_create_success);
        }, 1000);
        CartManager.Clear();
      }
  }

  private toggleRequest = () => this.safeSetState({ requestOpen: !this.state.requestOpen });

  public render() {
    const { requestOpen } = this.state;

    return (
      <section className="P-G-page P-home-page">
        <div className="P-hidden" style={{ background: `url(${this.IfBannerImage()}) center/cover` }}/>
        <div className="P-home-request" style={{ background: `url(${this.IfBannerImage()}) center/cover` }}>
          <div>
            <h1>
              {this.welcomeText}<br />
              {Storage.profile ? Storage.profile.firstName : ''}
            </h1>
            <p>{Settings.translations.what_do_you_need_today}</p>
            {/* <button onClick={this.toggleRequest}>{Settings.translations.i_need}</button> */}
            <button onClick={this.toggleRequest}>{Settings.translations.price_offer}</button>
            {requestOpen && <RequestModal onClose={this.toggleRequest} />}
          </div>
        </div>
        <MainCategories />
        <Promotions />
        <BestSelling />
        <PopularCategories />
        <div className="P-home-download">
          <div>
            <h2 className="mobile-text">{Settings.translations.download_app}</h2>
            <p className="mobile-text-small">{Settings.translations.download_text}</p>
            <div className="mobile-link-block" style={{ display: 'none' }}>
              <a href={this.checkGadget()} target="_blank" className="for-mobile"><img src={this.checkPlatform()} alt="" className="mobile-app-download-btn" /></a>
            </div>
            {/* <a href={this.checkGadget()} target="_blank"><img src={this.checkPlatform()} alt="ios" /></a> */}
            <a href={Settings.googlePlayURL} target="_blank" className="mobile-style"><img src={GooglePlay} alt="google play" /></a>
            <a href={Settings.appStoreURL} target="_blank" className="mobile-style"><img src={AppStore} alt="app store" /></a>
          </div>
        </div>
        <Proposal />
        <Brands />
      </section>
    );
  }
}

export default Home;