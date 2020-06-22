import * as React from 'react';
// import CheckBox from 'rc-checkbox';
import InputRange from 'react-input-range';
import URLSearchParams from '@ungap/url-search-params';

import Settings from 'platform/services/settings';
import {
  IProductListFilter,
  IProductListItem,
  ProductSortEnum,
  IProductPagination,
} from 'platform/api/product';
import CategoryController from 'platform/api/category';
import ROUTES from 'platform/constants/routes';

import Select from 'components/select';
import { IDropdownOption } from 'platform/constants/interfaces';
import Brands from './components/brands';
import { SortByDropdown } from 'platform/constants/dropdowns';
import HelperComponent from 'platform/classes/helper-component';
import { getViewEnum } from 'platform/services/helper';

import { Transition } from 'react-transition-group';
import  filterIcon  from 'assets/images/settings.png';
import './style.scss';




interface IProps {
  filter: IProductListFilter;
  data: IProductPagination<IProductListItem> | null;
  update(filter: IProductListFilter, makeFetch?: boolean, checkSub?: boolean): void;
};

interface IState { categoryName: string; filterToggle: boolean, animation: boolean};

class Filter extends HelperComponent<IProps, IState> {

  public state: IState = { categoryName: '', filterToggle: false, animation: false};

  public componentDidMount() { this.configureFilter(true); }

  public componentDidUpdate(prevProps: IProps) {
    const { category } = this.props.filter;
    if (prevProps.filter.category !== category) {
      if (category) this.fetchCategory();
      else this.safeSetState({ categoryName: '' });
    }
  }

  private productSortEnum = getViewEnum(ProductSortEnum);

  private configureFilter = (initial = false) => {
    const query = new URLSearchParams(window.location.search);
    const filter = {...this.props.filter};
    const search = query.get('search');
    const priceFrom = query.get('priceFrom');
    const priceTo = query.get('priceTo');
    const sort = query.get('sort');
    const category = query.get('category');
    const promotion = query.get('promotion');
    const brands = query.get('brands');
    const withSale = query.get('withSale');
    const withBonus = query.get('withBonus');
    
    try {
      if (search) filter.search = search;
      if (sort && this.productSortEnum[+sort]) filter.sort = +sort;
      if (withSale) filter.withSale = !!withSale;
      if (withBonus) filter.withBonus = !!withBonus;      
      if (category) filter.category = category;
      if (promotion) filter.promotion = promotion;
      if (brands) filter.brandIdList = JSON.parse(brands);
      if (priceFrom && +priceFrom) filter.priceFrom = +priceFrom;
      if (priceTo && +priceTo) filter.priceTo = +priceTo;
  
      this.props.update(filter, true, initial);
    } catch(e) {  this.clear(); }
  }

  private fetchCategory = async () => {
    const { category } = this.props.filter;
    if (category) {
      const result = await CategoryController.Details(category);
      this.safeSetState({ categoryName: result.data.name });  
    }
  }
  public productsFilter: any;

  private filterToggleHanlder = () => {
    this.safeSetState({filterToggle: !this.state.filterToggle, animation: true});
    this.productsFilter = document.getElementById("P-products-filter");
    this.productsFilter.classList.remove('none');
  }

  private updateFilter = (filter: IProductListFilter, overwrite: boolean = false, makeFetch: boolean = true) => {
    const query = new URLSearchParams();
    const brandsDefaultLimit = new URLSearchParams(window.location.search).get('brandsDefaultLimit');
    
    if (filter.priceFrom && +filter.priceFrom) query.set('priceFrom', +filter.priceFrom);
    if (filter.priceTo && +filter.priceTo) query.set('priceTo', +filter.priceTo);
    if (filter.search) query.set('search', filter.search);
    if (filter.category) query.set('category', filter.category);
    if (filter.brandIdList) query.set('brands', JSON.stringify(filter.brandIdList));
    if (filter.sort) query.set('sort', +filter.sort);
    if (filter.promotion) query.set('promotion', filter.promotion);
    if (filter.withSale) query.set('withSale', true);
    if (filter.withBonus) query.set('withBonus', true);
    if (brandsDefaultLimit && !overwrite) query.set('brandsDefaultLimit', brandsDefaultLimit);

    window.routerHistory.replace(`${ROUTES.PRODUCTS.LIST}?${query.toString()}`);
    this.props.update(filter, makeFetch);
  }

  private changeSortBy = (chosen: IDropdownOption<ProductSortEnum>) => {
    const filter = {...this.props.filter};
    if (!chosen) delete filter.sort;
    else filter.sort = chosen.value;    
    this.updateFilter(filter);
  }


  private changeBrands = (chosen: string[]) => {
    const filter = {...this.props.filter};
    if (!chosen.length) delete filter.brandIdList;
    else filter.brandIdList = chosen;
    this.updateFilter(filter);
  }

  private clear = () => {
    const filter = {...this.props.filter};

    this.updateFilter({
      search: filter.search,
      category: filter.category,
      promotion: filter.promotion
    }, true);
  }

  private changePrice = (priceData: { min: number, max: number }) => {
    const { data, filter } = this.props;

    if (data && data.range && priceData.min >= data.range.minPrice && priceData.max <= data.range.maxPrice) {
      filter.priceFrom = priceData.min;
      filter.priceTo = priceData.max;  
      this.updateFilter(filter, false, false);
    }
  }

  private getRangeValue = () => {
    const { filter, data } = this.props;

    if (filter && data && data.range) {
      if (filter.priceFrom && filter.priceTo) {
        
        if (filter.priceFrom < data.range.minPrice ||
            filter.priceTo > data.range.maxPrice ||
            filter.priceFrom > filter.priceTo) return {
          min: data.range.minPrice,
          max: data.range.maxPrice,
        };

        return { min: filter.priceFrom, max: filter.priceTo };
      }
      
      return {
        min: data.range.minPrice,
        max: data.range.maxPrice,
      };
    }

    return {
      min: 0,
      max: 0,
    };
  }

  private formatPriceLabel = (value: number, type: string) => type === 'min' || type === 'max' ? '' : `${value} ֏`;

  // private categoryMainHome = async () => {
  //   const result = await CategoryController.MainHome();
  //   this.safeSetState({ categories: result.data });
  // }
  // private categoryDetails = async () => {
  //   const result = await CategoryController.Details();
  //   this.safeSetState({ categories: result.data });
  // }
  // private categorySub = async () => {
  //   const result = await CategoryController.Sub();
  //   this.safeSetState({ categories: result.data });
  // }


  
  

  private emptySearch = () => {
    const { data, filter } = this.props;
    const onlySearch = Object.keys(filter).length === 1 && !!filter.search;
    return data && !data.itemList.length && onlySearch;
  }



  public render() {
    const { categoryName } = this.state;
    const { filter, data } = this.props;

    return data && !this.emptySearch() ? (

      <>
      <div className="P-products-filter-button" onClick = {this.filterToggleHanlder}>
          <img src={filterIcon} alt="filter" className = "P-products-filter-icon"/>
          <span>{Settings.translations.filter}</span>
       
        </div>
        

     
      <Transition in = {this.state.filterToggle} timeout = {500}>
      {
          (state) => {
            return (<div id = "P-products-filter" className={`none ${this.state.filterToggle ? 'entered' : 'entering'} `}>
     
           <div> 
            {(!!filter.search || !!categoryName) && <>
              <h3>{filter.search ? Settings.translations.search : Settings.translations.category}</h3>
              <h3 className="P-name">{filter.search || categoryName}</h3>
              <div className="P-border-line" />
            </>}
            <h3>{Settings.translations.sort_by}</h3>
  
            <Select<ProductSortEnum>
              options={SortByDropdown()}
              value={filter.sort}
              useValue={true}
              placeholder={Settings.translations.choose}
              onChange={this.changeSortBy}
              clear={true}
            />
            {data.range && <>
              <h3>{Settings.translations.price}</h3>
              <div className="P-G-fields-form">
                <InputRange
                  minValue={data.range.minPrice}
                  maxValue={data.range.maxPrice}
                  value={this.getRangeValue()}
                  formatLabel={this.formatPriceLabel}
                  onChange={this.changePrice}
                  onChangeComplete={() => this.updateFilter(filter)}
                />
              </div>
            </>}
            <h3>{Settings.translations.brands}</h3>
            <Brands
              filter={filter}
              onChange={this.changeBrands}
            />
            <div className="P-border-line" />
            <button onClick={this.clear} className="P-clear-filter">{Settings.translations.clear_filters}</button>
            <div/>
            </div>
          
          
             
            </div> )
          }
        }
      </Transition>
      </>) : null;
    
  }
  
};

export default Filter;