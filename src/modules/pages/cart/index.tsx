import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import BasketController from 'platform/api/basket';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';
import Table from 'components/table';
import EmptyState from 'components/empty-state';
import { getMediaPath } from 'platform/services/helper';
import CountInput from 'components/count-input';
import Connection from 'platform/services/connection';

import './style.scss';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import CheckBox from 'rc-checkbox';
import Storage from 'platform/services/storage';

interface IState {
  data: IBasketListResponseModel[];
  cartSaved: boolean;
};

@byRoute(ROUTES.CART)
class Cart extends HelperComponent<{}, IState> {

  public state: IState = {
    data: [],
    cartSaved: false,
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
          <h2>{row.productTitle}</h2>
          <span>{row.unitQuantity} {row.unitName}</span>
        </div>
      </Link>,
    },
    {
      name: Settings.translations.quantity,
      cell: (row: IBasketListResponseModel) => <CountInput
        min={0}
        step={1}
        value={row.productQuantity}
        onChange={count => this.changeCount(row, count)}
      />,
    },
    {
      name: Settings.translations.price,
      style: { minWidth: 150, maxWidth: 150 },
      cell: (row: IBasketListResponseModel) => <h3 className="G-fs-24">{row.price * row.productQuantity} AMD</h3>,
    },
  ];

  private get totalPrice() {
    const { data } = this.state;
    let total = 0;
    data.forEach(item => total += item.price * item.productQuantity);

    return total;
  }

  public componentDidMount() {
    window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate, { detail: false }));
    this.fetchData();
  }

  private fetchData = async () => {
    const result = await BasketController.GetList();
    this.safeSetState({ data: result.data });
  }

  private changeCount = async (row: IBasketListResponseModel, count: number) => {
    const { data } = this.state;

    if (count) {
      Connection.AbortAll();
      await BasketController.Change([{
        productId: row.productId,
        productQuantity: count,
      }]);

      row.productQuantity = count;
      this.safeSetState({ data });
    } else {
      await BasketController.Delete([row.id]);
      this.fetchData();
    }
  }

  private toggleCartSave = () => {
    const { cartSaved } = this.state;
    this.safeSetState({ cartSaved: !cartSaved });
  }

  private goToCheckout = async () => {
    const { data, cartSaved } = this.state;
    if (cartSaved) {
      const basketIds = data.map(item => item.id);
      await BasketController.Save(basketIds);
    }

    window.routerHistory.push(ROUTES.CHECKOUT);
  }

  public render() {
    const { data, cartSaved } = this.state;

    return (
      <section className="G-page P-cart-page">
        <h1 className="G-fs-26 G-mb-40 G-full-width">{Settings.translations.cart}</h1>
        {data.length ? <Table<IBasketListResponseModel>
          className="P-table G-full-width"
          columnConfig={this.columnConfig}
          data={data}
        /> : <EmptyState
          text={Settings.translations.no_products}
        />}

        <div className="P-data-block">
          <div>
            <span className="G-fs-normal">{Settings.translations.total}</span>
            <h1 className="G-orange-color G-fs-24 G-mt-5">{this.totalPrice} AMD</h1>
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
      </section>
    );
  }
};

export default Cart;