import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { contactPhoneNumber, contactEmail, contactAddress } from 'platform/constants/contact-info';
import OrderACall from './components/order_a_call';

import LogoImage from 'assets/images/logo.png';
import AppStoreImage from 'assets/images/app_store.png';
import GooglePlayImage from 'assets/images/google_play.png';
import './style.scss';

const currentYear = new Date().getFullYear();

const Footer = React.memo(() => (
  <footer>
    <img src={LogoImage} className="P-logo G-auto-margin-right" />
    <div className="P-content">
      <div className="P-column">
        <p>{Settings.translations.footer_text}</p>
        <OrderACall />
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.retail_sale}</h3>
        <a>{Settings.translations.what_is_alfa_card}</a>
        <a>{Settings.translations.vacancy}</a>
        <a>{Settings.translations.about_us}</a>
        <a>{Settings.translations.news}</a>
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.wholesale_sale}</h3>
        <a>{Settings.translations.what_is_alfa_card}</a>
        <a>{Settings.translations.vacancy}</a>
        <a>{Settings.translations.about_us}</a>
        <Link to={ROUTES.NEWS}>{Settings.translations.news}</Link>
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.useful_links}</h3>
        <a>{Settings.translations.what_is_alfa_card}</a>
        <a>{Settings.translations.vacancy}</a>
        <a>{Settings.translations.about_us}</a>
        <Link to={ROUTES.NEWS}>{Settings.translations.news}</Link>
      </div>
      <div className="P-column">
        <h3 className="G-main-color">{Settings.translations.contact}</h3>
        <a><i className="G-orange-color icon-Group-5522" /> {contactPhoneNumber}</a>
        <a><i className="G-orange-color icon-Group-5524" /> {contactEmail}</a>
        <a><i className="G-orange-color icon-Group-5527" /> {contactAddress}</a>
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