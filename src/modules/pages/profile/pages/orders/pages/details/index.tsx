import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import generic from 'platform/decorators/generic';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import OrderController from 'platform/api/order';

import './style.scss';

interface IState {
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute(ROUTES.PROFILE.ORDERS.DETAILS)
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {

  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    // const { id } = this.props.match.params;
    // const result = await OrderController.GetDetails(+id);

  }

  private goBack = () => window.routerHistory.goBack();

  public render() {

    return (
      <Layout>
        <div className="G-flex G-flex-wrap P-profile-order-details">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <div className="P-main-info-block G-mr-20">
            s
          </div>
          <div className="P-address-block">
            s
          </div>
        </div>
      </Layout>
    );
  }
}

export default Details;