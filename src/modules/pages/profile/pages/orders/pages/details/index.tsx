import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import generic from 'platform/decorators/generic';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import OrderController from 'platform/api/order';
import { IOrderDetailsResponseModel } from 'platform/api/order/models/response';
import PageLoader from 'components/page-loader';
import Settings from 'platform/services/settings';
import { formatDate, getViewEnum } from 'platform/services/helper';
import { OrderStatusEnum } from 'platform/api/order/constants/enums';
import enviroment from 'platform/services/enviroment';
import { Shared } from 'modules';

import './style.scss';


interface IState {
  data?: IOrderDetailsResponseModel;
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute(ROUTES.PROFILE.ORDERS.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = { };

  public componentDidMount() {
    this.fetchData();
  }

  private statusViewEnum = getViewEnum(OrderStatusEnum);

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await OrderController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  }

  private goBack = () => window.routerHistory.goBack();

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        {data ? <div className="G-flex G-flex-wrap P-profile-order-details">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <div className="P-main-info-block G-mr-20">
            <h2 className="G-mb-40 G-orange-color">{Settings.translations.order}</h2>
            
            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.date}
              <span>{formatDate(data.createdDate)}</span>
            </h3>
            
            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.quantity}
              <span>{data.productQuantity}</span>
            </h3>
            
            {data.deliveryDate && <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.delivery_date}
              <span>{formatDate(data.deliveryDate)}</span>
            </h3>}

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.price}
              <span>{data.totalPrice}</span>
            </h3>
            
            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.status}
              <span>{Settings.translations[this.statusViewEnum[data.status]]}</span>
            </h3>
          </div>
          {!enviroment.WHOLESALE && <div className="P-address-block">
            <h2 className="G-mb-40 G-orange-color">{Settings.translations.address}</h2>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.full_name}
              <span>{data.fullName}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.phone_number}
              <span>{data.phone}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.city}
              <span>{data.cityName}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.region}
              <span>{data.regionName}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.address}
              <span>{data.address}</span>
            </h3>
          </div>}

          <Shared.Products.TableList list={data.baskets} />
        </div> : <PageLoader />}
      </Layout>
    );
  }
}

export default Details;