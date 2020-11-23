import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { Shared } from 'modules';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import { infinityScrollPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import ProductController from 'platform/api/product';
import PageLoader from 'components/page-loader';
import { buildFilters } from './services/helper';
import Filter from './components/filter';
import Connection from 'platform/services/connection';
import SortBox from './components/sort-box';

import './style.scss';
import Pagination from 'components/pagination';

interface IState {
  loading: boolean;
  data?: IProductListResponseModel[];
};

@byRoute([ROUTES.PRODUCTS.MAIN])
class List extends HelperComponent<{}, IState> {

  public state: IState = {
    loading: false,
  };

  private filterChange = () => {
    // this.pageNo = 1;
    // this.lastPage = false;
    // this.fetchData(1);
    Connection.AbortAll();
  }

  private fetchData = async (pageNumber: number) => {
    const body = {
      ...buildFilters(),
      pageNumber,
      pageSize: 16,
    };

    const result = await ProductController.GetList(body);

    !result.aborted && this.safeSetState({ data: result.data });
    return result.data;
  }

  public render() {
    const { data } = this.state;

    return data ? (
      <section className="G-page P-products-list-page">
        <Filter onChange={this.filterChange} />
        {!!data.length && <div className="P-list-wrapper">
          <SortBox onChange={this.filterChange} />
          {data.map(item => <Shared.Products.ListItem key={item.id} data={item} />)}
          <Pagination<IProductListResponseModel> fetchData={this.fetchData} />
        </div>}
      </section>
    ) : <PageLoader />;
  }
};

export default List;