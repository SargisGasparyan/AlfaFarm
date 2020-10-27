import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import generic from 'platform/decorators/generic';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import ProductController from 'platform/api/product';
import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import Info from './components/info';
import Images from './components/images';
import Similar from './components/similar';
import HelperComponent from 'platform/classes/helper-component';
import PageLoader from 'components/page-loader';

import './style.scss';

interface IRouteParams { id: string };

interface IState {
  data?: IProductDetailsResponseModel;
};

type IProps = RouteComponentProps<IRouteParams>;

@generic<IProps>(withRouter)
@byRoute(ROUTES.PRODUCTS.DETAILS)
class Details extends HelperComponent<IProps, {}> {

  public state: IState = {};

  private goBack = () => window.routerHistory.goBack();

  public componentDidMount() { this.fetchData(); }

  public componentDidUpdate(prevProps: IProps) {
    const { id } = this.props.match.params;
    id !== prevProps.match.params.id && this.safeSetState({ data: undefined }, this.fetchData);
  }

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await ProductController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  }

  private changeDetails = (data: IProductDetailsResponseModel) => this.safeSetState({ data });

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-product-details-page">
        {data ? <>
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <div className="P-content">
            {!!data.images.length && <Images data={data} onChange={this.changeDetails} />}
            <Info data={data} />
          </div>
          <Similar data={data} />
        </> : <PageLoader />}
      </section>
    );
  }
};

export default Details;