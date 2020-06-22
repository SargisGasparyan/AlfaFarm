import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

import PageLoader from 'components/page-loader';
import Modal from 'components/modal';
import ROUTES from 'platform/constants/routes';
import RequestController, { IRequest, RequestSendTypeEnum, RequestPackStatusEnum, IRequestDetailsItem, RequestFileTypeEnum } from 'platform/api/request';
import Settings from 'platform/services/settings';
import { getViewEnum, getUserName } from 'platform/services/helper';
import { requestStatusClass } from '../../../../../request/services/helper';
import { currency } from 'platform/constants';
import { IProductListItem } from 'platform/api/product';
import LoaderContent from 'components/loader-content';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import Photo from 'assets/images/photo.png';
import Video from 'assets/images/video.png';
import Audio from 'assets/images/audio.png';
import Doc from 'assets/images/doc.png';

import './style.scss';

interface IProps {
  id: string;
  onClose(): void;
  onListUpdate(): void;
};

interface IState {
  data: IRequest | null;
  cancelLoading: boolean;
};

class RequestDetails extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    data: null,
    cancelLoading: false,
  };

  private statusViewEnum = getViewEnum(RequestPackStatusEnum);

  public async componentDidMount() {
    const { id, onClose } = this.props;
    const result = await RequestController.Details(id);

    if (!result.success) onClose();
    else this.safeSetState({ data: result.data });
  }

  private fileIcon = (type: RequestFileTypeEnum) => {
    switch (type) {
      case RequestFileTypeEnum.Photo: return Photo;
      case RequestFileTypeEnum.Video: return Video;
      case RequestFileTypeEnum.Audio: return Audio;
      default: return Doc;
    }
  }

  private cancelUserConfirm = async () => {
    const { id } = this.props;
    const result = await RequestController.Cancel(id);
    if (result.success) this.props.onListUpdate();
    else this.safeSetState({ cancelLoading: false });
    this.closeConfirm();
  }

  private closeConfirm = () => {
    window.removeEventListener('userconfirmed', this.cancelUserConfirm);
    window.removeEventListener('usercanceled', this.closeConfirm);
    window.dispatchEvent(new CustomEvent('toggleconfirm'));
  }

  private cancel = () => this.safeSetState({ cancelLoading: true }, async () => {
    window.dispatchEvent(new CustomEvent('toggleconfirm'));
    window.addEventListener('userconfirmed', this.cancelUserConfirm);
    window.addEventListener('usercanceled', this.closeConfirm);
  });

  private Pricing = ({ product }: { product: IProductListItem }) => {
    if (product.price) {
      if (product.discountedPrice) {
        return <span className="P-G-pink">
          {product.discountedPrice} {currency}
          <del>{product.price} {currency}</del>
        </span>;
      }

      return <span className="P-G-pink">
        {product.price} {currency}
      </span>
    }

    if (product.maxDiscountedPrice && product.minDiscountedPrice) return <span className="P-G-pink">
      {product.maxDiscountedPrice === product.minDiscountedPrice ?
        <>{product.maxDiscountedPrice} {currency}</> :
        <>{product.minDiscountedPrice}-{product.maxDiscountedPrice} {currency}</>}
      <del>
        {product.maxPrice === product.minPrice ?
          <>{product.maxPrice} {currency}</> :
          <>{product.minPrice}-{product.maxPrice} {currency}</>}
      </del>
    </span>;

    return <span className="P-G-pink">
      {product.maxPrice === product.minPrice ?
        <>{product.maxPrice} {currency}</> :
        <>{product.minPrice}-{product.maxPrice} {currency}</>}
    </span>;
  };

  private RequestItem = ({ request }: { request: IRequestDetailsItem }) => <>
    <div className="P-border-line" />
    {request.category && <h3 className="P-request-item-row">{request.category}</h3>}
    {request.iNeed && <h3 className="P-request-item-row"><span>{Settings.translations.i_need}</span> {request.iNeed}</h3>}
    {request.description && <p className="P-request-item-row">{request.description}</p>}
    {(request.measurementUnit || !!request.count) && <h3 className="P-request-item-row">
      {request.measurementUnit && <><span>{Settings.translations.m_u}</span> {request.measurementUnit} &middot; </>}
      {request.count && <><span>{Settings.translations.quantity}</span> {request.count}</>}
    </h3>}
    {request.files.map((item, index) => <a
      key={index}
      href={item.path}
      target="_blank"
      title={item.originalName}
      role="noopener norefferer"
      className="P-request-attached"
    >
      <img src={this.fileIcon(item.type)} alt="photo" />
      <h4>{item.originalName}</h4>
    </a>)}
    {request.products.map(item => <Link
      to={ROUTES.PRODUCTS.DETAILS.replace(':id', item._id)}
      key={item._id}
      className="P-product"
    >
      <div className="P-image">
        <div style={{ background: `url("${item.image}") center/cover` }} />
      </div>
      <h3 className="P-pricing">
        {item.name}
        <this.Pricing product={item} />
      </h3>
    </Link>)}
  </>;

  public render() {
    const { onClose } = this.props;
    const { data, cancelLoading } = this.state;

    return data ? (
      <Modal onClose={onClose} className="P-request-details P-modal-static P-G-fields-form">
        <h2>
          {data.type === RequestSendTypeEnum.Form ?
            Settings.translations.request_forms :
            Settings.translations.request_files} #{data.nid}
          {data.status !== RequestPackStatusEnum.Active &&
          <span className={`P-request-status ${requestStatusClass(data.status)}`}>&bull; {Settings.translations[this.statusViewEnum[data.status]]}</span>}
        </h2>
        <h3><span>{Settings.translations.date}</span> {moment(data.createdDt).fromNow()}</h3>
        <h3><span>{Settings.translations.sender}</span> {getUserName(data)}</h3>
        {data.requestList.map(item => <this.RequestItem key={item._id} request={item} />)}
        {data.status === RequestPackStatusEnum.Active && <LoaderContent loading={cancelLoading} className="P-G-form-button" onClick={this.cancel}>
          Cancel
        </LoaderContent>}
      </Modal>
    ) : <PageLoader />;
  }
};

export default RequestDetails;
