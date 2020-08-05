import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import LanguageSwitcher from './components/language-switcher';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import SearchInput from 'components/search-input';
import { Shared } from 'modules';
import Categories from './components/categories';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import Storage from 'platform/services/storage';
import enviroment from 'platform/services/enviroment';

import LogoImage from 'assets/images/logo.png';
import PersonImage from 'assets/images/person.png';

import './style.scss';
import { getMediaPath } from 'platform/services/helper';


interface IState {
  authOpen: boolean;
  categoryOpenPosition: number;
  categoryOpen: boolean;
};

class Header extends HelperPureComponent<{}, IState> {
  public state: IState = {
    authOpen: false,
    categoryOpenPosition: 0,
    categoryOpen: false,
  };

  private categoryOpenLink = React.createRef<HTMLAnchorElement>();

  private navLinkProps = {
    className: 'P-link',
    activeClassName: 'P-active',
    exact: true,
  };

  public componentDidMount() {
    setTimeout(this.checkWindow, 500); // Wait for assets load to get the right position
    window.addEventListener('resize', this.checkWindow);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('resize', this.checkWindow);
  }

  private checkWindow = () => {
    const { categoryOpenPosition } = this.state;
    if (this.categoryOpenLink.current) {
      const openPosition = this.categoryOpenLink.current.getBoundingClientRect().left;
      openPosition !== categoryOpenPosition && this.safeSetState({ categoryOpenPosition: openPosition })
    }
  }

  private toggleAuth = () => {
    const { authOpen } = this.state;
    this.safeSetState({ authOpen: !authOpen });
  }

  private toggleCategories = (e?: React.SyntheticEvent) => {
    e && e.stopPropagation();
    const { categoryOpen } = this.state;
    this.safeSetState({ categoryOpen: !categoryOpen });
  }

  private searchSubmit = (value: string) => {
    window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?text=${value}`);
    window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));
  }

  public render() {
    const { authOpen, categoryOpenPosition, categoryOpen } = this.state;

    return (
      <header className="G-flex G-flex-align-center G-flex-justify-center">
        <Link to={ROUTES.HOME.MAIN} className="P-logo G-auto-margin-right">
          <img src={LogoImage} className="G-full-width" />
        </Link>
        
        <SearchInput withSubmit={true} onSubmit={this.searchSubmit} />

        <a
          ref={this.categoryOpenLink}
          onClick={this.toggleCategories}
          className={`P-link ${categoryOpen ? 'P-active' : ''}`}
        >{Settings.translations.online_pharmacy}</a>

        <NavLink {...this.navLinkProps} to={ROUTES.PHARMACIES}>{Settings.translations.pharmacies}</NavLink>
        <NavLink {...this.navLinkProps} to={ROUTES.CLINIC}>{Settings.translations.clinic}</NavLink>
        <NavLink {...this.navLinkProps} to={ROUTES.BLOG.MAIN}>{Settings.translations.blog}</NavLink>

        {Storage.profile ? <Link to={ROUTES.PROFILE.MAIN} className="P-profile">
          <div
            style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
            className="P-image"
          />
          <h4>{Storage.profile.fullName}</h4>
        </Link> : <span
          onClick={this.toggleAuth}
          className="P-link P-login"
        >{Settings.translations.log_in}</span>}

        {/* <Link to={ROUTES.CART} className="P-link P-icon G-normal-link">
          <i className="icon-Group-5515" />
        </Link> */}

        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link">
          <i className="icon-Group-5503" />
        </Link>
      
        <LanguageSwitcher />
        {authOpen && <Shared.Auth onClose={this.toggleAuth} />}

        {!!categoryOpenPosition && categoryOpen && <Categories openPosition={categoryOpenPosition} onClose={this.toggleCategories} />}
      </header>
    );
  }
}

export default Header;
