import SearchInput from 'components/search-input';
import HelperComponent from 'platform/classes/helper-component';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
interface IState {
  search: string;
}
interface IProps {
  close: () => void;
}
class MobileMenu extends HelperComponent<IProps, IState> {
  public state: IState = {
    search: ''
  }
  private navLinkProps = {
    className: 'P-link',
    activeClassName: 'P-active',
    exact: true,
  };
  private change = (value: string) => this.safeSetState({ search: value });
  public render() {
    const { close } = this.props;
    return (
      <div className="P-mobile-menu">
        <span className="P-mobile-menu-close"><i className="icon-Group-5032 G-orange-color G-cursor-pointer G-fs-24" onClick={close} /></span>
        <div className="P-mobile-menu-content">
          <div className="G-mb-20"><SearchInput onChange={this.change} /></div>
          <NavLink {...this.navLinkProps} to={ROUTES.PHARMACIES} onClick={close}>{Settings.translations.pharmacies}</NavLink>
          <NavLink {...this.navLinkProps} to={ROUTES.CLINIC.MAIN} onClick={close}>{Settings.translations.clinic}</NavLink>
          <NavLink {...this.navLinkProps} to={ROUTES.BLOG.MAIN} onClick={close}>{Settings.translations.blog}</NavLink>
        </div>
        <div className="P-mobile-menu-layer" onClick={close} />
      </div>);
  }
}
export default MobileMenu;