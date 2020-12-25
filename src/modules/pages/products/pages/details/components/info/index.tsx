import * as React from 'react';

import CountInput from 'components/count-input';
import Settings from 'platform/services/settings';
import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import BasketController from 'platform/api/basket';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import PharmaciesAvailablity from './components/pharmacies-availablity';
import { formatPrice } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';
import { PromotionTypeEnum } from 'platform/constants/enums';
import { IGetProductPromotionByQuantityModel } from 'platform/api/product/models/request';
import ProductController from 'platform/api/product';

import PinImage from 'assets/images/pin.png';

import './style.scss';

interface IProps {
  data: IProductDetailsResponseModel;
}

interface IState {
  count: number;
  cartLoading: boolean;
  isSelectedPackage: boolean;
  promotionModel: IGetProductPromotionByQuantityModel;
  pharmaciesAvailablityOpen: boolean;
};

class Info extends HelperComponent<IProps, IState> {

  public state: IState = {
    count: 1,
    cartLoading: false,
    pharmaciesAvailablityOpen: false,
    isSelectedPackage: true,
    promotionModel: {
      productId: null,
      quantity: 1,
      isPackage: false
    }
  };

  public componentDidMount() {
    const { data } = this.props;
    // data.basketCount && this.safeSetState({ count: data.basketCount });
  }

  private onCountChange = async (count: number) => {
    const { data } = this.props;

    if (!count && data) {
      await BasketController.Delete(data.id);
      window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    }

    this.safeSetState({ count });
  }
  private getProductPromotionByQuantity = async () => {
    const { promotionModel } = this.state;
    const result = await ProductController.GetProductPromotionByQuantity(promotionModel);
    if (result.success) {
      //
    }
  }
  private changeCart = () => this.safeSetState({ cartLoading: true }, async () => {
    const { data } = this.props;
    const { count } = this.state;

    await BasketController.Change({
      productId: data.id,
      productQuantity: count || 1,
    });

    window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    this.safeSetState({ cartLoading: false, count: count || 1 });
  });

  private togglePharmaciesAvailablity = () => {
    const { pharmaciesAvailablityOpen } = this.state;
    this.safeSetState({ pharmaciesAvailablityOpen: !pharmaciesAvailablityOpen });
  }

  private togglePackage = () => {
    const { isSelectedPackage } = this.state;
    this.safeSetState({ isSelectedPackage: !isSelectedPackage });
  }

  private UnitCount = () => {
    const { data } = this.props;
    const { isSelectedPackage } = this.state;
    if (data.havePackage) {
      return <span onClick={this.togglePackage}>
        <span className={`${isSelectedPackage ? 'P-selected-count-type' : ''}`}>{Settings.translations.package}</span>
        &nbsp; / &nbsp;
        <span className={`${!isSelectedPackage ? 'P-selected-count-type' : ''}`}>{Settings.translations.item}</span>
      </span>
    } else return <span className="P-selected-count-type">{data.unitName}</span>
  }

  private navigateToCategory = () => {
    const { id } = this.props.data.category;
    const query = new URLSearchParams(window.location.search);
    query.set('categoryIds', `${id}`);
    window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
  }

  private navigateToBrand = () => {
    const { id } = this.props.data.brand;
    const query = new URLSearchParams(window.location.search);
    query.set('brandIds', `${id}`);
    window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
  }

  private navigateToProducer = () => {
    const { id } = this.props.data.producer;
    const query = new URLSearchParams(window.location.search);
    query.set('producerIds', `${id}`);
    window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
  }

  private navigateToActiveIngredients = () => {
    const { activeIngredients } = this.props.data;
    const query = new URLSearchParams(window.location.search);
    query.set('activeIngredientIds', activeIngredients.map(item => item.id).join(','));
    window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
  }

  private get discountedPrice() {
    const { data } = this.props;
    const { isSelectedPackage } = this.state;

    return Math.round((isSelectedPackage ? data.packagePromotion.result : data.promotion.result) * 10) / 10
  };

  private get price() {
    const { data } = this.props;
    const { isSelectedPackage } = this.state;

    return isSelectedPackage ? data.packagePrice : data.price;
  }
  public render() {
    const { data } = this.props;
    const { count, cartLoading, pharmaciesAvailablityOpen } = this.state;

    return (
      <div className="P-product-details-info">
        <h2 className="P-name">
          {data.title}
        </h2>
        <h3 className="P-unit">{data.unitQuantity} {data.unitName}</h3>
        {data.category && <h3 className="P-row">
          {Settings.translations.category}
          <span className="P-value G-cursor-pointer" onClick={this.navigateToCategory}>{data.category.name}</span>
        </h3>}
        {data.producer && <h3 className="P-row">
          {Settings.translations.producer}
          <span className="P-value G-cursor-pointer" onClick={this.navigateToProducer}>{data.producer.name}</span>
        </h3>}
        {data.brand && <h3 className="P-row">
          {Settings.translations.brand}
          <span className="P-value G-cursor-pointer" onClick={this.navigateToBrand}>{data.brand.name}</span>
        </h3>}
        <h3 className="P-row">
          {Settings.translations.availability_at_the_nearest_pharmacy}
          <span className="P-value G-cursor-pointer" onClick={this.togglePharmaciesAvailablity}>
            <img src={PinImage} alt="pin" />
          </span>
        </h3>
        {data.activeIngredients && <h3 className="P-row">
          {Settings.translations.active_ingredients}
          <span className="P-value G-cursor-pointer" onClick={this.navigateToActiveIngredients}>{data.activeIngredients.map(item => item.name).join(', ')}</span>
        </h3>}
        <h3>{Settings.translations.description}</h3>
        <p className="P-description">{data.description}</p>
        <div className="P-count-info"><this.UnitCount /></div>
        <div className="P-cart-actions">
          <CountInput
            min={0}
            step={1}
            value={count}
            onChange={this.onCountChange}
          />

          <LoaderContent
            loading={cartLoading}
            className="G-main-button"
            onClick={this.changeCart}
          >{Settings.translations.add_to_cart}</LoaderContent>

          {pharmaciesAvailablityOpen && <PharmaciesAvailablity onClose={this.togglePharmaciesAvailablity} data={data} />}
          <span className="G-orange-color G-ml-auto P-price">
            <span />
            {data.promotion.promotionType === PromotionTypeEnum.Discount ? 
            <> <del>{formatPrice(this.price)}</del> {formatPrice(this.discountedPrice)} </> : <><span>Bonus: { this.discountedPrice }</span> {formatPrice(this.price)}</>}
          </span>
        </div>
      </div>
    );
  };
};

export default Info;
