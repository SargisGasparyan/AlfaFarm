import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import generic from 'platform/decorators/generic';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Info from './components/info';
import Images from './components/images';
import HelperComponent from 'platform/classes/helper-component';
import PageLoader from 'components/page-loader';
import { INewsDetailsResponseModel } from 'platform/api/news/models/response';
import NewsController from 'platform/api/news';

import './style.scss';

interface IRouteParams { id: string };

interface IState {
  data?: INewsDetailsResponseModel;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byRoute(ROUTES.NEWS.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {};

  public componentDidMount() { this.fetchData(); }

  private goBack = () => window.routerHistory.goBack();

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await NewsController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return data ? (
      <section className="G-page P-news-details-page">
        {window.routerHistory.length > 2 && <i className="P-back-icon icon-Group-5529" onClick={this.goBack} />}
        <div className="P-content">
          {data.images.length && <Images data={data} />}
          <Info data={data} />
          <p className="P-description" dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      </section>
    ) : <PageLoader />;
  }
};

export default withRouter(Details);