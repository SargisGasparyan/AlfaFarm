import * as React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from 'rc-checkbox';

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

import './style.scss';
import { IResponse } from 'platform/constants/interfaces';
import { PromotionType } from 'platform/constants/enums';
import { format } from 'path';

interface IState {
  data?: IBasketResponseModel;
  cartSaved: boolean;
};

@byRoute(ROUTES.CART)
class Cart extends HelperComponent<{}, IState> {

  public state: IState = {
    cartSaved: false
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
      cell: (row: IBasketListResponseModel) => <h3 className="G-fs-24">{row.promotion.promotionType === PromotionType.Bonus ? row.promotion.result : 0}</h3>,
    },
    {
      name: Settings.translations.price,
      cell: (row: IBasketListResponseModel) =>
        <div className="G-flex G-flex-column G-align-center G-justify-center">
          <div>{row.promotion.promotionType === PromotionType.Discount && row.promotion.result > 0 ? <del>{formatPrice(row.totalPrice)}</del> : null}</div>
          <h3 className="G-fs-24">
            {row.promotion.promotionType === PromotionType.Discount ? formatPrice(row.promotion.result) : formatPrice(row.productQuantity * row.price)}
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

  private toggleCartSave = () => {
    const { cartSaved } = this.state;
    this.safeSetState({ cartSaved: !cartSaved });
  }

  private goToCheckout = async () => {
    const { data, cartSaved } = this.state;
    if (cartSaved && data) {
      const basketIds = data.items.map(item => item.id);
      await BasketController.Save(basketIds);
    }

    window.routerHistory.push(`${ROUTES.CHECKOUT}?total=${data?.totalDiscountedPrice || data?.totalPrice}`);
  }
  public render() {
    const { data, cartSaved } = this.state;

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
              <div className="P-checkbox-row" onClick={this.toggleCartSave}>
                <CheckBox checked={cartSaved} />
                {Settings.translations.save_cart}
              </div>
            </div>}

            <button
              className="G-main-button G-ml-auto G-fs-normal P-pay-button"
              onClick={this.goToCheckout}
            >{Settings.translations.pay}</button>
          </> : <EmptyState
              text={Settings.translations.no_products}
            />}
        </> : <PageLoader />}
      </section>
    );
  }
};

export default Cart;
