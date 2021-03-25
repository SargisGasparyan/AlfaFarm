import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import OrderController from 'platform/api/order';
import { IOrderListResponseModel, IOrderDetailsResponseModel } from 'platform/api/order/models/response';
import List  from './components/list';
import Details from './pages/details';
import Pagination from 'components/pagination';
import { paginationPageLimit } from 'platform/constants';
import { IPagingResponse } from 'platform/constants/interfaces';
import EmptyState from 'components/empty-state';

import './style.scss';

interface IState {
  data?: IPagingResponse<IOrderListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.ORDERS.MAIN)
class Orders extends HelperComponent<{}, IState> {

  public state: IState = {};

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
        <h2 className="G-clr-main G-mb-30">{Settings.translations.order_history}</h2>
        <div className="G-flex P-profile-orders">
          {data ? (data.list.length ? <List
            redirectUrl={(row: IOrderDetailsResponseModel) => ROUTES.PROFILE.ORDERS.DETAILS.replace(':id', row.id)}
            data={data.list}
          /> : <EmptyState text={Settings.translations.empty_orders_list} />) : null}
        </div>
        <Pagination<IOrderListResponseModel> fetchData={this.fetchData} />
      </Layout>
    );
  }
}

export default { Orders, Details };
