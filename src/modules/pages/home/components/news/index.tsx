import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';
import { INewsListResponseModel } from 'platform/api/news/models/response';
import NewsController from 'platform/api/news';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IState {
  data: INewsListResponseModel[];
  showAll: boolean;
}

class News extends HelperComponent<{}, IState> {

  public state: IState = {
    data: [],
    showAll: false,
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await NewsController.GetList({ pageNumber: 1, pageSize: 4 });
    this.safeSetState({ data: result.data.list, showAll: result.data.pageCount > 1 });
  }

  public render() {
    const { data, showAll } = this.state;

    return data.length ? (
      <section className="G-page P-home-news">
        <ShadowText className="G-text-center">{Settings.translations.news}</ShadowText>

        <div className="P-list-wrapper">
          {data.map(item => <ListItem key={item.id} data={item} />)}
        </div>

        {showAll && <Link
          to={ROUTES.NEWS.MAIN}
          className="G-main-ghost-button G-ml-auto G-mr-auto"
        >{Settings.translations.show_all}</Link>}
      </section>
    ) : null;
  }
};

export default News;