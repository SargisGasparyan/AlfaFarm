import * as React from 'react';

import { byRoute } from '../../../..//platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import ProductController, { IProductListItem, IProductListFilter, IProductPagination } from 'platform/api/product';
import PageLoader from 'components/page-loader';
import EmptyState from 'components/empty-state';
import Filter from './components/filter';
import ProductItem from '../../components/product-item';
import Connection from 'platform/services/connection';
import CategoryController, { IFilterCategory } from 'platform/api/category';
import Categories from './components/categories';
import Settings from 'platform/services/settings';
import { scrolledToBottom } from 'platform/services/helper';
import HelperComponent from 'platform/classes/helper-component';
import { Link } from 'react-router-dom';
import * as ProductsAnimationJSON from 'assets/animations/empty_products.json';
import './style.scss';
import { ITreeList } from 'platform/constants/interfaces';
import Loader from 'components/loader';
import PromotionController from 'platform/api/promotion';
interface IState {
  data: IProductPagination<IProductListItem> | null;
  filter: IProductListFilter;

  loading: boolean;
  promotionMode: boolean;
  promotion: string;
  categories: IFilterCategory[];
  tree: ITreeList[] | null;
};

@byRoute(ROUTES.PRODUCTS.LIST)
class List extends HelperComponent<{}, IState> {

  public state: IState = {
    data: null,
    filter: {},
    promotion: '',
    categories: [],
    loading: false,
    tree: null,
    promotionMode: false,
  };

  private pageNo = 1;
  private limit = 15;

  public componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const promotion = query.get('promotion') as string;
    const promotionMode = !!promotion;

    if (promotionMode) {
      this.safeSetState({promotion, promotionMode});
    }
    if (!promotionMode) {
      window.addEventListener('scroll', this.scroll);
    }

    window.addEventListener('filterchange', this.filterFromOutside);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener('filterchange', this.filterFromOutside);
  }

  private filterFromOutside = (e: CustomEvent<IProductListFilter>) => {
    this.pageNo = 1;
    this.updateFilter(e.detail, true, true);
  }

  private scroll = () => {
    const { data, loading } = this.state;
    if (scrolledToBottom() && data && data.pagesLeft && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  private chooseCategory = (id: string) => {
    window.routerHistory.push(`${ROUTES.PRODUCTS.LIST}?category=${id}`);
    window.dispatchEvent(new CustomEvent('filterchange', { detail: { category: id } }));
  }

  private fetchData = (overwrite: boolean = false) => this.safeSetState({ loading: true }, async () => {
    const { data } = this.state;
    const filter = { ...this.state.filter };
    if (filter.priceFrom) filter.priceFrom = +filter.priceFrom;
    if (filter.priceTo) filter.priceTo = +filter.priceTo;
    data && Connection.AbortAll();

    const result = await ProductController.MainList({ pageNo: this.pageNo, limit: this.limit, ...filter });
    if (result.success && !this.state.promotionMode) {
      this.safeSetState({
        tree: result.data.categoryParentTree
      });
    }

    if (!result.aborted) {
      if (data && !overwrite) {
        result.data.itemList = [...data.itemList, ...result.data.itemList];
      }
      this.safeSetState({ data: result.data, loading: false });
    }
  });

  private updateFilter = async (filter: IProductListFilter, makeFetch = true, checkSub = false) => {
    this.pageNo = 1;
    if (this.state.promotionMode) {
      filter.promotion = this.state.filter.promotion;
    }
    
    this.safeSetState({ filter }, async () => {
      if (this.state.promotionMode) {
        await this.fetchPromotionDetails(filter);
      } else {
        checkSub && filter.category && await this.fetchSubCategory();
        makeFetch && this.filterValid() && this.fetchData(true);
      }
    });
  }

  private fetchSubCategory = async () => {

    const { filter, promotionMode } = this.state;
    if (filter.category) {
      const result = await CategoryController.Sub(filter.category);
      if (!result.aborted && !promotionMode) {
        this.safeSetState({ categories: result.data });
      }
    }
  }

  private fetchPromotionDetails = async (secondFilter: any) => {
    if (secondFilter.promotion) {
      const result = await PromotionController.Details({
        id: secondFilter.promotion,
        sort: secondFilter.sort,
        priceTo: secondFilter.priceTo,
        priceFrom: secondFilter.priceFrom,
        brandIdList: secondFilter.brandIdList,
      });
      this.safeSetState({
         tree: [result.data],
         data: {itemList: result.data.products},
         loading: false });
    }
  }

  private filterValid = () => {
    const { filter } = this.state;
    return !filter.priceFrom || !filter.priceTo || +filter.priceFrom < +filter.priceTo;
  }

  private replaceFilter = (newFilter: IProductListFilter) => {
    const { filter } = this.state;

    this.safeSetState({ categories: [] }, () => this.updateFilter({
      ...filter,
      ...newFilter,
    }));
  }

  public render() {
    const { data, filter, categories, tree, loading, promotionMode } = this.state;
    return (
      <section className="G-page P-product-list-page">
        <div className='P-product-page-navigation-wrap'>
          <span className="P-product-page-navigation-item"><Link to='/' className="cascade-link">{Settings.translations.home}<span className="P-product-page-navigation-tool" /></Link></span>
          {tree ? tree.map((item, index) => <div className="P-product-page-navigation-item" key={index}>
            <div onClick={() => !promotionMode && this.chooseCategory(item._id)} className="cascade-link">{item.name}<span className="P-product-page-navigation-tool" /></div>
          </div>) : null}
        </div>
        <Filter
          filter={filter}
          data={data}
          update={this.updateFilter}
        />
        {data ?
           <>
          {data.itemList.length || categories.length ? <div className="P-content">
              <div className="P-product-list">
                {!!categories.length && <Categories list={categories} onChange={this.replaceFilter} />}
                {!!data.itemList.length && data.itemList.map(item => <ProductItem key={item._id} product={item} />)}
              </div>
              {loading && <Loader />}
          </div> : <EmptyState
              animation={ProductsAnimationJSON}
              text={Settings.translations.no_products}
            />}
            
        </> : <PageLoader />}
      </section>
    );
  }
};

export default List;
