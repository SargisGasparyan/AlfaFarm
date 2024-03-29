import * as React from 'react';
import CheckBox from 'rc-checkbox';
import HelperComponent from "platform/classes/helper-component";
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Storage from 'platform/services/storage';
import { buildFilters, priceConfig } from '../../services/helper';
import Brands from './components/brands';
import Producers from './components/producers';
import ActiveIngredients from './components/active-ingredients';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import PriceRange from './components/price-range';
import Settings from 'platform/services/settings';
import Screen from 'components/screen';
import './style.scss';
import Broadcast from 'platform/services/broadcast';

interface IProps {
  onChange(): void;
};

interface IState {
  mobileOpen: boolean;
  maxPrice: number;
  body: IProductFilterRequestModel;
};

class Filter extends HelperComponent<IProps, IState> {
  public state: IState = {
    mobileOpen: false,
    maxPrice: priceConfig.maxPrice,
    body: {
      brandIds: [],
      producerIds: [],
      categoryIds: [],
      activeIngredientIds: [],
    },
  };

  public componentDidMount() {
    window.scrollTo(0, 0);
    this.safeSetState({ body: buildFilters() });
    window.addEventListener(DispatcherChannels.ProductFilterChange, this.outsideFilterChange);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener(DispatcherChannels.ProductFilterChange, this.outsideFilterChange);
  }

  private outsideFilterChange = (e: CustomEvent) => {
    const body = buildFilters(e.detail?.makeEmpty);
    this.bodyChange(body);
  }

  private cancel = () => {
    const query = new URLSearchParams(window.location.search);
    const { body } = this.state;

    body.brandIds = [];
    body.activeIngredientIds = [];
    body.producerIds = [];
    body.hasDiscount = false;
    delete body.minPrice;
    delete body.maxPrice;

    query.delete('brandIds');
    query.delete('activeIngredientIds');
    query.delete('producerIds');
    query.delete('minPrice');
    query.delete('maxPrice');
    query.delete('hasDiscount');

    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
    window.scrollTo(0, 0);

    this.bodyChange({ ...body });
    Broadcast.dispatch(DispatcherChannels.ProductFilterClear);
  }

  private chooseMainCategory = (id: number) => {
    const { body } = this.state;
    const { onChange } = this.props;

    const query = new URLSearchParams(window.location.search);
    query.set('categoryIds', `${id}`);

    body.categoryIds = [id];
    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
    this.safeSetState({ body }, onChange);
  }

  private reset = () => {
    window.location.href = ROUTES.PRODUCTS.MAIN;
  }

  private bodyChange = (body: IProductFilterRequestModel) => {
    const { onChange } = this.props;
    this.safeSetState({ body }, onChange);
  }

  private toggleMobile = () => {
    const { mobileOpen } = this.state;
    this.safeSetState({ mobileOpen: !mobileOpen });
  }

  private toggleDiscount = () => {
    const { body } = this.state;
    const { onChange } = this.props;

    body.hasDiscount = !body.hasDiscount;
    const query = new URLSearchParams(window.location.search);

    if (body.hasDiscount) query.set('hasDiscount', 'true');
    else query.delete('hasDiscount');

    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
    this.safeSetState({ body }, onChange);
  }

  public render() {
    const { body, mobileOpen } = this.state;

    return (
      <Screen.Tablet>
        {(match: boolean) => match ? <>
          {!!body.productText && <i className="P-back-icon-mini G-back-icon icon-Group-5529" onClick={this.reset} />}
          <h2 onClick={this.toggleMobile} className="P-products-filter-toggle">{Settings.translations.filter} <i className="icon-Group-5504" /></h2>
          {mobileOpen && <this.Content />}
        </> : <this.Content />}
      </Screen.Tablet>
    );
  }

  private Content = () => {
    const { body, maxPrice } = this.state;

    return (
      <div className="P-products-filter">
        {!body.categoryIds?.length && Storage.categories.map(item => <h2
            key={item.id}
            onClick={() => this.chooseMainCategory(item.id)}
            className="P-main-category"
        >{item.name} <i className="icon-Group-5513" /></h2>) }
        <i className="G-back-icon icon-Group-5529" onClick={this.reset} />
        <PriceRange body={body} onChange={this.bodyChange} maxPriceValue={maxPrice} />

        <label className="P-discount-label">
          <CheckBox checked={body.hasDiscount} onChange={this.toggleDiscount} />
          {Settings.translations.sale}
        </label>

        <div className="P-row-wrap">
          <Brands body={body} onChange={this.bodyChange} />
        </div>
        <div className="P-row-wrap">
          <Producers body={body} onChange={this.bodyChange} />
        </div>
        <div className="P-row-wrap">
          <ActiveIngredients body={body} onChange={this.bodyChange} />
        </div>

        <button
          className="G-main-ghost-button P-cancel-button"
          onClick={this.cancel}
        >{Settings.translations.cancel}</button>
      </div>
    );
  }
}

export default Filter;
