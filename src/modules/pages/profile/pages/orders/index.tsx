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

import './style.scss';

interface IState {
  data: IOrderListResponseModel[];
};

@byPrivateRoute(ROUTES.PROFILE.ORDERS)
class Orders extends HelperComponent<IState, {}> {

  public state: IState = {
    data: [],
  };

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

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await OrderController.GetHistory();
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <h2 className="G-main-color G-mb-30">{Settings.translations.order_history}</h2>
        <div className="G-flex P-profile-orders">
          <Table<IOrderListResponseModel>
            columnConfig={this.columnConfig}
            data={data}
          />
        </div>
      </Layout>
    );
  }
}

export default Orders;