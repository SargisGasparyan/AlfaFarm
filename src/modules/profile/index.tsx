import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import MyAddresses from './pages/my-addresses';
import MyCompany from './pages/my-company';
import MyRequests from './pages/my-requests';
import MyOrders from './pages/my-orders';
import { byPrivateRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import PersonalDataChange from './components/personal-data-change';
import Notifications from './pages/notifications';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

@byPrivateRoute(ROUTES.PROFILE.MAIN)
class Profile extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="P-G-page P-profile-page">
        <h1 className="P-G-page-title">{Settings.translations.my_account}</h1>
        <PersonalDataChange />
        {/* <PasswordChange /> */}
      </section>
    );
  };
};

export default { Profile, MyAddresses, MyCompany, MyRequests, MyOrders, Notifications };