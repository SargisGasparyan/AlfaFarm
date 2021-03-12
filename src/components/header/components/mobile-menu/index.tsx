import * as React from 'react';
import { NavLink } from 'react-router-dom';

import SearchInput from 'components/search-input';
import Storage from 'platform/services/storage';
import { leftSideOptions } from 'modules/pages/profile/components/left-side/constants/routes';
import PersonImage from 'assets/images/person.png';
import { getMediaPath } from 'platform/services/helper';
import HelperComponent from 'platform/classes/helper-component';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './index.scss';
import LanguageSwitcher from '../language-switcher';

interface IState {
  search: string;
}

interface IProps {
  onClose(): void;
  onAuthOpen(): void;
}

class MobileMenu extends HelperComponent<IProps, IState> {

  public state: IState = {
    search: ''
  };

  private navLinkProps = {
    className: 'P-link',
    activeClassName: 'P-active',
    exact: true,
  };

  public componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    document.body.style.overflow = 'initial';
  }

  private options = leftSideOptions();

  private searchSubmit = (value: string) => {
    const { onClose } = this.props;
    const query = new URLSearchParams(window.location.search);
    const oldValue = query.get('text');

    if (oldValue !== value) {
      if (value.length) query.set('text', value);
      else query.delete('text');

      window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));
      onClose();
    }
  }

  private change = (value: string) => this.safeSetState({ search: value });

  private logout = () => {
    window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm, { detail: { text: Settings.translations.log_out_question } }));
    window.addEventListener(DispatcherChannels.UserConfirmed, Settings.logout);
    window.addEventListener(DispatcherChannels.UserCanceled, this.logoutCanceled);
  }

  private logoutCanceled = () => {
    window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm));
    window.removeEventListener(DispatcherChannels.UserConfirmed, Settings.logout);
    window.removeEventListener(DispatcherChannels.UserCanceled, this.logoutCanceled);
  }

  public render() {
    const { onClose, onAuthOpen } = this.props;

    return (
      <div className="P-mobile-menu-wrapper">
        <div className="P-mobile-menu">
          <span className="P-mobile-menu-close"><i className="icon-Group-5032 G-clr-orange G-cursor-pointer" onClick={onClose} /></span>
          {Storage.profile && <div className="P-menu-profile-name G-text-center">
            <div
              style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
              className="P-image"
            />
            <span className="G-fs-18">{Storage.profile.firstName} </span><span className="G-fs-18"> {Storage.profile.lastName}</span></div>}
          <div className="P-mobile-menu-content">
            <div className="G-mb-20">
              <SearchInput
                onChange={this.change}
                onSubmit={this.searchSubmit}
                withSubmit={true}
              />
            </div>

            {!Settings.token && <a className="P-link" onClick={onAuthOpen}>{Settings.translations.log_in}</a>}

            <NavLink {...this.navLinkProps} to={ROUTES.PHARMACIES} onClick={onClose}>{Settings.translations.pharmacies}</NavLink>
            <NavLink {...this.navLinkProps} to={ROUTES.CLINIC.MAIN} onClick={onClose}>{Settings.translations.clinic}</NavLink>
            <NavLink {...this.navLinkProps} to={ROUTES.BLOG.MAIN} onClick={onClose}>{Settings.translations.blog}</NavLink>
            <LanguageSwitcher />
            {Storage.profile && <hr className="G-my-15" />}
            {Storage.profile && <div className="P-menu-profile">
              {this.options.map(item => <NavLink
                to={item.path}
                key={item.path}
                className="P-link"
                onClick={onClose}
              >
                {item.name}
              </NavLink>)}
            </div>}

            <div onClick={this.logout} className="P-link">
              {Settings.translations.log_out}
            </div>
          </div>
          <div className="P-mobile-menu-layer" onClick={onClose} />
        </div>
      </div>
    );
  }
}
export default MobileMenu;