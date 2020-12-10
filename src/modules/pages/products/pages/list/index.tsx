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
import HelperPureComponent from 'platform/classes/helper-pure-component';
import EmptyViewSvg from 'assets/images/emptyView.svg';

import './style.scss';

const pageChangeListener = 'productlistpage';

interface IState {
  loading: boolean;
  total: null;
  data?: IProductListResponseModel[];
};

@byRoute([ROUTES.PRODUCTS.MAIN])
class List extends HelperPureComponent<{}, IState> {

  public state: IState = {
    loading: false,
    total: null,
  };

  private filterChange = () => {
    window.dispatchEvent(new CustomEvent(pageChangeListener, { detail: 1 }));
    Connection.AbortAll();
  }

  private fetchData = async (pageNumber: number) => {
    this.safeSetState({ loading: true });
    const body = {
      ...buildFilters(),
      pageNumber,
      pageSize: 12,
    };

    const result = await ProductController.GetList(body);

    !result.aborted && this.safeSetState({ data: result.data.list, total: result.data.totalCount, loading: false });
    return result.data;
  }

  public render() {
    const { data, total,loading } = this.state;
    return (
      <section className="G-page P-products-list-page">
        <Filter onChange={this.filterChange} />
        <div className="P-list-wrapper">
          {data && !!total && <>
            <SortBox onChange={this.filterChange} />
            {data.map(item => <Shared.Products.ListItem key={item.id} data={item} />)}
          </>}
          {total === 0 && <div className='P-no-data'>
            <img src={EmptyViewSvg} alt="empty"/>
            <p className='P-desc'>No search result</p>
          </div>}
          <Pagination<IProductListResponseModel> pageChangeListener={pageChangeListener} fetchData={this.fetchData} />
        </div>
        {loading && <PageLoader />}
      </section>
    );
  }
};

export default List;
