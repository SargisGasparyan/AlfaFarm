import * as React from 'react';
import { Link } from 'react-router-dom';

import PageLoader from 'components/page-loader';
import Modal from 'components/modal';
import ROUTES from 'platform/constants/routes';
import OrderController, { OrderStatusEnum, IOrderDetailsItem, OrderPaymentMethodEnum, OrderDeliveryTypeEnum } from 'platform/api/order';
import Settings from 'platform/services/settings';
import { getViewEnum, formatDate } from 'platform/services/helper';
import { orderStatusClass } from '../../services/helper';
import { currency } from 'platform/constants';
import { IProductListItem } from 'platform/api/product';
import Cancel from './components/cancel';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';


interface IProps {
  id: string;
  active?: boolean;
  onClose(updateData?: boolean): void;
};

interface IState {
  data: IOrderDetailsItem | null;
  cancelOpened: boolean;
};


class Details extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    data: null,
    cancelOpened: false,
  };

  private statusViewEnum = getViewEnum(OrderStatusEnum);
  private deliveryTypeViewEnum = getViewEnum(OrderDeliveryTypeEnum);
  private paymentMethodViewEnum = getViewEnum(OrderPaymentMethodEnum);

  public async componentDidMount() {
    const { id, onClose } = this.props;
    const result = await OrderController.Details(id);
    
    if (!result.success) onClose();
    else this.safeSetState({ data: result.data });
  }

  private goToProduct = async (product: IProductListItem) => {
    const alertify = await import('alertifyjs');

    if (!product.navigate) alertify.error(Settings.translations.product_deleted_warning);
    else {
      const route = product.productVersionId ? 
        ROUTES.PRODUCTS.DETAILS.replace(':id', `${product.productId}?version=${JSON.stringify(product.attributes)}`) :
        ROUTES.PRODUCTS.DETAILS.replace(':id', product.productId);
      window.routerHistory.push(route);
    }
  }

  private openCancel = () => this.safeSetState({ cancelOpened: true });
  private closeCancel = (canceled: boolean) => {
    const { onClose } = this.props;
    if (canceled) onClose(true);
    else this.safeSetState({ cancelOpened: false });
  }


  private OrderItem = ({ order }: { order: IOrderDetailsItem }) => <>
    <div className="P-border-line" />
    {order.products.map(item => <div
      key={item._id}
      onClick={() => this.goToProduct(item)}
      className="P-product"
    >
      <div className="P-image">
        <div style={{ background: `url("${item.image}") center/cover` }} />
      </div>
      <h3 className="P-texts">
        {item.name}
        {!!item.attributes.length && <span className="P-attributes">
          {item.attributes.map(attribute => <React.Fragment key={attribute.attributeId}>
            {attribute.attributeName}: {attribute.optionName}&nbsp;
          </React.Fragment>)}
        </span>}
        <span>{item.count}x {item.price} {currency}</span>
      </h3>
    </div>)}
  </>;

  private Content = () => {
    const { onClose, active } = this.props;
    const { data, cancelOpened } = this.state;

    if (data) {
      return !cancelOpened ? (
        <Modal onClose={() => onClose()} className="P-order-details P-modal-static G-fields-form">
          <h2>
            {Settings.translations.order_id} #{data.nid}
            {!active &&
            <span className={`P-request-status ${orderStatusClass(data.status)}`}>&bull; {Settings.translations[this.statusViewEnum[data.status]]}</span>}
          </h2>
          <span className="P-order-wrapper">
            <h3><span>{Settings.translations.type}:&nbsp;</span> {Settings.translations[this.deliveryTypeViewEnum[data.deliveryType]]}</h3>
            <h3><span>{Settings.translations.status}:&nbsp;</span> {Settings.translations.draft}</h3>
            {data.deliveryDate && <h3><span>{Settings.translations.delivery_date}:&nbsp;</span> {formatDate(data.deliveryDate)}</h3>}
            {data.paymentMethod && <h3><span>{Settings.translations.payment_method}:&nbsp;</span> {Settings.translations[this.paymentMethodViewEnum[data.paymentMethod]]}</h3>}
            <h3><span>{Settings.translations.payer}:&nbsp;</span> {data.payer}</h3>
          </span>
          
          <this.OrderItem order={data} />
          {data.deliveryAddress && <>
            <div className="P-border-line" />
            <h2>{Settings.translations.delivery_address}</h2>
            <h3>{data.deliveryAddress.address}</h3>
            <h3>{data.deliveryAddress.contactName} &middot; {data.deliveryAddress.contactPhoneNumber}</h3>
          </>}
          {data.billingAddress && <>
            <div className="P-border-line" />
            <h2>{Settings.translations.billing_address}</h2>
            <h3>{data.billingAddress}</h3>
          </>}
          {data.comment && <>
            <div className="P-border-line" />
            <h2>{Settings.translations.additionally}</h2>
            <h3>{data.comment}</h3>
          </>}
          <div className="P-border-line" />
          <h2>{Settings.translations.pricing}</h2>
          <h3><span>{Settings.translations.subtotal}</span> {data.subTotal} {currency}</h3>
          {!!data.receivingBonuses && <h3>
            <span>{Settings.translations.receiving_bonus}</span>
            <p className="G-main-color">{data.receivingBonuses}</p>
          </h3>}
          {!!data.points && <h3>
            <span>{Settings.translations.points}</span>
            <p className="G-pink">-{data.points}</p>
          </h3>}
          <h3>
            <span>{Settings.translations.discount}</span>
            <p className="G-pink">{data.discount ? `-${data.discount}` : 0} {currency}</p>
          </h3>
          {!!data.deliveryFee && <h3><span>{Settings.translations.delivery}</span> {data.deliveryFee} {currency}</h3>}
          <hr />
          <h3><span>{Settings.translations.total}</span> <strong>{data.total} {currency}</strong></h3>
          <Link to={`${ROUTES.CART}?orderId=${data._id}`} className="G-form-button" onClick={() => onClose(false)}>{Settings.translations.repeat}</Link>
          {data.status !== OrderStatusEnum.Finished && data.status !== OrderStatusEnum.Canceled && <button className="G-form-button G-form-button-transparent" onClick={this.openCancel}>{Settings.translations.canceled}</button>}
        </Modal>
      ) : <Cancel id={data._id} onClose={this.closeCancel} />;
    } else return null;
  }

  public render() {
    const { data } = this.state;
    return data ? <this.Content /> : <PageLoader />;
  }
};

export default Details;
