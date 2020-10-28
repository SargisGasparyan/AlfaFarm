import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import { onlyForUsers } from 'platform/guards/routes';
import Layout from '../../components/layout';

@byPrivateRoute(ROUTES.PROFILE.BONUS_CARD, [onlyForUsers])
class MyWallet extends HelperComponent<{}, {}> {

  public render() {

    return (
      <Layout>
        {/* */}
      </Layout>
    );
  }
}

export default MyWallet;