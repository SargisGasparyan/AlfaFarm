import * as React from 'react';
import * as JsBarcode from 'jsbarcode';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import Storage from 'platform/services/storage';
import { IBonusCardDetailsWithHistoryResponseModel, IBonusCardHistoryResponseModel, IBonusCardHistoryItemResponseModel } from 'platform/api/bonusCard/models/response';
import { formatDate, formatPrice } from 'platform/services/helper';
import Pagination from 'components/pagination';
import { paginationPageLimit } from 'platform/constants';
import { BonusStatusEnum } from 'platform/api/bonusCard/constants/enums';
import BonusCardController from 'platform/api/bonusCard';
import { onlyForUsers } from 'platform/guards/routes';

import CardImage from 'assets/images/card.png';
import BonusCardCoin from 'assets/images/coin.png';

import './style.scss';
import EmptyState from "../../../../../components/empty-state";
import * as animationData from "../../../../../assets/animations/EmptyOrderList.json";
import * as loadingData from 'assets/animations/loading.json';

interface IState {
  data?: IBonusCardDetailsWithHistoryResponseModel;
  isLoading: boolean;
};

@byPrivateRoute(ROUTES.PROFILE.BONUS_CARD, [onlyForUsers])
class BonusCard extends HelperComponent<IState, {}> {

  public state: IState = {
    isLoading: true,
  };

  private columnConfig = [
    {
      name: Settings.translations.order_number,
      cell: (row: IBonusCardHistoryItemResponseModel) => `#${row.orderId}`,
    },
    {
      name: Settings.translations.date,
      cell: (row: IBonusCardHistoryItemResponseModel) => formatDate(row.date),
    },
    {
      name: Settings.translations.price,
      cell: (row: IBonusCardHistoryItemResponseModel) => formatPrice(row.amount),
    },
    {
      name: Settings.translations.bonus,
      cell: (row: IBonusCardHistoryItemResponseModel) => row.status === BonusStatusEnum.Recieved
        ? <span className="G-clr-main">+{row.bonus}</span>
        : <span className="G-clr-orange">-{row.bonus}</span>,
    },
  ];

  private fetchData = async (pageNumber: number) => {
    const body = {
      pageNumber,
      pageSize: paginationPageLimit,
    };

    const result = await BonusCardController.GetDetailsWithHistory(body);

    this.safeSetState({ data: result.data, isLoading: false }, () => {
      JsBarcode('#barcode', result.data.bonusCardDetails.cardNumber, { format: 'code128', displayValue: false });
    });
    return result.data && result.data.bonusHistoryGroupedByDate;
  }

  public render() {
    const { data, isLoading } = this.state;
    const datesList = data && data.bonusHistoryGroupedByDate && data.bonusHistoryGroupedByDate.list;

    return (
      <Layout>
        <h2 className="G-clr-main G-mb-30">{Settings.translations.bonus_card}</h2>
        {data && <div className="G-flex P-profile-bonus-card">
          <div className="P-card-details">
            <div className="P-card">
                <img src={CardImage} alt="card" />
                <span className="G-clr-orange P-bonus-amount m">5000</span>
                <img className="P-bonus-coin" src={BonusCardCoin} alt="coin"/>
            </div>
            <div className="P-barcode">
              <h3>{Storage.profile.firstName} {Storage.profile.lastName}</h3>
              <img id="barcode" />
              <h4>{data.bonusCardDetails.cardNumber}</h4>
            </div>
          </div>
          {datesList && !!datesList.length && datesList.map(item => <div key={item.date} className="P-date-block">
            <h3>{formatDate(item.date, false)}</h3>
            <Table<IBonusCardHistoryItemResponseModel>
              redirectUrl={row => ROUTES.PROFILE.ORDERS.DETAILS.replace(':id', row.orderId)}
              columnConfig={this.columnConfig}
              data={item.bonusHistory}
            />
          </div>)}
          {(!datesList || !datesList.length) &&
          <EmptyState animationData={isLoading ? loadingData : animationData} height={175} text={isLoading ? '' : Settings.translations.bonus_card_empty}/>}
        </div>}
        <Pagination<IBonusCardHistoryResponseModel> fetchData={this.fetchData} />
      </Layout>
    );
  }
}

export default BonusCard;
