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
import { getMediaPath } from 'platform/services/helper';
import WholesaleContent from './components/wholesale-content';
import Socket from 'platform/services/socket';
import NotificationController from 'platform/api/notification';
import Notifications from './components/notifications';
import BasketController from 'platform/api/basket';
import Screen from 'components/screen';
import LogoImage from 'assets/images/logo.png';
import PersonImage from 'assets/images/person.png';
import burgerMenu from 'assets/images/menu.svg';
import Broadcast from "../../platform/services/broadcast";
import MobileMenu from './components/mobile-menu';

import './style.scss';
import './responsive.scss';

interface IState {
  authOpen: boolean;
  categoryOpen: boolean;
  notificationOpen: boolean;
  notificationIconNumber: number;
  cartIconNumber: number;
  mobileMenuOpen: boolean;
};

class Header extends HelperPureComponent<{}, IState> {

  public state: IState = {
    authOpen: false,
    categoryOpen: false,
    notificationOpen: false,
    notificationIconNumber: 0,
    cartIconNumber: 0,
    mobileMenuOpen: false
  };

  private header = React.createRef<HTMLDivElement>();
  private categoryOpenLink = React.createRef<HTMLAnchorElement>();

  private navLinkProps = {
    className: 'P-link',
    activeClassName: 'P-active',
    exact: true,
  };

  public componentDidMount() {
    this.fetchCart();
    window.addEventListener(DispatcherChannels.CartItemsUpdate, this.fetchCart);
    Broadcast.subscribe(DispatcherChannels.StorageUpdate, this.storageUpdate);

    Storage.profile && this.configureNotifications();
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener(DispatcherChannels.CartItemsUpdate, this.fetchCart);
    Broadcast.unsubscribe(DispatcherChannels.StorageUpdate, this.storageUpdate);
  }

  private storageUpdate = () => {
    this.forceUpdate();
  }

  public async configureNotifications() {
    const result = await NotificationController.GetUnseenList();

    if (result && result.success) {
      this.safeSetState({ notificationIconNumber: result.data });
      Socket.connection && Socket.connection.on('newMessage', () => {
        const { notificationIconNumber } = this.state;
        this.safeSetState({ notificationIconNumber: notificationIconNumber + 1 });
      });
    }
  }

  private fetchCart = async () => {
    const result = await BasketController.GetCount();
    this.safeSetState({ cartIconNumber: result.data });
  }

  private toggleAuth = () => {
    const { authOpen, mobileMenuOpen } = this.state;
    this.safeSetState({
      authOpen: !authOpen,
      mobileMenuOpen: !mobileMenuOpen || false, // Close if from mobile
    });
  }

  private openCategories = () => {
    this.safeSetState({ categoryOpen: true });
    document.addEventListener('mousemove', this.closeCategories);
  }

  private closeCategories = (e?: MouseEvent) => {
    const { categoryOpen } = this.state;
    const canBeClosed = !e || (
      this.categoryOpenLink.current &&
      !this.categoryOpenLink.current.contains(e.target as Node)
    );

    if (categoryOpen && canBeClosed) {
      this.safeSetState({ categoryOpen: false });
      document.removeEventListener('mousemove', this.closeCategories);
    }
  }

  private searchSubmit = (value: string) => {
    const query = new URLSearchParams(window.location.search);
    const oldValue = query.get('text');
    
    if (oldValue !== value) {
      if (value.length) query.set('text', value);
      else query.delete('text');
  
      window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));
    }
  }

  private toggleMobileMenu = () => {
    const { mobileMenuOpen } = this.state;
    this.safeSetState({ mobileMenuOpen: !mobileMenuOpen });
  }

  private toggleNotifications = (e: Event | React.SyntheticEvent) => {
    e.stopPropagation();
    const { notificationOpen } = this.state;

    if (!notificationOpen) this.safeSetState({ notificationOpen: true, notificationIconNumber: 0 });
    else this.safeSetState({ notificationOpen: false });
  }

  private openProducts = () => window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));

  public render() {
    const { authOpen, categoryOpen, cartIconNumber, notificationIconNumber, notificationOpen } = this.state;

    return (
      <header ref={this.header} className="G-flex G-flex-align-center G-flex-justify-center">
        <Screen.SmallDesktop>
          {((matches: boolean) => !matches ? <>
            <Link to={ROUTES.HOME} className="P-logo G-mr-auto">
              <img src={LogoImage} className="G-full-width" />
            </Link>

            {enviroment.WHOLESALE ? <WholesaleContent /> : <>
              <SearchInput
                onSubmit={this.searchSubmit}
                withSubmit={true}
              />

              <Link
                to={ROUTES.PRODUCTS.MAIN}
                innerRef={this.categoryOpenLink}
                onMouseOver={this.openCategories}
                onClick={this.openProducts}
                className={`P-link ${categoryOpen ? 'P-active' : ''}`}
              >
                {Settings.translations.online_pharmacy}
                {categoryOpen && <Categories onClose={this.closeCategories} />}
              </Link>

              <NavLink {...this.navLinkProps} to={ROUTES.PHARMACIES}>{Settings.translations.pharmacies}</NavLink>
              {/* <NavLink {...this.navLinkProps} to={ROUTES.CLINIC.MAIN}>{Settings.translations.clinic}</NavLink> */}
              <NavLink {...this.navLinkProps} to={ROUTES.BLOG.MAIN}>{Settings.translations.blog}</NavLink>
            </>}

            {Storage.profile ? <Link to={ROUTES.PROFILE.MAIN} className="P-profile">
              <div
                style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
                className="P-image"
              />
              <h4>{Storage.profile.firstName} {Storage.profile.lastName}</h4>
            </Link> : <span
              onClick={this.toggleAuth}
              className="P-link P-login"
            >{Settings.translations.log_in}</span>}

            {Storage.profile && <a onClick={this.toggleNotifications} className="P-link P-icon G-normal-link P-notification">
              <i className="icon-Group-5515" />
              {!!notificationIconNumber && <span>{notificationIconNumber > 99 ? '99+' : notificationIconNumber}</span>}
            </a>}

            <Link to={ROUTES.CART} className="P-link P-icon G-normal-link P-cart">
              <i className="icon-Group-5503" />
              {!!cartIconNumber && <span>{cartIconNumber > 99 ? '99+' : cartIconNumber}</span>}
            </Link>

            <LanguageSwitcher />

            {authOpen && <Shared.Auth onClose={this.toggleAuth} />}
            {notificationOpen && <Notifications onClose={this.toggleNotifications} />}
          </> : <this.Mobile />)}
        </Screen.SmallDesktop>
      </header>
    );
  }

  private Mobile = () => {
    const { authOpen, cartIconNumber, notificationIconNumber, notificationOpen, mobileMenuOpen } = this.state;

    return <div className="P-mobile-header">
      <div className="P-burger-menu">
        <img src={burgerMenu} alt="menu" className="G-cursor" onClick={this.toggleMobileMenu} />
      </div>

      <Link to={ROUTES.HOME} className="P-logo P-logo-mobile">
        <img src={LogoImage} className="G-full-width" />
      </Link>

      <div className="P-mobile-header-icons">
        {Storage.profile && <a onClick={this.toggleNotifications} className="P-link P-icon G-normal-link P-notification">
          <i className="icon-Group-5515" />
          {!!notificationIconNumber && <span>{notificationIconNumber > 99 ? '99+' : notificationIconNumber}</span>}
        </a>}
        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link P-cart">
          <i className="icon-Group-5503" />
          {!!cartIconNumber && <span>{cartIconNumber > 99 ? '99+' : cartIconNumber}</span>}
        </Link>
      </div>

      {authOpen && <Shared.Auth onClose={this.toggleAuth} />}
      {notificationOpen && <Notifications onClose={this.toggleNotifications} />}
      {mobileMenuOpen && <MobileMenu onClose={this.toggleMobileMenu} onAuthOpen={this.toggleAuth} />}
    </div>
  }
}

export default Header;