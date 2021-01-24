import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import { onlyForUsers } from 'platform/guards/routes';
import Layout from '../../components/layout';
import EmptyState from 'components/empty-state';
import Settings from 'platform/services/settings';
import PaymentController from 'platform/api/payment';
interface IState {
  list: any;
}
@byPrivateRoute(ROUTES.PROFILE.MY_WALLET, [onlyForUsers])
class MyWallet extends HelperComponent<{}, IState> {
  public componentDidMount() {
    this.getUserCardList();
  }
  public state: IState = {
    list: null
  }
  private getUserCardList = async () => {
    const res = await PaymentController.getUserCards();
    if (res && res.success) {
      this.safeSetState({ list: res.data });
    }
  }
  public render() {

    return (
      <Layout>
        {/* */}
        <EmptyState text={Settings.translations.empty_card_list} />
      </Layout>
    );
  }
}

export default MyWallet;