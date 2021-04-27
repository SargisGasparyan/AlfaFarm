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
import * as animationData from 'assets/animations/EmptyWallet.json';

import simLogo from 'assets/images/cards/sim.svg';
import ArcaCardLogo from 'assets/images/cards/1.svg';
import MasterCardLogo from 'assets/images/cards/2.svg';
import AEBCardLogo from 'assets/images/cards/3.svg';
import VisaCardLogo from 'assets/images/cards/4.svg';

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
    const returnUrl = window.location.pathname + (!!window.location.search ? window.location.search : '?key=true');
    const res = await PaymentController.registerCard(returnUrl);
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

  private getCardImage = (type: number) => {
    let cardImage;
    switch (type) {
      case CardTypeEnum.Visa:
        cardImage = VisaCardLogo;
        break;
      case CardTypeEnum.MasterCard:
        cardImage = MasterCardLogo;
        break;
      case CardTypeEnum.AmericanExpress:
        cardImage = AEBCardLogo;
        break;
      default:
        cardImage = ArcaCardLogo;
        break;
    }

    return cardImage;
  }

  public render() {
    const { list } = this.state;
    return (
      <Layout>
        <div className="G-flex G-flex-align-center G-flex-justify-between G-mb-30">
          <h3 className="G-page-title-left">{Settings.translations.my_wallet}</h3>
          <button onClick={this.createCard} className="G-main-button">{Settings.translations.add_credit_card}</button>
        </div>
        <div className={`P-cards-page ${list && list.length ? 'P-cards-page-has-card' : ''}`}>
          {list && list.map((item, index) =>
            <div className="P-card-wrap G-mb-40" key={index} style={{ backgroundImage: `url('${this.getCardImage(item.type)}')` }}>
              <i className="G-cursor-pointer G-fs-18 P-remove"
                 onClick={() => this.removeCard(`${item.id}`)}/>

              <div className="P-card-bank-info">
                {item.bankName}
                {item.type === CardTypeEnum.Visa ? <div className="P-visa"/> : null}
                {item.type === CardTypeEnum.MasterCard ? <div className="P-master"/> : null}
              </div>

              <div className="P-card-number G-flex ">
                <div className="P-sim" style={{ backgroundImage: `url('${simLogo}')` }}/>
                <span className="P-card-code">{item.pan.slice(-4)}</span>
              </div>

              <div className="P-card-info G-flex G-flex-justify-between">
                <div className="G-flex G-flex-column">
                  <span className="P-card-label">Card holder</span>
                  <span className="P-card-data">{item.cardHolderName}</span>
                </div>
                <div className="G-flex G-flex-column">
                  <span className="P-card-label">Expires</span>
                  <span className="P-card-data">{item.expiration.slice(-2)}/{item.expiration.slice(2, -2)}</span>
                </div>
              </div>
            </div>)}

          {(!list || !list.length) &&
          <EmptyState animationData={animationData} text={Settings.translations.empty_carts_list}/>}

        </div>
      </Layout>
    );
  }
}

export default MyWallet;
