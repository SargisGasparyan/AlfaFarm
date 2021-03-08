import * as React from 'react';
import { NavLink } from 'react-router-dom';

import SearchInput from 'components/search-input';
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

  public render() {
    const { onClose, onAuthOpen } = this.props;

    return (
      <div className="P-mobile-menu">
        <span className="P-mobile-menu-close"><i className="icon-Group-5032 G-clr-orange G-cursor-pointer" onClick={onClose} /></span>
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
        </div>
        <div className="P-mobile-menu-layer" onClick={onClose} />
      </div>);
  }
}
export default MobileMenu;