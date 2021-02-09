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
import { formatDate, formatPrice, getViewEnum } from 'platform/services/helper';
import { PaymentTypeEnum } from 'platform/constants/enums';
import enviroment from 'platform/services/enviroment';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import { OrderStatusEnum, OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import { Shared } from 'modules';

import './style.scss';
import { statusColorClassNames } from '../../constants';

interface IState {
  data?: IOrderDetailsResponseModel;
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute(ROUTES.PROFILE.ORDERS.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {};

  public componentDidMount() {
    this.fetchData();
    window.addEventListener(DispatcherChannels.UserConfirmed, this.cancel);
    window.addEventListener(DispatcherChannels.UserCanceled, this.toggleConfirm);
  }
  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener(DispatcherChannels.UserConfirmed, this.cancel);
    window.removeEventListener(DispatcherChannels.UserCanceled, this.toggleConfirm);

  }
  private statusViewEnum = getViewEnum(OrderStatusEnum);
  private paymentViewEnum = getViewEnum(PaymentTypeEnum);

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await OrderController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  }

  private goBack = () => window.routerHistory.goBack();

  private repeatOrder = async () => {
    const { data } = this.state;

    if (data) {
      const result = await OrderController.Repeat(data.id);
      result.data && window.routerHistory.push(ROUTES.CART);
    }
  }
  private toggleConfirm = () => window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm, { detail: Settings.translations.cancel_order }));
  private cancel = async () => {
    const { data } = this.state;
    const alertify = await import('alertifyjs');
    
    if (data) {
      const res = await OrderController.Cancel(data?.id);
      if (res && res.data) {
        alertify.success(Settings.translations.order_canceled);
        this.toggleConfirm();
        this.fetchData();
        window.routerHistory.goBack();
      } else alertify.error(res.message)
    }
  }
  public render() {
    const { data } = this.state;

    return (
      <Layout>
        {data ? <div className="G-flex G-flex-wrap P-profile-order-details">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <div className="P-main-info-block G-mr-20">
            <h2 className="G-mb-40 G-orange-color">{Settings.translations.order} <span className="G-ml-10">#{data.id}</span></h2>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.date}
              <span>{formatDate(data.createdDate)}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.delivery_date}
              <span>{data.deliveryDate ? formatDate(data.deliveryDate) : Settings.translations.as_soon_as_possible}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.price}
              <span>{formatPrice(data.totalPrice)}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.status}
              <span className={statusColorClassNames[data.status]}>{Settings.translations[this.statusViewEnum[data.status]]}</span>
            </h3>

            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.payment_method}
              <span>{Settings.translations[this.paymentViewEnum[data.paymentType]]}</span>
            </h3>
            <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.comment}
              <span>{data.comment || '-'}</span>
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
              {Settings.translations.address}
              <span>{data.address}</span>
            </h3>

            {data.building && <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.building}
              <span>{data.building}</span>
            </h3>}

            {data.entrance && <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.entrance}
              <span>{data.entrance}</span>
            </h3>}
            
            {data.appartment && <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.apartment}
              <span>{data.appartment}</span>
            </h3>}

            {data.floor && <h3 className="G-flex G-mb-30 G-flex-justify-between">
              {Settings.translations.floor}
              <span>{data.floor}</span>
            </h3>}
          </div>}

          <Shared.Products.TableList list={data.baskets} />

          <div className="P-actions-block">
            {data.status === OrderStatusEnum.Pending && <button className="G-main-button" onClick={this.toggleConfirm}>
              {Settings.translations.cancel}
            </button>}
            <button className="G-main-button G-ml-20" onClick={this.repeatOrder}>
              {Settings.translations.buy_again}
            </button>
          </div>
        </div> : <PageLoader />}
      </Layout>
    );
  }
}

export default Details;