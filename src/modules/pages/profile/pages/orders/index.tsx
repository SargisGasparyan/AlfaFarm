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
import { getViewEnum, formatDate, formatPrice } from 'platform/services/helper';
import Details from './pages/details';
import Pagination from 'components/pagination';
import { paginationPageLimit } from 'platform/constants';
import { IPagingResponse } from 'platform/constants/interfaces';
import EmptyState from 'components/empty-state';

import './style.scss';
import { statusColorClassNames } from './constants';

interface IState {
  data?: IPagingResponse<IOrderListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.ORDERS.MAIN)
class Orders extends HelperComponent<IState, {}> {

  public state: IState = {};

  private statusViewEnum = getViewEnum(OrderStatusEnum);

  private columnConfig = [
    {
      name: Settings.translations.order_number,
      cell: (row: IOrderListResponseModel) => `#${row.id}`,
    },
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
      cell: (row: IOrderListResponseModel) => formatPrice(row.totalPrice),
    },
    {
      name: Settings.translations.status,
      cell: (row: IOrderListResponseModel) => <span className={statusColorClassNames[row.status]}>{Settings.translations[this.statusViewEnum[row.status]]}</span>,
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
        <h2 className="G-main-color G-mb-30">{Settings.translations.order_history}</h2>
        <div className="G-flex P-profile-orders">
          
          {data ? (data.list.length ? <Table<IOrderListResponseModel>
            redirectUrl={row => ROUTES.PROFILE.ORDERS.DETAILS.replace(':id', row.id)}
            columnConfig={this.columnConfig}
            data={data.list}
          /> : <EmptyState text={Settings.translations.empty_orders_list} />) : null}
        </div>
        <Pagination<IOrderListResponseModel> fetchData={this.fetchData} />
      </Layout>
    );
  }
}

export default { Orders, Details };