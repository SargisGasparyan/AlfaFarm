import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import FirstItem from './components/first-item';
import ListItem from './components/list-item';

import NewsController from 'platform/api/news';
import { infinityScrollPageLimit } from 'platform/constants';
import { INewsListResponseModel } from 'platform/api/news/models/response';
import { scrolledToBottom } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import Details from './pages/details';
import { onlyForUsers } from 'platform/guards/routes';

import './style.scss';

interface IState {
  data?: INewsListResponseModel[];
  loading: boolean;
};

@byRoute([ROUTES.NEWS.MAIN], [onlyForUsers])
class News extends HelperComponent<{}, IState> {

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

      const result = await NewsController.GetList(body);
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
    const firstItem = data && data.length ? data[0] : null;
    const sortedData = data ? data.slice(1) : null;

    return (
      <section className="G-page P-news-page">
        {sortedData ? <>
          <ShadowText className="G-page-title">{Settings.translations.news}</ShadowText>
          {firstItem && <FirstItem data={firstItem} />}

          {!!sortedData.length && <div className="P-list-wrapper">
            {sortedData.map(item => <ListItem key={item.id} data={item} />)}
          </div>}
        </> : <PageLoader />}
      </section>
    );
  }
}

export default { News, Details };
