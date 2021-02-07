import * as React from 'react';

import { IProductDetailsResponseModel, IPromotionGroupProductPromotionModel } from 'platform/api/product/models/response';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';

import ROUTES from 'platform/constants/routes';
import LoaderContent from 'components/loader-content';
import BasketController from 'platform/api/basket';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';

interface IProps {
  data: IProductDetailsResponseModel;
}

interface IState {
  cartLoadingId?: number;
}

class Bundles extends HelperComponent<IProps, IState> {

  public state: IState = { };

  private get list() {
    const { data } = this.props;
    if (!data.promotion.availablePromotions) return [];
    return data.promotion.availablePromotions.groupProductPromotions || [];
  }

  private navigateToProduct = (id: number) => {
    const { data } = this.props;
    data.id != id && window.routerHistory.push(ROUTES.PRODUCTS.DETAILS.replace(':id', id));
  }

  private addToCart = (bundle: IPromotionGroupProductPromotionModel) => this.safeSetState({ cartLoadingId: bundle.boundleId }, async () => {
    const body = bundle.products.map(item => ({
      productQuantity: item.quantity,
      productId: item.productId,
      isPackage: item.isPackage,
    }));

    await BasketController.ChangeList(body);
    window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    this.safeSetState({ cartLoadingId: undefined });
  });

  public render() {
    const { cartLoadingId } = this.state;

    return this.list.length ? (
      <div className="P-product-details-bundles">
        {this.list.map(item => <div key={item.boundleId}>
          <h4>*{Settings.translations.buy_bundle_promotion}</h4>
          <div className="P-products">
            {item.products.map((product, index) => <>
              <div className="P-content">
                <div onClick={() => this.navigateToProduct(product.productId)}>
                  <span className="P-discount">-{product.percent}%</span>
                  <span className="P-quantity">x{product.quantity}</span>
                  <div className="P-image" style={{ background: `url('${product.imagePath}') center/contain no-repeat` }} />
                </div>
              </div>
              {index != item.products.length - 1 && <span className="P-plus-symbol">+</span>}
            </>)}
          </div>
          <LoaderContent
            loading={cartLoadingId === item.boundleId}
            className="G-main-button"
            onClick={() => this.addToCart(item)}
          >{Settings.translations.add_to_cart}</LoaderContent>
        </div>)}
      </div>
    ) : null;
  };
};

export default Bundles;
