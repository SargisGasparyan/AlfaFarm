import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { IPagination } from 'platform/constants/interfaces';
import WishController, { IWishListRequestedProduct } from 'platform/api/wish';
import Settings from 'platform/services/settings';
import { getUserName } from 'platform/services/helper';
import { BackArrow, NextArrow } from 'components/slider-arrows';
import { currency } from 'platform/constants';
import ROUTES from 'platform/constants/routes';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IProps {
  id: string;
  owner: boolean;
  getProductsList: ()=> void;
};

interface IState {
  data: IPagination<IWishListRequestedProduct> | null;
  loading: boolean;
};

class RequestedProducts extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    data: null,
    loading: false,
  };

  private currentSlide = 0;
  private skip = 0;
  private limit = 6;
  
  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    const { id } = this.props;
    const { data } = this.state;
    const body = {
      id,
      skip: this.skip,
      limit: this.limit,
    };

    const result = await WishController.Requested(body);

    if (data && !overwrite) result.data.itemList = [...data.itemList, ...result.data.itemList];
    this.safeSetState({ data: result.data, loading: false });
  });
  
  private slide = (slideIndex: number) => {
    const { data } = this.state;
    const nextClicked = slideIndex > this.currentSlide;
    if (data && data.itemList.length - (slideIndex + 1) < 3 && data.pagesLeft && nextClicked) {
      this.skip += this.limit;
      this.fetchData();
    }
    this.currentSlide = slideIndex;
  }

  private cancel = async (e: React.SyntheticEvent, productId: string) => {
    e.preventDefault();
    const { id } = this.props;
    const body = {
      wishListId: id,
      productId,
    };

    const result = await WishController.Cancel(body);
    if (result.success) {
      this.skip = 0;
      this.currentSlide = 0;
      this.fetchData(true);
    }
  }

  private confirm = async (e: React.SyntheticEvent, productId: string) => {
    e.preventDefault();
    const { id } = this.props;
    const body = {
      wishListId: id,
      productId,
    };

    const result = await WishController.Approve(body);
    if (result.success) {
      this.skip = 0;
      this.currentSlide = 0;
      this.fetchData(true);
      this.props.getProductsList();
    }
  }

  public render() {
    const { owner } = this.props;
    const { data, loading } = this.state;

    return data && data.itemList.length ? <>
      <h2>{Settings.translations.requested_products}</h2>
      <Slider
        className="P-requested-products"
        infinite={true}
        draggable={false}
        variableWidth={true}
        afterChange={this.slide}
        prevArrow={!loading ? <BackArrow /> : undefined}
        nextArrow={!loading ? <NextArrow /> : undefined}
      >
        {data.itemList.map(item => <Link
          key={item._id}
          className="P-product"
          to={
            item.productVersion ?
            ROUTES.PRODUCTS.DETAILS.replace(':id', `${item.product}?version=${JSON.stringify(item.attributes)}`) :
            ROUTES.PRODUCTS.DETAILS.replace(':id', item.product)
          }
          title={item.name}
        >
          <h3>
            <b>{item.members.map((member, index) => `${getUserName(member)}${index !== item.members.length - 1 ? ', ' : ' '}`)}</b>
            {Settings.translations.user_request_ask}
          </h3>
          <div className="P-content">
            <div className="P-image">
              <div style={{ background: `url("${item.image}") center/cover` }} />
            </div>
            <div className="P-texts">
              <h3>
                {item.name}
                {!!item.attributes.length && <span className="P-attributes">
                  {item.attributes.map(sub => <React.Fragment key={sub.attributeId}>{sub.attributeName}: {sub.optionName}&nbsp;</React.Fragment>)}
                </span>}
              </h3>
              <h3 className="P-price G-pink">
                {item.discountedPrice || item.defaultPrice} {currency}&nbsp;
                {!!item.discountedPrice && <del>{item.defaultPrice} {currency}</del>}
              </h3>
            </div> 
          </div>
          <div className="P-actions">
            <button className="P-cancel" onClick={e => this.cancel(e, item._id)}>{Settings.translations.cancel}</button>
            {owner && <button className="P-confirm G-main-color" onClick={e => this.confirm(e, item._id)}>{Settings.translations.confirm}</button>}
          </div>
        </Link>)}
      </Slider>
      <div className="P-border-line" />
    </> : null;
  }
};

export default RequestedProducts;
