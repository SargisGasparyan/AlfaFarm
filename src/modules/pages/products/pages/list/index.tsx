import * as React from 'react';

import { Shared } from 'modules';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import ProductController from 'platform/api/product';
import PageLoader from 'components/page-loader';
import { buildFilters } from './services/helper';
import Filter from './components/filter';
import Connection from 'platform/services/connection';
import SortBox from './components/sort-box';
import Pagination from 'components/pagination';
import EmptyViewSvg from 'assets/images/emptyView.svg';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';

import './style.scss';
import Storage from "../../../../../platform/services/storage";

const pageChangeListener = 'productlistpage';

interface IState {
  loading: boolean;
  total: null;
  preferredProductId: number | null,
  data?: IProductListResponseModel[];
};

@byRoute([ROUTES.PRODUCTS.MAIN])
class List extends HelperComponent<{}, IState> {
  private pageLimitSize: number = 12;

  public state: IState = {
    loading: false,
    total: null,
    preferredProductId: null,
  };

  private filterChange = () => {
    Connection.AbortAll();
    window.dispatchEvent(new CustomEvent(pageChangeListener, { detail: 1 }));
  }

  private fetchData = async (pageNumber: number) => {
    const query = new URLSearchParams(window.location.search);
    // const isPromotionList = query.get('promotion')
    // console.log(pageNumber);
    this.safeSetState({ loading: true });
    const body = {
      ...buildFilters(),
      pageNumber,
      pageSize: this.pageLimitSize,
    };
    // let promotionProductList;
    // let promotionProducts;

    // if (body.categoryIds && body.categoryIds.length && !isPromotionList) {
    //   const categoryId = body.categoryIds[0];
    //   promotionProductList = await ProductController.GetCategoryList(+categoryId, this.pageLimitSize);
    //
    //   if (promotionProductList.data) {
    //     promotionProducts = promotionProductList.data[0].products;
    //     body.pageSize = body.pageSize - promotionProducts.length;
    //   }
    // }


    const result = await ProductController.GetList(body);

    // if (promotionProductList) {
    //   result.data.totalCount = result.data.totalCount + promotionProducts.length;
    //   result.data.list = result.data.list.concat(promotionProducts).reverse();
    //
    //   query.set('promotion', 'true');
    //   window.history.replaceState({ path: window.location.pathname }, '', `?${query}`);
    // }

    const preferredProductId = query.get('preferredProductId');

    !result.aborted && result.data && this.safeSetState({ data: result.data.list, total: result.data.totalCount, preferredProductId, loading: false }, ()=> window.scrollTo(0, 0));
    return result.data;
  }

  private getCategoryTitle = (categoryId: number) => {
    const currentCategory = Storage.categories.find(item => {
      return item.id === categoryId;
    });

    return currentCategory ? currentCategory.name : '';
  }

  public render() {
    const query = new URLSearchParams(window.location.search);
    const categoryId = query.get('categoryIds');
    const categoryTitle = categoryId ? this.getCategoryTitle(+categoryId) : '';
    const { data, total,loading, preferredProductId } = this.state;

    return (
      <div>
        <div className="G-page G-page-title-category">
          { categoryId ? <h3 className="G-page-title-left">{categoryTitle}</h3> : <h3 className="G-page-title-left">{Settings.translations.online_pharmacy}</h3>}
        </div>
        <section className="G-page P-products-list-page">
          <Filter onChange={this.filterChange} />
          <div className="P-list-wrapper">
            {data && !!total && <>
              <SortBox onChange={this.filterChange} />
              {data.map(item => <Shared.Products.ListItem key={item.id} specialProductId={preferredProductId} data={item} />)}
            </>}
            {total === 0 && <div className='P-no-data'>
              <img src={EmptyViewSvg} alt="empty"/>
              <p className='P-desc'>{Settings.translations.no_search_result.toloc}</p>
            </div>}
            <Pagination<IProductListResponseModel> classNameList="P-product-page" pageChangeListener={pageChangeListener} fetchData={this.fetchData} />
          </div>
          {loading && <PageLoader />}
        </section>
      </div>
    );
  }
};

export default List;
