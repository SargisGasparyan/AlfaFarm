import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import generic from 'platform/decorators/generic';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
// import PageLoader from 'components/page-loader/';
import ProductController, { IProduct } from 'platform/api/product';
import Info from './components/info';
import Images from './components/images';
import Similar from './components/similar';
import HelperComponent from 'platform/classes/helper-component';
import './style.scss';

interface IRouteParams { id: string };

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byRoute(ROUTES.PRODUCTS.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, {}> {

  private goBack = () => window.routerHistory.goBack();

  public render() {

    return (
      <section className="G-page P-product-details-page">
        {window.routerHistory.length > 2 && <i className="P-back-icon icon-Group-5529" onClick={this.goBack} />}
        <div className="P-content">
          <Images />
          <Info />
        </div>
        <Similar />
      </section>
    );
  }
};

export default withRouter(Details);