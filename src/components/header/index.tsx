import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Search from './components/search';
import LanguageSwitcher from './components/language-switcher';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import LogoImage from 'assets/images/logo.png';
import './style.scss';
import Auth from 'modules/auth';

interface IState {
  authOpen: boolean;
};

class Header extends HelperPureComponent<{}, IState> {
  public state: IState = {
    authOpen: false,
  };

  private navLinkProps = {
    className: 'P-link',
    activeClassName: 'P-active',
    exact: true,
  };

  private toggleAuth = () => {
    const { authOpen } = this.state;
    this.safeSetState({ authOpen: !authOpen });
  }

  public render() {
    const { authOpen } = this.state;

    return (
      <header className="G-flex G-flex-align-center G-flex-justify-center">
        <Link to={ROUTES.HOME.MAIN} className="P-logo G-auto-margin-right">
          <img src={LogoImage} className="G-full-width" />
        </Link>
        
        <Search />

        <a className="P-link">{Settings.translations.categories}</a>
        <a className="P-link">{Settings.translations.pharmacies}</a>
        <a className="P-link">{Settings.translations.clinic}</a>
        <NavLink {...this.navLinkProps} to={ROUTES.BLOG}>{Settings.translations.blog}</NavLink>

        <span
          onClick={this.toggleAuth}
          className="P-link P-login"
        >{Settings.translations.log_in}</span>

        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link">
          <i className="icon-Group-5515" />
        </Link>

        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link">
          <i className="icon-Group-5503" />
        </Link>
      
        <LanguageSwitcher />
        {authOpen && <Auth onClose={this.toggleAuth} />}
      </header>
    );
  }
}

export default Header;
