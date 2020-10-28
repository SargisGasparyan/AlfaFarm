import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';
import { infinityScrollPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import { onlyForWholesaleUsers } from 'platform/guards/routes';
import { IWholesaleNewsListResponseModel } from 'platform/api/wholesaleNews/models/response';
import WholesaleNewsController from 'platform/api/wholesaleNews';

import './style.scss';

interface IState {
  data?: IWholesaleNewsListResponseModel[];
  loading: boolean;
};

@byRoute([ROUTES.WHOLESALE_NEWS], [onlyForWholesaleUsers])
class WholesaleNews extends HelperComponent<{}, IState> {

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

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const body = {
        pageNumber: this.pageNo,
        pageSize: infinityScrollPageLimit,
      };

      const result = await WholesaleNewsController.GetList(body);
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

    return (
      <section className="G-page P-wholesale-news-page">
        {data ? <>
          <div className="P-header">
            <ShadowText>{Settings.translations.news}</ShadowText>
          </div>                    
          <div className="P-content">
            {data.map(item => <ListItem key={item.id} data={item} />)}
          </div>
        </> : <PageLoader />}
      </section>
    );
  }
}

export default WholesaleNews;