import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import DetailsForm from './components/details-form';
import PasswordForm from './components/password-form';
import Settings from 'platform/services/settings';

@byPrivateRoute(ROUTES.PROFILE.MAIN)
class PersonalInfo extends HelperComponent<{}, {}> {

  public render() {

    return (
      <Layout>
        <div className="G-flex G-flex-wrap G-flex-align-start">
          <h2 className="G-clr-main G-mb-30 G-full-width">{Settings.translations.personal_data}</h2>
          <DetailsForm />
          <h2 className="G-clr-main G-mb-30 G-mt-30 G-full-width">{Settings.translations.change_password}</h2>
          <PasswordForm />
        </div>
      </Layout>
    );
  }
}

export default PersonalInfo;