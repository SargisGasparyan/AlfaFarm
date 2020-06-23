import * as React from 'react';

import ProductController, { IProductListItem, IProposalPagination } from 'platform/api/product';
import { byRoute } from 'platform/decorators/routes';
import ProductItem from '../../../products/components/product-item';
import ROUTES from 'platform/constants/routes';
import PageLoader from 'components/page-loader';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import Settings from 'platform/services/settings';


import './style.scss';

interface IState {
  data: IProposalPagination<IProductListItem> | null;
  loading: boolean;
};

@byRoute(ROUTES.PRODUCTS.PROPOSAL)
class Proposal extends HelperPureComponent<{}, IState> {

  public state: IState = { data: null, loading: false };
  
  public componentDidMount() {
    this.fetchData();
  }
  private pageNo = 1;
  private limit = 24;

  private fetchData = () => this.safeSetState({ loading: true }, async () => {
    const { data } = this.state;
    const result = await ProductController.Proposal(this.pageNo, this.limit);
    if (data && result.success) result.data.itemList = [...data.itemList, ...result.data.itemList];
    this.safeSetState({ data: result.data, loading: false });
  });

  private more = () => {
    const { data, loading } = this.state;
    if (data && data.pagesLeft && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  public render() {
    const { data, loading } = this.state;

    return <section className="G-page">
      {data && data.itemList.length ? <>
        <h2 className="G-page-title">{data.name}</h2>
        <div className="P-proposal">
          {data.itemList.map(item => <ProductItem key={item._id} product={item} />)}
        </div>
        {data && data.pagesLeft ? 
        <div
        onClick={this.more}
        className="G-show-action-button"
      >{Settings.translations.show_all}</div> : null}
      </> : !data ? <PageLoader /> : null}
      {loading ? <PageLoader /> : null}
    </section>;
  }
};

export default Proposal;