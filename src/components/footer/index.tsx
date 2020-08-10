import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { contactPhoneNumber, contactEmail, contactAddress } from 'platform/constants/contact-info';
import OrderACall from './components/order_a_call';

import LogoImage from 'assets/images/logo.png';
import AppStoreImage from 'assets/images/app_store.png';
import GooglePlayImage from 'assets/images/google_play.png';
import FacebookImage from 'assets/images/facebook.png';
import InstagramImage from 'assets/images/instagram.png';
import './style.scss';

const currentYear = new Date().getFullYear();

const Footer = React.memo(() => (
  <footer>
    <img src={LogoImage} className="P-logo G-auto-margin-right" />
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
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.retail_sale}</h3>
        <a>{Settings.translations.what_is_alfa_card}</a>
        <Link to={ROUTES.VACANCIES}>{Settings.translations.vacancies}</Link>
        <Link to={ROUTES.ABOUT_US}>{Settings.translations.about_us}</Link>
        <Link to={ROUTES.NEWS.MAIN}>{Settings.translations.news}</Link>
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.wholesale_sale}</h3>
        <Link to={ROUTES.SERVICES}>{Settings.translations.services}</Link>
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.useful_links}</h3>
        <Link to={ROUTES.HOW_TO_USE_APP}>{Settings.translations.how_to_use_app}</Link>
        <Link to={ROUTES.FAQ}>{Settings.translations.faq}</Link>
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.contact}</h3>
        <a><i className="G-orange-color icon-Group-5522" /> {contactPhoneNumber}</a>
        <a><i className="G-orange-color icon-Group-5524" /> {contactEmail}</a>
        <a><i className="G-orange-color icon-Group-5527" /> {contactAddress}</a>
        <OrderACall />
      </div>
    </div>
    <div className="P-mobile-app">
      <img src={AppStoreImage} />
      <img src={GooglePlayImage} />
    </div>
    <h4 className="P-copyright">
      {Settings.translations.copyright} &copy; {currentYear} Alfa Pharm
    </h4>
  </footer>
));

export default Footer;