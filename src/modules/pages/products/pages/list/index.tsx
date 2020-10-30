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

interface IState {
  loading: boolean;
  data?: IProductListResponseModel[];
};

@byRoute([ROUTES.PRODUCTS.MAIN])
class List extends HelperComponent<{}, IState> {

  public state: IState = {
    loading: false,
  };

  private pageNo = 1;
  private lastPage = false;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private filterChange = () => {
    this.pageNo = 1;
    this.lastPage = false,
    Connection.AbortAll();
    this.fetchData(true);
  }

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const body = {
        ...buildFilters(),
        pageNumber: this.pageNo,
        pageSize: infinityScrollPageLimit,
      };

      const result = await ProductController.GetList(body);
      if (result.aborted) return; // In case if other request will cancel this for performance and traffic

      const data = this.state.data || [];

      this.safeSetState({ data: overwrite ? result.data.list : [...data, ...result.data.list], loading: false });
      this.lastPage = result.data.pageCount === this.pageNo;
    } else this.safeSetState({ loading: false });
  });

  private scroll = () => {
    const { loading } = this.state;
    
    if (!this.lastPage && scrolledToBottom() && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  public render() {
    const { data } = this.state;

    return data ? (
      <section className="G-page P-products-list-page">
        <Filter onChange={this.filterChange} />
        {!!data.length && <div className="P-list-wrapper">
          <SortBox onChange={this.filterChange} />
          {data.map(item => <Shared.Products.ListItem key={item.id} data={item} />)}
        </div>}
      </section>
    ) : <PageLoader />;
  }
};

export default List;