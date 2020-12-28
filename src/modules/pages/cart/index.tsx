import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import BasketController from 'platform/api/basket';
import { IBasketListResponseModel, IBasketResponseModel, IBasketChangeResponseModel } from 'platform/api/basket/models/response';
import Table from 'components/table';
import EmptyState from 'components/empty-state';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import CountInput from 'components/count-input';
import Connection from 'platform/services/connection';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import Storage from 'platform/services/storage';
import PageLoader from 'components/page-loader';
import { IResponse } from 'platform/constants/interfaces';
import { PromotionTypeEnum } from 'platform/constants/enums';
import ConfirmModal from 'components/confirm-modal';

import './style.scss';

interface IState {
  data?: IBasketResponseModel;
  outOfStockConfirm: boolean;
};

@byRoute(ROUTES.CART)
class Cart extends HelperComponent<{}, IState> {

  public state: IState = {
    outOfStockConfirm: false,
  };
  private columnConfig = [
    {
      name: Settings.translations.product,
      cell: (row: IBasketListResponseModel) => <Link to={ROUTES.PRODUCTS.DETAILS.replace(':id', row.productId)}>
        <div
          className="P-image G-square-image-block"
          style={{ background: `url('${getMediaPath(row.productPhoto)}') center/cover` }}
        />

        <div className="P-main-info">
          <h2 title={row.productTitle}>{row.productTitle}</h2>
          {!row.productStockQuantity && <h5 className="G-red-color G-mt-5">{Settings.translations.out_of_stock}</h5>}
          <span>{row.unitQuantity} {row.unitName}</span>
        </div>
      </Link>,
    },
    {
      name: Settings.translations.quantity,
      cell: (row: IBasketListResponseModel, index: number) => <CountInput
        min={0}
        step={1}
        value={row.productQuantity}
        onChange={count => this.changeCount(row, index, count)}
      />,
    },
    {
      name: 'Bonus',
      cell: (row: IBasketListResponseModel) => <h3 className="G-fs-24">{row.promotion.promotionType === PromotionTypeEnum.Bonus ? row.promotion.result : 0}</h3>,
    },
    {
      name: Settings.translations.price,
      cell: (row: IBasketListResponseModel) =>
        <div className="G-flex G-flex-column G-align-center G-justify-center">
          <div>{row.promotion.promotionType === PromotionTypeEnum.Discount && row.promotion.result > 0 ? <del>{formatPrice(row.totalPrice)}</del> : null}</div>
          <h3 className="G-fs-24">
            {row.promotion.promotionType === PromotionTypeEnum.Discount ? formatPrice(row.promotion.result) : formatPrice(row.productQuantity * row.price)}
          </h3>
        </div>,
    },
    {
      name: '',
      style: { maxWidth: 70 },
      cell: (row: IBasketListResponseModel) => <div className="P-basket-remove-item">
        <i className="icon-Group-5032 G-orange-color G-cursor-pointer G-fs-18" onClick={() => this.deleteBasketItem(row)} />
      </div>
    }
  ];
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
  }
  private updateBasketCount = () => window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
  private fetchData = async () => {
    const result = await BasketController.GetList();
    this.safeSetState({ data: result.data });
  }

  private changeCount = async (row: IBasketListResponseModel, index: number, count: number) => {
    const { data } = this.state;
    let modifyResult: IResponse<IBasketChangeResponseModel>;

    if (count) {
      Connection.AbortAll();
      modifyResult = await BasketController.Change({
        productId: row.productId,
        productQuantity: count,
        isPackage: row.isPackage,
      });
      row.productQuantity = count;
    } else {
      modifyResult = await BasketController.Delete(row.productId, row.isPackage);
      data && data.items.splice(index, 1);
      this.updateBasketCount();
    }

    if (data && modifyResult.data) {

      this.safeSetState({ data: modifyResult.data });
      window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    }
  }

  private goToCheckout = async () => {
    const { data } = this.state;

    if (data?.items.some(item => !item.productStockQuantity)) this.safeSetState({ outOfStockConfirm: true });
    else window.routerHistory.push(`${ROUTES.CHECKOUT}?total=${data?.totalDiscountedPrice || data?.totalPrice}`);
    // if (cartSaved && data) {
    //   const basketIds = data.items.map(item => item.id);
    //   await BasketController.Save(basketIds);
    // }
  }

  private closeOutOfStockConfirm = () => this.safeSetState({ outOfStockConfirm: false });
  private deleteOutOfStock = async () => {
    const { data } = this.state;

    if (data) {
      const updatingItems = data.items.filter(item => !item.productStockQuantity).map(item => ({
        productId: item.productId,
        productQuantity: 0,
        isPackage: item.isPackage,
      }));

      const result = await BasketController.ChangeList(updatingItems);
      result.success && this.safeSetState({ outOfStockConfirm: false }, () => {
        this.updateBasketCount();
        this.fetchData();
      });
    }
  }

  private saveCart = async () => {
    const { data } = this.state;

    if (data) {
       const alertify = await import('alertifyjs');
       const basketIds = data.items.map(item => item.id);
       const result = await BasketController.Save(basketIds);
       result.success && alertify.success(Settings.translations.basket_save_success);
    }
  }

  public render() {
    const { data, outOfStockConfirm } = this.state;

    return (
      <section className="G-page P-cart-page">
        {data ? <>
          {data.items.length ? <>
            <div className="G-flex G-flex-justify-between G-flex-align-center G-mb-40 G-full-width">
              <h1 className="G-fs-26 G-full-width">{Settings.translations.cart}</h1>
              {/* <button
                className="G-main-button G-ml-auto G-fs-normal P-pay-button"
                onClick={this.clearAllConfirm}
              >{Settings.translations.clear_basket}</button> */}
            </div>
            <Table<IBasketListResponseModel>
              className="P-table G-full-width"
              columnConfig={this.columnConfig}
              rowClassname={row => !row.productStockQuantity ? 'P-out-of-stock-product' : ''}
              data={data.items}
            />

            <div className="P-data-block">
              <div className="G-mr-40">
                <span className="G-fs-normal">{Settings.translations.bonus_count}</span>
                <h1 className="G-main-color G-fs-24 G-mt-5">{data.totalBonus}</h1>
              </div>

              <div>
                <span className="G-fs-normal">{Settings.translations.total}</span>
                <div className="G-flex G-flex-column G-align-center G-justify-center P-discounted-item">
                  {!!data.totalDiscountedPrice && <del>{formatPrice(data.totalPrice)}</del>}
                  <h1 className="G-orange-color G-fs-24 G-mt-5">{formatPrice(data.totalDiscountedPrice || data.totalPrice)}</h1>
                </div>
              </div>

            </div>

            {Storage.profile && <div className="P-data-block">
              <span className="P-save-cart" onClick={this.saveCart}>
                {Settings.translations.save_cart}
              </span>
            </div>}

            <button
              className="G-main-button G-ml-auto G-fs-normal P-pay-button"
              onClick={this.goToCheckout}
            >{Settings.translations.pay}</button>

            {outOfStockConfirm && <ConfirmModal
              title={Settings.translations.out_of_stock}
              text={Settings.translations.out_of_stock_delete_confirm}
              onConfirm={this.deleteOutOfStock}
              onClose={this.closeOutOfStockConfirm}
            />}
          </> : <EmptyState
              text={Settings.translations.no_products}
            />}
        </> : <PageLoader />}
      </section>
    );
  }
};

export default Cart;
