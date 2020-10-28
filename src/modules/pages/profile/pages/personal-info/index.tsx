import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import DetailsForm from './components/details-form';
import PasswordForm from './components/password-form';

@byPrivateRoute(ROUTES.PROFILE.MAIN)
class PersonalInfo extends HelperComponent<{}, {}> {

  public render() {

    return (
      <Layout>
        <div className="G-flex G-flex-wrap G-flex-align-start">
          <DetailsForm />
          <PasswordForm />
        </div>
      </Layout>
    );
  }
}

export default PersonalInfo;