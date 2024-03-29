import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LanguageSwitcher from './components/language-switcher';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import SearchInput from 'components/search-input';
import { Shared } from 'modules';
import Categories from './components/categories';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import Storage from 'platform/services/storage';
import environment from 'platform/services/environment';
import { getMediaPath } from 'platform/services/helper';
import WholesaleContent from './components/wholesale-content';
import Socket from 'platform/services/socket';
import NotificationController from 'platform/api/notification';
import Notifications from './components/notifications';
import BasketController from 'platform/api/basket';
import ProductController from 'platform/api/product';
import Screen from 'components/screen';
import LogoImage from 'assets/images/logo.png';
import ProfileImage from 'assets/images/icons/profile.svg';
import PersonImage from 'assets/images/person.png';
import burgerMenu from 'assets/images/menu.svg';
import Broadcast from '../../platform/services/broadcast';
import MobileMenu from './components/mobile-menu';
import { IProductSearcResponseModel } from 'platform/api/product/models/response';
import SearchPopup from './components/search';
import Connection from 'platform/services/connection';
import SearchHistory from 'platform/services/searchHistory';
import './style.scss';
import './responsive.scss';
import HelperComponent from 'platform/classes/helper-component';

interface IState {
  authOpen: boolean;
  categoryOpen: boolean;
  searchValue: string;
  notificationOpen: boolean;
  mobileSearchOpen: boolean;
  searchOpen: boolean;
  searchLoader: boolean;
  searchResult: IProductSearcResponseModel | null;
  searchHistoryShown: boolean;
  notificationIconNumber: number;
  cartIconNumber: number;
  mobileMenuOpen: boolean;
};


class Header extends HelperComponent<{}, IState> {

  public state: IState = {
    authOpen: false,
    categoryOpen: false,
    searchValue: '',
    mobileSearchOpen: false,
    notificationOpen: false,
    searchLoader: false,
    searchOpen: false,
    searchResult: null,
    searchHistoryShown: false,
    notificationIconNumber: 0,
    cartIconNumber: 0,
    mobileMenuOpen: false
  };

  private timer: any;
  private header = React.createRef<HTMLDivElement>();
  private categoryOpenLink = React.createRef<HTMLAnchorElement>();
  private navLinkProps = {
    className: 'P-link',
    activeClassName: 'P-active',
    exact: true
  };

  public componentDidMount() {
    this.fetchCart();
    window.addEventListener(DispatcherChannels.CartItemsUpdate, this.fetchCart);
    Broadcast.subscribe(DispatcherChannels.StorageUpdate, this.storageUpdate);
    Storage.profile && this.configureNotifications();
    this.connectNotificationsSocket();
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener(DispatcherChannels.CartItemsUpdate, this.fetchCart);
    Broadcast.unsubscribe(DispatcherChannels.StorageUpdate, this.storageUpdate);
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private storageUpdate = () => {
    this.forceUpdate();
  };

  public async configureNotifications() {
    this.timer = setInterval(async() => { // Temporary TODO -> change to socket
      const result = await NotificationController.GetUnseenList();

      if (result && result.success) {
        this.safeSetState({ notificationIconNumber: result.data });
      }
    }, 10000)
  }

  private connectNotificationsSocket() {
    Socket.connection && Socket.connection.on('NewMessage', () => {
      const { notificationIconNumber } = this.state;
      this.safeSetState({ notificationIconNumber: notificationIconNumber + 1 });
    });
  }

  private fetchCart = async () => {
    const result = await BasketController.GetCount();
    this.safeSetState({ cartIconNumber: result.data });
  };

  private toggleAuth = () => {
    const { authOpen, mobileMenuOpen } = this.state;
    this.safeSetState({
      authOpen: !authOpen,
      mobileMenuOpen: !mobileMenuOpen || false // Close if from mobile
    });
  };

  private openCategories = () => {
    this.safeSetState({ categoryOpen: true });
    document.addEventListener('mousemove', this.closeCategories);
  };

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
  };

  private searchChange = async (value: string) => {
    if (value.trim()) {
      this.safeSetState({ searchLoader: true, searchOpen: false, searchValue: value, searchResult: null }, async () => {
        Connection.AbortAll();
        const data = await ProductController.Search(value);

        if (data.aborted) {
          return
        }

        const { searchLoader } = this.state;

        // If searchLoader has changed, don't show the result
        if (data?.data?.products.length){

          this.safeSetState({
            searchResult: data.data,
            searchHistoryShown: false,
            searchOpen: true
          });
        } else {
          this.safeSetState({
            searchResult:  data.data,
            searchHistoryShown: true,
            searchOpen: false,
          });
          setTimeout(() => this.safeSetState({ searchOpen: true }));
        }

        if (!data?.aborted) {
          this.safeSetState({ searchLoader: false });
        }
      });
    } else {
      Connection.AbortAll();
      this.safeSetState({
        searchValue: '',
        searchOpen: false,
        searchLoader: false,
        searchResult: {
          products: SearchHistory.items,
          categories: []
        },
        searchHistoryShown: true
      });
    }
  };

  private closeSearch = () => this.safeSetState({ searchOpen: false, searchHistoryShown: false });

  private toggleMobileMenu = () => {
    const { mobileMenuOpen } = this.state;
    this.safeSetState({ mobileMenuOpen: !mobileMenuOpen });
  };

  private toggleNotifications = (e?: Event | React.SyntheticEvent) => {
    e && e.stopPropagation();
    const { notificationOpen } = this.state;
    if (!notificationOpen) {
      this.configureNotifications();
    }
    this.safeSetState({ notificationOpen: !notificationOpen });
  };

  private onNotificationSeenChange = (all: boolean) => {
    const { notificationIconNumber } = this.state;
    if (notificationIconNumber && notificationIconNumber > 0) {
      this.safeSetState({ notificationIconNumber: all ? 0 : notificationIconNumber - 1 });
    }
  };

  private searchFocus = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { searchValue } = this.state;
    if (!searchValue) SearchHistory.items.length && this.safeSetState({
      searchOpen: true,
      searchHistoryShown: true,
      searchResult: {
        products: SearchHistory.items,
        categories: []
      }
    }); else this.safeSetState({ searchOpen: true, searchHistoryShown: false });
  };

  private showMobileSearch = () =>{
    const { mobileSearchOpen } = this.state;
    this.safeSetState({ mobileSearchOpen: !mobileSearchOpen });
  }

  private searchSubmit = () => {
    const { searchValue } = this.state;

    if (searchValue) {
      this.safeSetState({ searchOpen: false, searchLoader: false });
      window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?text=${searchValue}`);
      window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));
    } else {
      window.routerHistory.push(ROUTES.PRODUCTS.MAIN);
      window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));
    }
  };

  private openProducts = () => window.dispatchEvent(new CustomEvent(DispatcherChannels.ProductFilterChange, { detail: { makeEmpty: true }}));

  public render() {
    const {
      authOpen,
      categoryOpen,
      cartIconNumber,
      notificationIconNumber,
      notificationOpen,
      searchOpen,
      searchValue,
      searchResult,
      searchLoader,
      searchHistoryShown
    } = this.state;

    return (
      <header ref={this.header} className="G-flex G-flex-align-center G-flex-justify-center">
        <Screen.SmallDesktop>
          {((matches: boolean) => !matches ? <>
            <Link to={ROUTES.HOME} className="P-logo G-mr-auto">
              <img src={LogoImage} className="G-full-width"/>
            </Link>

            {environment.WHOLESALE ? <WholesaleContent/> : <>
              <div className="P-search-wrapper P-desktop-search-box">
                <SearchInput
                  onClick={this.searchFocus}
                  onFocus={this.searchFocus}
                  onChange={this.searchChange}
                  onSubmit={this.searchSubmit}
                  clearSearch={true}
                  loading={searchLoader}
                  disableRemoveOnNavigate={true}
                  withSubmit={true}
                />

                {searchOpen && <SearchPopup
                  onClose={this.closeSearch}
                  onSubmit={this.searchSubmit}
                  data={searchResult}
                  searchText={searchValue}
                  historyShown={searchHistoryShown}
                />}

              </div>

              <Link
                to={ROUTES.PRODUCTS.MAIN}
                innerRef={this.categoryOpenLink}
                onMouseOver={this.openCategories}
                onClick={this.openProducts}
                className={`P-link ${categoryOpen ? 'P-active' : ''}`}
              >
                {Settings.translations.online_pharmacy}
                {categoryOpen && <Categories onClose={this.closeCategories}/>}
              </Link>

              <NavLink {...this.navLinkProps} to={ROUTES.PHARMACIES}>{Settings.translations.pharmacies}</NavLink>
              <NavLink {...this.navLinkProps} to={ROUTES.CLINIC.MAIN}>{Settings.translations.clinic}</NavLink>
              <NavLink {...this.navLinkProps} to={ROUTES.BLOG.MAIN}>{Settings.translations.blog}</NavLink>
            </>}

            {Storage.profile ? <Link to={ROUTES.PROFILE.MAIN} className="P-profile">
              <div
                style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
                className="P-image"/>
              {/* <h5>{Storage.profile.firstName}</h5> */}
            </Link> : <span
              onClick={this.toggleAuth}
              className="P-link P-login"
            >{Settings.translations.log_in}</span>}

            {Storage.profile &&
            <a onClick={this.toggleNotifications} className="P-link P-icon G-normal-link P-notification">
              <i className="icon-Group-5515"/>
              {!!notificationIconNumber && <span>{notificationIconNumber > 99 ? '99+' : notificationIconNumber}</span>}
            </a>}

            <Link to={ROUTES.CART} className="P-link P-icon G-normal-link P-cart">
              <i className="icon-Group-5503"/>
              {!!cartIconNumber && <span>{cartIconNumber > 99 ? '99+' : cartIconNumber}</span>}
            </Link>
            <LanguageSwitcher/>

            {authOpen && <Shared.Auth onClose={this.toggleAuth}/>}
            {notificationOpen &&
            <Notifications onClose={this.toggleNotifications} onSeenChange={this.onNotificationSeenChange}/>}
          </> : <this.Mobile/>)}
        </Screen.SmallDesktop>
      </header>
    );
  }

  private Mobile = () => {
    const {
      authOpen,
      cartIconNumber,
      mobileSearchOpen,
      notificationOpen,
      mobileMenuOpen,
      searchOpen,
      searchValue,
      searchResult,
      searchLoader,
      searchHistoryShown } = this.state;

    return <div className="P-mobile-header">
      <div className="P-burger-menu">
        <img src={burgerMenu} alt="menu" className="G-cursor" onClick={this.toggleMobileMenu}/>
      </div>
      <Link to={ROUTES.HOME} className="P-logo P-logo-mobile">
        <img src={LogoImage} className="G-full-width"/>
      </Link>

      <div className="P-mobile-header-icons">
        {Storage.profile ? <Link to={ROUTES.PROFILE.MAIN} className="P-profile P-link P-icon G-normal-link">
          <div
            style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
            className="P-image"
          />
        </Link> : <span
          onClick={this.toggleAuth}
          className="P-link P-login P-login-mobile"
        ><img src={ProfileImage} /></span>
        }
        <a onClick={this.showMobileSearch} className="P-link P-icon G-normal-link P-notification">
          <i className="icon-Group-5502"/>
        </a>
        {mobileSearchOpen &&
          <div className="P-search-wrapper-mobile">
            <SearchInput
                onClick={this.searchFocus}
                onFocus={this.searchFocus}
                onChange={this.searchChange}
                onSubmit={this.searchSubmit}
                loading={searchLoader}
                clearSearch={true}
                disableRemoveOnNavigate={true}
                withSubmit={true}
            />

            {searchOpen && <SearchPopup
                onClose={this.closeSearch}
                onSubmit={this.searchSubmit}
                data={searchResult}
                searchText={searchValue}
                historyShown={searchHistoryShown}
            />}
          </div>
        }
        <Link to={ROUTES.CART} className="P-link P-icon G-normal-link P-cart">
          <i className="icon-Group-5503"/>
          {!!cartIconNumber && <span>{cartIconNumber > 99 ? '99+' : cartIconNumber}</span>}
        </Link>
      </div>

      {authOpen && <Shared.Auth onClose={this.toggleAuth}/>}
      {notificationOpen &&
      <Notifications onClose={this.toggleNotifications} onSeenChange={this.onNotificationSeenChange}/>}
      {mobileMenuOpen && <MobileMenu onClose={this.toggleMobileMenu} onOpenNotification={this.toggleNotifications} onAuthOpen={this.toggleAuth}/>}
    </div>;
  };
}

export default Header;
