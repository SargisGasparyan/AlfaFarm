import * as React from 'react';

import HelperComponent from "platform/classes/helper-component";

import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Storage from 'platform/services/storage';

import { buildFilters } from '../../services/helper';
import Brands from './components/brands';
import Producers from './components/producers';
import ActiveIngredients from './components/active-ingredients';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import PriceRange from './components/price-range';

import './style.scss';
import Settings from 'platform/services/settings';
import Screen from 'components/screen';

interface IProps {
  onChange(): void;
};

interface IState {
  mobileOpen: boolean;
  body: IProductFilterRequestModel;
};

class Filter extends HelperComponent<IProps, IState> {

  public state: IState = {
    mobileOpen: false,
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

  private outsideFilterChange = () => {
    const body = buildFilters();
    this.bodyChange(body);
  }

  private cancel = () => {
    const query = new URLSearchParams(window.location.search);
    const { body } = this.state;
    
    body.brandIds = [];
    body.activeIngredientIds = [];
    body.producerIds = [];
    delete body.minPrice;
    delete body.maxPrice;

    query.delete('brandIds');
    query.delete('activeIngredientIds');
    query.delete('producerIds');
    query.delete('minPrice');
    query.delete('maxPrice');

    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
    window.scrollTo(0, 0);
    
    this.bodyChange(body);
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

  private bodyChange = (body: IProductFilterRequestModel) => {
    const { onChange } = this.props;
    this.safeSetState({ body }, onChange);
  }

  private toggleMobile = () => {
    const { mobileOpen } = this.state;
    this.safeSetState({ mobileOpen: !mobileOpen });
  }

  public render() {
    const { mobileOpen } = this.state;

    return (
      <Screen.Tablet>
        {(match: boolean) => match ? <>
          <h2 onClick={this.toggleMobile} className="P-products-filter-toggle">{Settings.translations.filter} <i className="icon-Group-5504" /></h2>
          {mobileOpen && <this.Content />}
        </> : <this.Content />}
      </Screen.Tablet>
    );
  }

  private Content = () => {
    const { body } = this.state;

    return (
      <div className="P-products-filter">
        {!body.categoryIds?.length ? Storage.categories.map(item => <h2
          key={item.id}
          onClick={() => this.chooseMainCategory(item.id)}
          className="P-main-category"
        >{item.name}</h2>) : <>
          <PriceRange body={body} onChange={this.bodyChange} />
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
        </>}
      </div>
    );
  }
}

export default Filter;