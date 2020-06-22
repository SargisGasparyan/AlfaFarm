import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import ProductController, { IProductListItem, ProductSortEnum } from 'platform/api/product';
import { IPagination } from 'platform/constants/interfaces';
import { paginationPageLimit } from 'platform/constants'
import ProductItem from '../../../products/components/product-item';
import ROUTES from 'platform/constants/routes';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState {
  data: IPagination<IProductListItem> | null;
};

class BestSelling extends HelperPureComponent<{}, IState> {

  public state: IState = { data: null };
  
  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const body = {
      pageNo: 1,
      limit: paginationPageLimit,
      sort: ProductSortEnum.DateNewToOld,
    };

    const result = await ProductController.MainList(body);
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return  <>
      <h2 className="P-G-page-title">
        {/* {Settings.translations.best_selling} */}
        {Settings.translations.new_products}
      </h2>
      <div className={`P-best-selling ${data && data.pagesLeft ? 'P-best-selling-more-one' : ''} ${!data ? 'no-data' : ''}`}>
        {!data ? 
        <div className="T-small-loader-wrap">
          <div className="loader-small" />
        </div>
         : data && data.itemList.map(item => <ProductItem key={item._id} product={item} />)}
      </div>
      {data && data.pagesLeft && <Link
        to={`${ROUTES.PRODUCTS.LIST}?sort=${ProductSortEnum.DateNewToOld}`}
        className="P-G-show-action-button"
      >{Settings.translations.show_all}</Link>}
    </> ;
  }
};

export default BestSelling;