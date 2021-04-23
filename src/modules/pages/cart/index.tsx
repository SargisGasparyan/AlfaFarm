import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import BasketController from 'platform/api/basket';
import {
  IBasketListResponseModel,
  IBasketResponseModel,
  IBasketChangeResponseModel
} from 'platform/api/basket/models/response';
import EmptyState from 'components/empty-state';
import { formatPrice } from 'platform/services/helper';
import Connection from 'platform/services/connection';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import Storage from 'platform/services/storage';
import PageLoader from 'components/page-loader';
import { IResponse } from 'platform/constants/interfaces';
import ConfirmModal from 'components/confirm-modal';

import './style.scss';
import PhotoStorage from 'platform/services/photoStorage';
import { PriceNotEnoughModal } from './components/priceNotEnoughModal';
import { Shared } from 'modules';
import * as animationData from 'assets/animations/EmptyBasket.json';

interface IState {
  data?: IBasketResponseModel;
  outOfStockConfirm: boolean;
  priceNotEnoughModalOpen: boolean;
};

@byRoute(ROUTES.CART)
class Cart extends HelperComponent<{}, IState> {

  public state: IState = {
    outOfStockConfirm: false,
    priceNotEnoughModalOpen: false
  };

  public componentDidMount() {
    this.fetchData();
    this.updateBasketCount();
  }

  private deleteBasketItem = async (item: IBasketListResponseModel) => {
    const result = await BasketController.Delete(item.productId, item.isPackage);
    if (result.success) {
      this.updateBasketCount();
      this.fetchData();
    }
  };
  private updateBasketCount = () => window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
  private fetchData = async () => {
    const result = await BasketController.GetList();

    this.safeSetState({ data: result.data }, async () => {
      const { data } = this.state;

      if (data) {
        const photoResult = await Promise.all(data.items.map(item => PhotoStorage.getURL(item.productPhoto).then(url => ({
          ...item,
          productPhoto: url
        }))));

        data.items = photoResult;
        this.safeSetState({ data });
      }
    });
  };

  private changeCount = async (index: number, count: number) => {
    const { data } = this.state;
    let modifyResult: IResponse<IBasketChangeResponseModel>;
    if (data) {
      if (count) {
        Connection.AbortAll();
        modifyResult = await BasketController.Change({
          productId: data.items[index].productId,
          productQuantity: count,
          isPackage: data.items[index].isPackage
        });
        data.items[index].productQuantity = count;
      } else {
        modifyResult = await BasketController.Delete(data.items[index].productId, data.items[index].isPackage);
        data && data.items.splice(index, 1);
        this.updateBasketCount();
      }

      if (modifyResult.data) {
        this.safeSetState({ data: modifyResult.data });
        window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
      }
    }
  };

  private goToCheckout = async () => {
    const { data } = this.state;

    if (data) {
      const price = data && (data.totalDiscountedPrice || data?.totalPrice);

      if (data.items.some(item => !item.productStockQuantity)) this.safeSetState({ outOfStockConfirm: true });
      else if (data && price < 2000) this.safeSetState({ priceNotEnoughModalOpen: true });
      else window.routerHistory.push(`${ROUTES.CHECKOUT}?total=${price}`);
    }
  };

  private closeOutOfStockConfirm = () => this.safeSetState({ outOfStockConfirm: false });
  private deleteOutOfStock = async () => {
    const { data } = this.state;

    if (data) {
      const updatingItems = data.items.filter(item => !item.productStockQuantity).map(item => ({
        productId: item.productId,
        productQuantity: 0,
        isPackage: item.isPackage
      }));

      const result = await BasketController.ChangeList(updatingItems);
      result.success && this.safeSetState({ outOfStockConfirm: false }, () => {
        this.updateBasketCount();
        this.fetchData();
      });
    }
  };

  private deleteAll = async () => {
    const result = await BasketController.DeleteAll();
    if (result.data) {
      this.safeSetState({ data: result.data });
      window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    }
  };

  private saveCart = async () => {
    const { data } = this.state;

    if (data) {
      const alertify = await import('alertifyjs');
      const basketIds = data.items.map(item => item.id);
      const result = await BasketController.Save(basketIds);
      result.success && alertify.success(Settings.translations.basket_save_success);
    }
  };

  private togglePriceNotEnoughModal = () => {
    const { priceNotEnoughModalOpen } = this.state;
    this.safeSetState({ priceNotEnoughModalOpen: !priceNotEnoughModalOpen });
  };

  public render() {
    const { data, priceNotEnoughModalOpen, outOfStockConfirm } = this.state;

    return (
      <section className="G-page P-cart-page">
        {data ? <>
          {data.items.length ? <>
            <div className="G-flex G-flex-justify-between G-flex-align-center G-mb-40 G-full-width">
              <h1 className="G-fs-26 G-full-width">{Settings.translations.cart}</h1>
              <a className="G-ml-auto P-clear-all" onClick={this.deleteAll}>{Settings.translations.clear_basket}</a>
            </div>

            <div className="G-flex G-flex-column P-basket-products">
              <Shared.Products.BasketList
                onQuantityChange={this.changeCount}
                onDeleteBasketItem={this.deleteBasketItem}
                data={data.items}
              />
            </div>


            <div className="P-data-block-wrapper">

              <div className="P-data-block">
                <div className="G-mr-40">
                  <span className="G-fs-normal">{Settings.translations.bonus_count}</span>
                  <h1 className="G-clr-main G-fs-24 G-mt-5">{data.totalBonus}</h1>
                </div>

                <div>
                  <span className="G-fs-normal">{Settings.translations.total}</span>
                  <div className="G-flex G-flex-column G-align-center G-justify-center P-discounted-item">
                    {!!data.totalDiscountedPrice && data.totalDiscountedPrice !== data.totalPrice &&
                    <del>{formatPrice(data.totalPrice)}</del>}
                    <h1
                      className="G-clr-orange G-fs-24 G-mt-5">{formatPrice(data.totalDiscountedPrice || data.totalPrice)}</h1>
                  </div>
                </div>

              </div>

              {Storage.profile && <div className="P-data-block-cart">
                <span className="P-save-cart" onClick={this.saveCart}>
                  {Settings.translations.save_cart}
                </span>
              </div>}

              <button
                className="G-main-button G-ml-auto G-fs-normal P-pay-button"
                onClick={this.goToCheckout}
              >{Settings.translations.pay}</button>
            </div>


            {priceNotEnoughModalOpen && <PriceNotEnoughModal onClose={this.togglePriceNotEnoughModal}/>}

            {outOfStockConfirm && <ConfirmModal
              title={Settings.translations.out_of_stock}
              text={Settings.translations.out_of_stock_delete_confirm}
              onConfirm={this.deleteOutOfStock}
              onClose={this.closeOutOfStockConfirm}
            />}
          </> : <EmptyState
            animationData={animationData}
            text={Settings.translations.no_products}
          />}
        </> : <PageLoader/>}
      </section>
    );
  }
};

export default Cart;
