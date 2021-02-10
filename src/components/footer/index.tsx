import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { contactPhoneNumber, contactEmail, contactAddress } from 'platform/constants/contact-info';
import OrderACall from './components/order_a_call';
import enviroment from 'platform/services/enviroment';
import Invite from './components/invite';

import LogoImage from 'assets/images/logo.png';
import AppStoreImage from 'assets/images/app_store.png';
import GooglePlayImage from 'assets/images/google_play.png';
import FacebookImage from 'assets/images/facebook.png';
import InstagramImage from 'assets/images/instagram.png';

import './style.scss';

const currentYear = new Date().getFullYear();

const Footer = React.memo(() => (
  <footer>
    <img src={LogoImage} className="P-logo G-mr-auto" />
    <div className="P-content">
      <div className="P-column">
        <p>{Settings.translations.footer_text}</p>
        <div className="P-social-links">
          <a href="https://www.facebook.com/AlfaPharm" target="_blank">
            <img src={FacebookImage} alt="facebook" />
          </a>
          <a href="https://www.instagram.com/AlfaPharm/" target="_blank">
            <img src={InstagramImage} alt="instagram" />
          </a>
        </div>
        <div className="P-mobile-app">
          <img src={AppStoreImage} onClick={() => window.open('https://apps.apple.com/ru/app/alfa-pharm-drugstore-chain/id1453737637', '_blank')} />
          <img src={GooglePlayImage} onClick={() => window.open('https://play.google.com/store/apps/details?id=am.gtest.alfapharm&hl=ru&gl=US', '_blank')} />
        </div>
      </div>
      {!enviroment.WHOLESALE && <>
        {/* <div className="P-column">
          <h3 className="G-main-color">{Settings.translations.wholesale_sale}</h3>
        </div> */}
        <div className="P-column">
          <h3 className="G-main-color">{Settings.translations.about_company}</h3>
          <Link to={ROUTES.ABOUT_US}>{Settings.translations.about_us}</Link>
          <Link to={ROUTES.NEWS.MAIN}>{Settings.translations.news}</Link>
          <Link to={ROUTES.VACANCIES}>{Settings.translations.vacancies}</Link>          
        </div>
        <div className="P-column">
          <h3 className="G-main-color">{Settings.translations.information}</h3>
          <Link to={ROUTES.FAQ}>{Settings.translations.faq}</Link>
          <Link to={ROUTES.CARD_INFO}>{Settings.translations.what_is_alfa_card}</Link>
          <Link to={ROUTES.TENDERS.MAIN}>{Settings.translations.tenders}</Link>
          <a href={Settings.wholesaleURL + ROUTES.SERVICES} target="blank">{Settings.translations.wholesale_sale}</a>
          <Link to={ROUTES.PRIVACY_POLICY}>{Settings.translations.privacy_policy}</Link>
          <Link to={ROUTES.TERMS_OF_USE}>{Settings.translations.terms_of_use}</Link>
        </div>
      </>}
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.useful_links}</h3>
        {!enviroment.WHOLESALE && <Link to={ROUTES.HOW_TO_ORDER_ONLINE}>{Settings.translations.how_to_order_online}</Link>}
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.contact}</h3>
        <a><i className="G-orange-color icon-Group-5522" /> {contactPhoneNumber}</a>
        <a><i className="G-orange-color icon-Group-5524" /> {contactEmail}</a>
        <a><i className="G-orange-color icon-Group-5527" /> {contactAddress}</a>

        <OrderACall />
        {!!Settings.token && !Settings.guest && <Invite />}
      </div>
    </div>
    <h4 className="P-copyright">
      {Settings.translations.copyright} &copy; {currentYear} Alfa Pharm
    </h4>
  </footer>
));

export default Footer;