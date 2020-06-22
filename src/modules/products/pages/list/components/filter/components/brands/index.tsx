import * as React from 'react';
import CheckBox from 'rc-checkbox';
import URLSearchParams from '@ungap/url-search-params';

import { IPagination } from 'platform/constants/interfaces';
import BrandController, { IBrand, IBrandFilter } from 'platform/api/brand';
import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';
import { paginationPageLimit } from 'platform/constants';
import { IProductListFilter } from 'platform/api/product';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IProps {
  filter: IProductListFilter;
  onChange(brands: string[]): void;
};

interface IState {
  data: IPagination<IBrand> | null;
};

class Brands extends HelperPureComponent<IProps, IState> {

  public state: IState = { data: null, };

  private currentPage = 1;
  private limit = paginationPageLimit;

  public componentDidMount() {
    
    const query = new URLSearchParams(window.location.search);
    const defaultLimit = query.get('brandsDefaultLimit');
    if (+defaultLimit && +defaultLimit >= paginationPageLimit) this.limit = +defaultLimit;
    this.fetchData();
  }

  private fetchData = async () => {
    const { filter } = this.props;
    const { data } = this.state;
    const body: IBrandFilter = {
      pageNo: this.currentPage,
      limit: this.limit,
    };

    if (filter.search) body.search = filter.search;
    if (filter.category) body.categoryId = filter.category;

    const result = await BrandController.Filter(body);
    if (data) result.data.itemList = [...data.itemList, ...result.data.itemList];

    this.safeSetState({ data: result.data });
  }

  private toggleItem = (id: string) => {
    const { data } = this.state;

    if (data) {
      const { filter } = this.props;
      const query = new URLSearchParams(window.location.search);
      const chosen = filter.brandIdList ? [...filter.brandIdList] : [];
      const itemIndex = chosen.indexOf(id);
      
      if (itemIndex !== -1) {
        chosen.splice(itemIndex, 1);
        !chosen.length && query.delete('brandsDefaultLimit');
        window.routerHistory.replace(`${ROUTES.PRODUCTS.LIST}?${query.toString()}`);
      } else {
        chosen.push(id);
        query.set('brandsDefaultLimit', data.itemList.length.toString());
        window.routerHistory.replace(`${ROUTES.PRODUCTS.LIST}?${query.toString()}`);
      }
  
      this.props.onChange(chosen);  
    }
  }

  private seeMore = () => {
    this.currentPage += 1;
    this.fetchData();
  }

  public render() {
    const { filter } = this.props;
    const { data } = this.state;

    return data ? (
      <div className="P-filter-brands">
        {data.itemList.map(item => <label key={item._id}>
          <CheckBox checked={filter.brandIdList && filter.brandIdList.indexOf(item._id) !== -1} onChange={() => this.toggleItem(item._id)} />
          <h3>{item.name}</h3>
        </label>)}
        {data.pagesLeft && <h3 onClick={this.seeMore}>{Settings.translations.see_more}</h3>}
      </div>
    ) : null;
  }
}

export default Brands;
