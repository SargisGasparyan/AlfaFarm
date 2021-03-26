import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import { onlyForUsers } from 'platform/guards/routes';
import Layout from '../../components/layout';
import EmptyState from 'components/empty-state';
import Settings from 'platform/services/settings';
import PaymentController from 'platform/api/payment';
import { IUserCardListModel } from 'platform/api/payment/models/response';
import { CardTypeEnum } from 'platform/constants/enums';
import './style.scss';

interface IState {
  list: IUserCardListModel[] | null;
}

@byPrivateRoute(ROUTES.PROFILE.MY_WALLET, [onlyForUsers])
class MyWallet extends HelperComponent<{}, IState> {
  public componentDidMount() {
    this.getUserCardList();
  }

  public state: IState = {
    list: null
  };
  private getUserCardList = async () => {
    const res = await PaymentController.getUserCards();
    if (res && res.success) {
      this.safeSetState({ list: res.data });
    }
  };

  private createCard = async () => {
    const res = await PaymentController.registerCard();
    if (res && res.success) {
      window.location.href = res.data.formUrl;
    }
  };

  private removeCard = async (id: string) => {
    const res = await PaymentController.removeCard(id);
    if (res && res.success) {
      await this.getUserCardList();
    }
  };

  public render() {
    const { list } = this.state;
    return (
      <Layout>
        <div className={`P-cards-page ${list && list.length ? 'P-cards-page-has-card' : ''}`}>
          {list && list.map((item, index) =>
            <div className="P-card-wrap G-mb-40" key={index}>
              <i className="icon-Group-5032 G-clr-orange G-cursor-pointer G-fs-18 P-remove"
                 onClick={() => this.removeCard(`${item.id}`)}/>

              <div className="P-card-number">
                {item.pan}
                {item.type === CardTypeEnum.Visa ? <div className="P-visa"/> : null}
                {item.type === CardTypeEnum.MasterCard ? <div className="P-master"/> : null}
              </div>
            </div>)}
          <button onClick={this.createCard}
                  className="G-main-button G-ml-auto G-mr-auto G-mt-30">{Settings.translations.add_credit_card}</button>

          {(!list || !list.length) && <EmptyState text={Settings.translations.empty_carts_list}/>}

        </div>
      </Layout>
    );
  }
}

export default MyWallet;
