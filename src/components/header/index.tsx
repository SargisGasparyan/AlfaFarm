import * as React from "react";
import { Link } from "react-router-dom";

import Search from './components/search';
import LanguageSwitcher from './components/language-switcher';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import LogoImage from 'assets/images/logo.png';
import './style.scss';

interface IState {
  something: boolean;
};

class Header extends HelperPureComponent<{}, IState> {
  public state: IState = {
    something: true,
  };

  public render() {

    return (
      <header className="G-flex G-flex-align-center G-flex-justify-center">
        <Link to={ROUTES.HOME} className="P-logo G-auto-margin-right">
          <img src={LogoImage} className="G-full-width" />
        </Link>
        <Search />

        <a className="P-link">{Settings.translations.categories}</a>
        <a className="P-link">{Settings.translations.pharmacies}</a>
        <a className="P-link">{Settings.translations.clinic}</a>
        <a className="P-link">{Settings.translations.blog}</a>
        <span className="P-link P-login G-auto-margin-left">{Settings.translations.log_in}</span>
        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link">
          <i className="icon-notification" />
        </Link>
        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link">
          <i className="icon-cart" />
        </Link>
      
        <LanguageSwitcher />
      </header>
    );
  }
}

export default Header;
