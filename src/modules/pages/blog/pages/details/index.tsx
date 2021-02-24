import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import generic from 'platform/decorators/generic';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Info from './components/info';
import Images from './components/images';
import HelperComponent from 'platform/classes/helper-component';
import PageLoader from 'components/page-loader';
import { IBlogDetailsResponseModel } from 'platform/api/blog/models/response';
import BlogController from 'platform/api/blog';

import './style.scss';

interface IRouteParams { id: string };

interface IState {
  data?: IBlogDetailsResponseModel;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byRoute(ROUTES.BLOG.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {};

  public componentDidMount() { this.fetchData(); }

  private goBack = () => window.routerHistory.goBack();

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await BlogController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return data ? (
      <section className="G-page P-blog-details-page">
        {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
        <div className="P-content">
          {!!data.images.length && <Images data={data} />}
          <Info data={data} />
          <p className="P-description" dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      </section>
    ) : <PageLoader />;
  }
};

export default Details;