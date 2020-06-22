import * as React from 'react';
import { Link } from 'react-router-dom';

import ClickOutside from '../../../click-outside';
import Settings from 'platform/services/settings';
import Storage from 'platform/services/storage';
import ROUTES from 'platform/constants/routes';
import { ProfileTariffPlanEnum } from 'platform/api/user';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps { onClose(e: MouseEvent | React.SyntheticEvent): void; };
class ProfileMenu extends HelperComponent<IProps, {}> {

  private get tariffColorClass() {
    switch (Storage.profile.tariffPlan) {
      case ProfileTariffPlanEnum.Silver: return 'P-silver';
      case ProfileTariffPlanEnum.Gold: return 'P-gold';
      default: return '';
    }  
  }

  public render() {
    const { onClose } = this.props;

    return (
      <ClickOutside onClickOutside={onClose}>
        <div className="P-profile-dropdown">
          <div className={`P-header ${this.tariffColorClass}`}>
           <div className="P-my-account">
              {Settings.translations.my_account}
                <Link to={ROUTES.PROFILE.MAIN} onClick={onClose}>
                  <i className="icon-edit"/>
                </Link>
              {!!Storage.profile.points && <span className="P-points">{Storage.profile.points} {Settings.translations.user_points}</span>}
            </div>
            <h3 className="P-profile-email">{Storage.profile.email}</h3>
          </div>
          <ul>
            <li><Link to={ROUTES.PROFILE.MY_ORDERS} onClick={onClose}><i className="icon-orders" /> {Settings.translations.my_orders}</Link></li>
            <li><Link to={ROUTES.PROFILE.MY_REQUESTS} onClick={onClose}><i className="icon-requests" /> {Settings.translations.my_requests}</Link></li>
            <li><Link to={ROUTES.PROFILE.MY_COMPANY} onClick={onClose}><i className="icon-company" /> {Settings.translations.my_companies}</Link></li>
            <li><Link to={ROUTES.PROFILE.MY_ADDRESSES} onClick={onClose}><i className="icon-location" /> {Settings.translations.my_addresses}</Link></li>
            <li><Link to={ROUTES.PROFILE.NOTIFICATIONS} onClick={onClose}><i className="icon-notification" /> {Settings.translations.notifications}</Link></li>            
            <li onClick={Settings.logout}><i className="icon-logout" /> {Settings.translations.log_out}</li>
          </ul>
        </div>
      </ClickOutside>
    );
  }
}

export default ProfileMenu;