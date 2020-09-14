import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import OrderController from 'platform/api/order';
import { IOrderListResponseModel } from 'platform/api/order/models/response';
import { OrderStatusEnum } from 'platform/api/order/constants/enums';
import { getViewEnum, formatDate } from 'platform/services/helper';
import SavedBaskets from './components/saved-baskets';
import SavedBasketItems from './pages/saved-basket-items';
import Details from './pages/details';
import Pagination from 'components/pagination';
import { paginationPageLimit } from 'platform/constants';
import { IPagingResponse } from 'platform/constants/interfaces';

import './style.scss';

interface IState {
  data?: IPagingResponse<IOrderListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.ORDERS.MAIN)
class Orders extends HelperComponent<IState, {}> {

  public state: IState = {};

  private statusViewEnum = getViewEnum(OrderStatusEnum);

  private columnConfig = [
    {
      name: Settings.translations.date,
      cell: (row: IOrderListResponseModel) => formatDate(row.createdDate),
    },
    {
      name: Settings.translations.quantity,
      cell: (row: IOrderListResponseModel) => row.productQuantity,
    },
    {
      name: Settings.translations.address,
      cell: (row: IOrderListResponseModel) => row.address,
    },
    {
      name: Settings.translations.price,
      cell: (row: IOrderListResponseModel) => <>{row.totalPrice} AMD</>,
    },
    {
      name: Settings.translations.status,
      cell: (row: IOrderListResponseModel) => Settings.translations[this.statusViewEnum[row.status]],
    },
  ];

  private fetchData = async (pageNumber: number) => {
    const body = {
      pageNumber,
      pageSize: paginationPageLimit,
    };

    const result = await OrderController.GetHistory(body);

    this.safeSetState({ data: result.data });
    return result.data;
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <SavedBaskets />
        <h2 className="G-main-color G-mb-30">{Settings.translations.order_history}</h2>
        <div className="G-flex P-profile-orders">
          {data && <Table<IOrderListResponseModel>
            redirectUrl={row => ROUTES.PROFILE.ORDERS.DETAILS.replace(':id', row.id)}
            columnConfig={this.columnConfig}
            data={data.list}
          />}
        </div>
        <Pagination<IOrderListResponseModel> fetchData={this.fetchData} />
      </Layout>
    );
  }
}

export default { Orders, Details, SavedBasketItems };