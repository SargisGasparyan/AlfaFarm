import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import List from './components/list';
import Checkout from './components/checkout';
import PriceCounter from './components/price-counter';
import CartManager from './services/manager';
import ProductController, { IWishListCartProductItem, ICartItem } from 'platform/api/product';
import PageLoader from 'components/page-loader';
import OrderController, { IPayer } from 'platform/api/order';
import { IPriceCounterData } from './constants/interfaces';
import Select from 'components/select';
import { IDropdownOption } from 'platform/constants/interfaces';
import Storage from 'platform/services/storage';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IState {
  data: IWishListCartProductItem[] | null;
  priceData: IPriceCounterData;
  companies: IPayer[];
  loading: boolean;
};

const initialPriceData = () => ({
  subtotal: 0,
  points: 0,
  discount: 0,
  delivery: 0,
  promoDiscount: 0,
});

@byRoute(ROUTES.CART)
class Cart extends HelperComponent<{}, IState> {

  public state: IState = {
    data: null,
    priceData: initialPriceData(),
    companies: [],
    loading: false,
  };

  private queryExists: boolean = false;
  private orderId: string | undefined;
  private chosenItemsList: ICartItem[] = [];

  private get exportCompanyOptions() {
    const { companies } = this.state;

    return companies.map(item => ({
      name: item.companyName || Settings.translations.i,
      value: item.companyId || null,
    }));
  }

  public componentDidMount() {
    
    this.queryExists = this.checkForQueryData();

    Storage.fetchDefault().then(() => {
      if (!this.queryExists) this.chosenItemsList = CartManager.Items;
      this.fetchData();
      Storage.profile && this.fetchCompanies();
    });
  }

  private fetchData = async () => {
    if (this.orderId) {
      const { data } = await OrderController.Repeat({ id: this.orderId });
      this.chosenItemsList = data.itemList.map(item => ({
        product: item.product,
        productVersion: item.productVersion,
        count: item.count,
      }));

      this.safeSetState({ data: data ? data.itemList : [] }, () => this.changeChosenList(this.chosenItemsList));
    } else if (this.chosenItemsList.length) {
      const { data } = await ProductController.Cart({ idList: this.chosenItemsList });
      const { deletedList, itemList } = data;

      if (deletedList.length && !this.queryExists) {
        const ids = deletedList.map(item => item.productVersion || item.product);
        CartManager.Remove(ids);
      }

      this.safeSetState({ data: itemList }, () => this.changeChosenList(this.chosenItemsList));
    } else this.safeSetState({ data: [] });
  }

  private checkForQueryData = () => {
    const query = new URLSearchParams(window.location.search);
    const wishListItems = query.get('wishListItems');
    const orderId = query.get('orderId');
    
    if (wishListItems) {

      try {
        if (wishListItems) {
          this.chosenItemsList = JSON.parse(wishListItems);
          return true;
        }
      } catch(e) { return false; }

    } else if (orderId) {
      this.orderId = orderId;
      return true;
    }
    
    return false;
  }

  private onRemove = (id: string) => {
    if (!this.queryExists) {
      CartManager.Remove([id]);
      const newChosenList = this.chosenItemsList.filter(item => item.product !== id && item.productVersion !== id);
      if (newChosenList.length !== this.chosenItemsList.length) this.changeChosenList(newChosenList);
      this.fetchData();
    } else {
      const { data } = this.state;
      if (data) {
        const newChosenList = this.chosenItemsList.filter(item => item.product !== id && item.productVersion !== id);
        const newData = data.filter(item => item.product !== id && item.productVersion !== id);  
        this.safeSetState({ data: newData }, () => this.changeChosenList(newChosenList));
      }
    }
  }

  private changeChosenList = (list: ICartItem[]) => {
    const { data, priceData } = this.state;    
    if (data && list.length) {
      priceData.subtotal = 0;
      priceData.discount = 0;
      list.forEach(item => {
        const findedItem = data.find(sub => {
          if (item.productVersion) return item.productVersion === sub.productVersion && item.product === sub.product;
          return item.product === sub.product;
        });

        if (findedItem) {
          priceData.subtotal += item.count / findedItem.step * findedItem.defaultPrice;
          if (findedItem.discountedPrice) priceData.discount += item.count / findedItem.step * (findedItem.defaultPrice - findedItem.discountedPrice);
        }
      });

      this.chosenItemsList = list;
      this.safeSetState({ priceData: { ...priceData } });
    } else if (data) this.chosenItemsList = [];
  }

  private updatePriceData = (priceData: IPriceCounterData) => this.safeSetState({ priceData });
  private changeData = (data: IWishListCartProductItem[]) => {
    this.safeSetState({ data });
  }

  private fetchCompanies = async () => {
    const result = await OrderController.Payer();
    !result.aborted && this.safeSetState({ companies: result.data });
  }

  private export = (chosen?: IDropdownOption<string | null> | null) => this.safeSetState({ loading: true }, async () => {
    const result = await OrderController.Invoice({
      idList: this.chosenItemsList,
      companyId: chosen ? chosen.value : null,
    });

    result.data && window.open(result.data, '_blank');
    this.safeSetState({ loading: false });
  });

  public render() {
    const { data, priceData, companies, loading } = this.state;
    return (
      <section className="G-page P-cart-page">
        {data ? <>
          <h1 className="G-page-title">
            {Settings.translations.cart}
            
            {!!this.chosenItemsList.length && (
              // Storage.fetchDefault().then( ()=> {}
              Storage.profile ? <Select<string | null>
              placeholder={<i className="icon-pdf" />}
              options={this.exportCompanyOptions}
              onChange={this.export}
            /> : <i className="icon-pdf" onClick={() => this.export()} />)}
          </h1>
          <List
            data={data}
            queryExists={!!this.queryExists}
            chosenItemsList={this.chosenItemsList}
            onRemove={this.onRemove}
            onDataChange={this.changeData}
            onChosenChange={this.changeChosenList}
          />
          {!!data.length && <>
            <PriceCounter data={priceData} />
            <Checkout
              priceData={priceData}
              chosenItemsList={this.chosenItemsList}
              queryExists={this.queryExists}
              fromOrder={!!this.orderId}
              companies={companies}
              onPriceChange={this.updatePriceData}
            />
          </>}
          {loading && <PageLoader />}
        </> : <PageLoader />}
      </section>
    );
  }
};

export default Cart;