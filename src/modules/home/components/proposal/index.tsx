import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import ProductController, { IProductListItem, IProposalPagination } from 'platform/api/product';
import ProductItem from '../../../products/components/product-item';
import ROUTES from 'platform/constants/routes';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import './style.scss';

interface IState {
  data: IProposalPagination<IProductListItem> | null;
  loading: boolean;
};

class Proposal extends HelperPureComponent<{}, IState> {

  public state: IState = {
    data: null,
    loading: false,
  };
  
  private pageNo = 1;
  private limit = 24;

  public componentDidMount() {
    this.fetchData();
  }


  private fetchData = () => this.safeSetState({ loading: true }, async () => {
    const { data } = this.state;
    const result = await ProductController.Proposal(this.pageNo, this.limit);
    if (data && result.success) result.data.itemList = [...data.itemList, ...result.data.itemList];
    this.safeSetState({ data: result.data, loading: false });
  });


  public render() {
    const { data } = this.state;

    return data && data.itemList.length ? <>
      <h2 className="P-G-page-title">
        {data.name}
      </h2>
      <div className={`P-proposal ${data.pagesLeft ? 'P-proposal-more-one' : ''}`}>
        {data.itemList.map(item => <ProductItem key={item._id} product={item} />)}
      </div>
      {data.pagesLeft && <Link
        to={ROUTES.PRODUCTS.PROPOSAL}
        className="P-G-show-action-button"
      >{Settings.translations.show_all}</Link>}
    </> : null;
  }
};

export default Proposal;