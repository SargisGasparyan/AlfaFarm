import * as React from 'react';

import CountInput from 'components/count-input';
import Settings from 'platform/services/settings';
import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import BasketController from 'platform/api/basket';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import PharmaciesAvailablity from './components/pharmacies-availablity';

import PinImage from 'assets/images/pin.png';

import './style.scss';
import { formatPrice } from 'platform/services/helper';
import { currency } from 'platform/constants';

interface IProps {
  data: IProductDetailsResponseModel;
}

interface IState {
  count: number;
  cartLoading: boolean;
  havePackage: boolean;
  pharmaciesAvailablityOpen: boolean;
};

class Info extends HelperComponent<IProps, IState> {

  public state: IState = {
    count: 0,
    cartLoading: false,
    pharmaciesAvailablityOpen: false,
    havePackage: false
  };

  public componentDidMount() {
    const { data } = this.props;
    data.basketCount && this.safeSetState({ count: data.basketCount, havePackage: data.havePackage });
  }

  private onCountChange = async (count: number) => {
    const { data } = this.props;

    if (!count && data) {
      await BasketController.Delete(data.id);
      window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    }

    this.safeSetState({ count });
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

  private UnitCount = () => {
    const { data } = this.props;
    const { havePackage } = this.state;
    if (data.havePackage) {
      return <span>
        <span className={`${havePackage ? 'P-selected-count-type' : ''}`} onClick={() => this.safeSetState({ havePackage: true })}>{Settings.translations.package}</span> / 
        <span className={`${!havePackage ? 'P-selected-count-type' : ''}`} onClick={() => this.safeSetState({ havePackage: false })}>{Settings.translations.item}</span>
      </span>
    } else return <span className="P-selected-count-type">{data.unitName}</span>
  }  

  private get price() {
    const { data } = this.props;
    const { havePackage } = this.state;

    if (havePackage) return data.discountedPackagePrice || data.packagePrice;
    return data.discountedPrice || data.price;
  }
  private get defaultPrice() {
    const { data } = this.props;
    const { havePackage } = this.state;
    if (havePackage) return data.packagePrice || null;
    return data.price;
  }
  public render() {
    const { data } = this.props;
    const { count, cartLoading, pharmaciesAvailablityOpen, havePackage } = this.state;

    return (
      <div className="P-product-details-info">
        <h2 className="P-name">
          {data.title}
        </h2>
        <h3 className="P-unit">{data.unitQuantity} {data.unitName}</h3>
        {data.category && <h3 className="P-row">
          {Settings.translations.category}
          <span className="P-value">{data.category.name}</span>
        </h3>}
        {data.brand && <h3 className="P-row">
          {Settings.translations.brand}
          <span className="P-value">{data.brand.name}</span>
        </h3>}
        <h3 className="P-row">
          {Settings.translations.availability_at_the_nearest_pharmacy}
          <span className="P-value G-cursor-pointer" onClick={this.togglePharmaciesAvailablity}>
            <img src={PinImage} alt="pin" />
          </span>
        </h3>
        {data.activeIngredients && <h3 className="P-row">
          {Settings.translations.active_ingredients}
          <span className="P-value">{data.activeIngredients.map(item => item.name).join(', ')}</span>
        </h3>}
        <h3>{Settings.translations.description}</h3>
        <p className="P-description">{data.description}</p>
        <div className="P-count-info"><this.UnitCount /></div>
        <div className="P-cart-actions">
          {!!count && <CountInput
            min={0}
            step={1}
            value={count}
            onChange={this.onCountChange}
          />}

          <LoaderContent
            loading={cartLoading}
            className="G-main-button"
            onClick={this.changeCart}
          >{Settings.translations.add_to_cart}</LoaderContent>

          {pharmaciesAvailablityOpen && <PharmaciesAvailablity onClose={this.togglePharmaciesAvailablity} data={data} />}
          <span className="G-orange-color G-ml-auto P-price"><del>{!!this.defaultPrice && formatPrice(this.defaultPrice)}</del> {formatPrice(this.price)}</span>
        </div>
      </div>
    );
  };
};

export default Info;
