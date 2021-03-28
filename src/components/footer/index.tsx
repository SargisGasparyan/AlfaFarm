import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { contactPhoneNumber, contactEmail } from 'platform/constants/contact-info';
import OrderACall from './components/order_a_call';
import environment from 'platform/services/environment';
import Invite from './components/invite';

import LogoImage from 'assets/images/logo.png';
import AppStoreImage from 'assets/images/app_store.png';
import GooglePlayImage from 'assets/images/google_play.png';
import FacebookImage from 'assets/images/facebook.png';
import InstagramImage from 'assets/images/instagram.png';
import TelegramImage from 'assets/images/tel_icon.png';

import './style.scss';

const currentYear = new Date().getFullYear();
const icons = 'icon-Group-5504 P-icons';

function  Footer() {
  const [aboutRotateCondition, setAboutRotateCondition] = React.useState(true);
  const [aboutRotateClass, setAboutRotateClass] = React.useState([icons]);
  const [aboutItems, setAboutItems] = React.useState(['P-hidden-items']);

  const [informationRotateCondition, setInformationRotateCondition] = React.useState(true);
  const [informationRotateClass, setInformationRotateClass] = React.useState([icons]);
  const [informationItems, setInformationItems] = React.useState(['P-hidden-items']);

  const [usefulRotateCondition, setUsefulRotateCondition] = React.useState(true);
  const [usefulRotateClass, setUsefulRotateClass] = React.useState([icons]);
  const [usefulItems, setUsefulItems] = React.useState(['P-hidden-items']);

  const [contactRotateCondition, setContactRotateCondition] = React.useState(true);
  const [contactRotateClass, setContactRotateClass] = React.useState([icons]);
  const [contactItems, setContactItems] = React.useState(['P-hidden-items']);

  const aboutChange = () => {
    setAboutRotateCondition(!aboutRotateCondition);

    if (aboutRotateCondition) {
      setAboutRotateClass([...aboutRotateClass, 'P-rotate-icon']);
      setAboutItems(['P-shown-items']);

      setInformationRotateCondition(true);
      setInformationRotateClass([icons]);
      setInformationItems(['P-hidden-items']);

      setUsefulRotateCondition(true);
      setUsefulRotateClass([icons]);
      setUsefulItems(['P-hidden-items']);

      setContactRotateCondition(true);
      setContactRotateClass([icons]);
      setContactItems(['P-hidden-items'])
    }

    else {
      setAboutRotateClass([icons]);
      setAboutItems(['P-hidden-items'])
    }
  };

  const informationChange = () => {
    setInformationRotateCondition(!informationRotateCondition);

    if (informationRotateCondition) {
      setInformationRotateClass([...informationRotateClass, 'P-rotate-icon']);
      setInformationItems(['P-shown-items']);

      setAboutRotateCondition(true);
      setAboutRotateClass([icons]);
      setAboutItems(['P-hidden-items']);

      setUsefulRotateCondition(true);
      setUsefulRotateClass([icons]);
      setUsefulItems(['P-hidden-items']);

      setContactRotateCondition(true);
      setContactRotateClass([icons]);
      setContactItems(['P-hidden-items'])
    }

    else {
      setInformationRotateClass([icons]);
      setInformationItems(['P-hidden-items'])
    }
  };

  const usefulChange = () => {
    setUsefulRotateCondition(!usefulRotateCondition);

    if (usefulRotateCondition) {
      setUsefulRotateClass([...usefulRotateClass, 'P-rotate-icon']);
      setUsefulItems(['P-shown-items']);

      setAboutRotateCondition(true);
      setAboutRotateClass([icons]);
      setAboutItems(['P-hidden-items']);

      setInformationRotateCondition(true);
      setInformationRotateClass([icons]);
      setInformationItems(['P-hidden-items']);

      setContactRotateCondition(true);
      setContactRotateClass([icons]);
      setContactItems(['P-hidden-items'])
    }

    else {
      setUsefulRotateClass([icons]);
      setUsefulItems(['P-hidden-items'])
    }
  };

  const contactChange = () => {
    setContactRotateCondition(!contactRotateCondition);

    if (contactRotateCondition) {
      setContactRotateClass([...contactRotateClass, 'P-rotate-icon']);
      setContactItems(['P-shown-items']);

      setAboutRotateCondition(true);
      setAboutRotateClass([icons]);
      setAboutItems(['P-hidden-items']);

      setInformationRotateCondition(true);
      setInformationRotateClass([icons]);
      setInformationItems(['P-hidden-items']);

      setUsefulRotateCondition(true);
      setUsefulRotateClass([icons]);
      setUsefulItems(['P-hidden-items'])
    }

    else {
      setContactRotateClass([icons]);
      setContactItems(['P-hidden-items'])
    }
  };

  return(
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
            <a className="P-telegram" href="https://t.me/AlfaPharm" target="_blank">
              <img src={TelegramImage} alt="Telegram" />
            </a>
          </div>
          <div className="P-mobile-app">
            <img src={AppStoreImage} onClick={() => window.open('https://apps.apple.com/ru/app/alfa-pharm-drugstore-chain/id1453737637', '_blank')} />
            <img src={GooglePlayImage} onClick={() => window.open('https://play.google.com/store/apps/details?id=am.gtest.alfapharm&hl=ru&gl=US', '_blank')} />
          </div>
        </div>
        {!environment.WHOLESALE && <>
          {/* <div className="P-column">
          <h3 className="G-clr-main">{Settings.translations.wholesale_sale}</h3>
        </div> */}
						<div className="P-column P-mobile-column">
								<div className="P-mobile-drop G-flex G-flex-justify-between G-flex-align-center" onClick={aboutChange}>
										<h3 className="G-clr-main">{Settings.translations.about_company}</h3>
										<i className={aboutRotateClass.join(' ')} />
								</div>
								<Link className={aboutItems.join(' ')} to={ROUTES.ABOUT_US}>{Settings.translations.about_us}</Link>
								<Link className={aboutItems.join(' ')} to={ROUTES.NEWS.MAIN}>{Settings.translations.news}</Link>
								<Link className={aboutItems.join(' ')} to={ROUTES.VACANCIES}>{Settings.translations.vacancies}</Link>
						</div>
						<div className="P-column P-mobile-column">
								<div className="P-mobile-drop G-flex G-flex-justify-between G-flex-align-center" onClick={informationChange}>
										<h3 className="G-clr-main">{Settings.translations.information}</h3>
										<i className={informationRotateClass.join(' ')} />
								</div>
								<Link className={informationItems.join(' ')} to={ROUTES.FAQ}>{Settings.translations.faq}</Link>
								<Link className={informationItems.join(' ')} to={ROUTES.CARD_INFO}>{Settings.translations.what_is_alfa_card}</Link>
								<Link className={informationItems.join(' ')} to={ROUTES.TENDERS.MAIN}>{Settings.translations.tenders}</Link>
								<a className={informationItems.join(' ')} href={Settings.wholesaleURL + ROUTES.SERVICES} target="blank">{Settings.translations.wholesale_sale}</a>
								<Link className={informationItems.join(' ')} to={ROUTES.PRIVACY_POLICY}>{Settings.translations.privacy_policy}</Link>
								<Link className={informationItems.join(' ')} to={ROUTES.TERMS_OF_USE}>{Settings.translations.terms_of_use}</Link>
						</div>
				</>}
        <div className="P-column P-mobile-column">
          <div className="P-mobile-drop G-flex G-flex-justify-between G-flex-align-center" onClick={usefulChange}>
            <h3 className="G-clr-main">{Settings.translations.useful_links}</h3>
            <i className={usefulRotateClass.join(' ')} />
          </div>
          {!environment.WHOLESALE && <Link className="P-useful-items" to={ROUTES.HOW_TO_ORDER_ONLINE}>{Settings.translations.how_to_order_online}</Link>}
        </div>
        <div className="P-column P-mobile-column">
          <div className="P-mobile-drop G-flex G-flex-justify-between G-flex-align-center" onClick={contactChange}>
            <h3 className="G-clr-main">{Settings.translations.contact}</h3>
            <i className={contactRotateClass.join(' ')} />
          </div>
          <a className={contactItems.join(' ')}><i className="G-clr-orange icon-Group-5522" /> {contactPhoneNumber}</a>
          <a className={contactItems.join(' ')}><i className="G-clr-orange icon-Group-5524" /> {contactEmail}</a>
          <a className={contactItems.join(' ')}><i className="G-clr-orange icon-Group-5527" /> {Settings.translations.contact_address}</a>

          <OrderACall />
          {!!Settings.token && !Settings.guest && <Invite />}
        </div>
      </div>
      <h4 className="P-copyright">
        {Settings.translations.copyright} &copy; {currentYear} Alfa Pharm
      </h4>
    </footer>

  )
}

// const Footer = React.memo(Foot);

export default Footer;
