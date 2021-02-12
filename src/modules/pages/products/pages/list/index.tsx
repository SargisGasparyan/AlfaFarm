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

const pageChangeListener = 'productlistpage';

interface IState {
  loading: boolean;
  total: null;
  preferredProductId: number | null,
  data?: IProductListResponseModel[];
};

@byRoute([ROUTES.PRODUCTS.MAIN])
class List extends HelperComponent<{}, IState> {

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
    this.safeSetState({ loading: true });
    const body = {
      ...buildFilters(),
      pageNumber,
      pageSize: 12,
    };

    const result = await ProductController.GetList(body);
    const query = new URLSearchParams(window.location.search);
    const preferredProductId = query.get('preferredProductId');

    !result.aborted && this.safeSetState({ data: result.data.list, total: result.data.totalCount, preferredProductId, loading: false }, ()=> window.scrollTo(0, 0));
    return result.data;
  }

  public render() {
    const { data, total,loading, preferredProductId } = this.state;

    console.log(data?.map(item => item.id));

    return (
      <section className="G-page P-products-list-page">
        <Filter onChange={this.filterChange} />
        <div className="P-list-wrapper">
          {data && !!total && <>
            <SortBox onChange={this.filterChange} />
            {data.map(item => <Shared.Products.ListItem key={item.id} specialProductId={preferredProductId} data={item} />)}
          </>}
          {total === 0 && <div className='P-no-data'>
            <img src={EmptyViewSvg} alt="empty"/>
            <p className='P-desc'>{Settings.translations.no_search_result}</p>
          </div>}
          <Pagination<IProductListResponseModel> pageChangeListener={pageChangeListener} fetchData={this.fetchData} />
        </div>
        {loading && <PageLoader />}
      </section>
    );
  }
};

export default List;
