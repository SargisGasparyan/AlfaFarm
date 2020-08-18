import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { Shared } from 'modules';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import { paginationPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import ProductController from 'platform/api/product';
import PageLoader from 'components/page-loader';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import Connection from 'platform/services/connection';
import { RouteComponentProps } from 'react-router-dom';

import './style.scss';
import Settings from 'platform/services/settings';

interface IState {
  loading: boolean;
  data?: IProductListResponseModel[];
};

interface IRouteParams { id: string; }

@byRoute([ROUTES.PRODUCTS.SIMILAR])
class SimilarList extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {
    loading: false,
  };

  private pageNo = 1;
  private lastPage = false;

  private goBack = () => window.routerHistory.goBack();

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const { id } = this.props.match.params;
      const body = {
        pageNumber: this.pageNo,
        pageSize: paginationPageLimit,
      };

      const result = await ProductController.GetRelated(+id, body);
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
      <section className="G-page P-products-similar-list-page">
        <h2 className="G-page-title">{Settings.translations.similar_products}</h2>
        <div className="P-list-wrapper">
          {data.map(item => <Shared.Products.ListItem key={item.id} data={item} />)}
        </div>
      </section>
    ) : <PageLoader />;
  }
};

export default SimilarList;