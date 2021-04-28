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
import environment from 'platform/services/environment';
import { OrderStatusEnum, OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import { statusColorClassNames } from '../../constants';
import List from '../components/list';

import './style.scss';
import ConfirmModal from 'components/confirm-modal';

interface IState {
  data?: IOrderDetailsResponseModel;
  cancelConfirmOpen: boolean;
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute(ROUTES.PROFILE.ORDERS.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {
    cancelConfirmOpen: false
  };

  public componentDidMount() {
    this.fetchData();
  }

  private statusViewEnum = getViewEnum(OrderStatusEnum);
  private paymentViewEnum = getViewEnum(PaymentTypeEnum);
  private deliveryTypeViewEnum = getViewEnum(OrderDeliveryTypeEnum);

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await OrderController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  };

  private goBack = () => window.routerHistory.goBack();

  private repeatOrder = async () => {
    const { data } = this.state;

    if (data) {
      const result = await OrderController.Repeat(data.id);
      result.data && window.routerHistory.push(ROUTES.CART);
    }
  };

  private toggleConfirm = () => {
    const { cancelConfirmOpen } = this.state;
    this.safeSetState({ cancelConfirmOpen: !cancelConfirmOpen });
  };

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
      } else alertify.error(res.message);
    }
  };

  public render() {
    const { data, cancelConfirmOpen } = this.state;

    return (
      <Layout>
        {data ? <div className="P-profile-order-details">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack}/>}
          <div className="P-info-wraper">
            <div className="P-main-info-block">
              <h2 className="G-mb-40 G-clr-orange">{Settings.translations.order} <span
                className="G-ml-10">#{data.id}</span></h2>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.created_date}
                <span>{formatDate(data.createdDate)}</span>
              </p>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.type}
                <span>{Settings.translations[this.deliveryTypeViewEnum[data.deliveryType]]}</span>
              </p>

              {data.deliveryType === OrderDeliveryTypeEnum.Delivery &&
              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.delivery_date}
                <span>{data.deliveryDate ? formatDate(data.deliveryDate) : Settings.translations.as_soon_as_possible}</span>
              </p>}

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.price}
                <span>{formatPrice(data.totalPrice)}</span>
              </p>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.used_bonus}
                <span>{data.usedBonus}</span>
              </p>

              {!!data.totalBonus && <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.gained_bonus}
                <span>{data.totalBonus}</span>
              </p>}

              {!!data.usedBonus && <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.used_bonus}
                <span>{data.usedBonus}</span>
              </p>}

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.status}
                <span
                  className={statusColorClassNames[data.status]}>{Settings.translations[this.statusViewEnum[data.status]]}</span>
              </p>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.payment_method}
                <span>{Settings.translations[this.paymentViewEnum[data.paymentType]]}</span>
              </p>
              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.comment}
                <span>{data.comment || '-'}</span>
              </p>
            </div>

            {!environment.WHOLESALE && <div className="P-address-block">
              <h2 className="G-mb-40 G-clr-orange">{Settings.translations.address}</h2>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.full_name}
                <span>{data.fullName}</span>
              </p>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.phone_number}
                <span>{data.phone}</span>
              </p>

              <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.address}
                <span>{data.address}</span>
              </p>

              {data.building && <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.building}
                <span>{data.building}</span>
              </p>}

              {data.entrance && <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.entrance}
                <span>{data.entrance}</span>
              </p>}

              {data.appartment && <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.apartment}
                <span>{data.appartment}</span>
              </p>}

              {data.floor && <p className="G-flex G-mb-30 G-flex-justify-between G-fs-20">
                {Settings.translations.floor}
                <span>{data.floor}</span>
              </p>}
            </div>}

          </div>

          <List data={data.baskets}/>

          <div className="P-actions-block">
            {data.status === OrderStatusEnum.Pending &&
            <button className="G-btn G-clr-green" onClick={this.toggleConfirm}>
              {Settings.translations.cancel}
            </button>}
            <button className="G-btn G-clr-green G-ml-20" onClick={this.repeatOrder}>
              {Settings.translations.buy_again}
            </button>
          </div>

          {cancelConfirmOpen && <ConfirmModal
            text={Settings.translations.are_you_sure_cancel_order}
            withoutTitle={true}
            onConfirm={this.cancel}
            onClose={this.toggleConfirm}
          />}
        </div> : <PageLoader/>}
      </Layout>
    );
  }
}

export default Details;
