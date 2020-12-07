import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import generic from 'platform/decorators/generic';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageLoader from 'components/page-loader';
import BasketController from 'platform/api/basket';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';
import Settings from 'platform/services/settings';

import './style.scss';
import { Shared } from 'modules';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

interface IState {
  data?: IBasketListResponseModel[];
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute(ROUTES.PROFILE.ORDERS.SAVED_BASKET_ITEMS)
class SavedBasketItems extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = { };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await BasketController.GetSavedItemsList(+id);
    this.safeSetState({ data: result.data });
  }

  private deleteSaved = async () => {
    const { id } = this.props.match.params;
    const result = await BasketController.DeleteSaved(+id);
    if (result && result.success) {
      this.goBack();
    }
  }

  private goBack = () => window.routerHistory.goBack();

  private buy = async () => {
    const { data } = this.state;

    if (data) {
      await Promise.all(data.map(item => BasketController.Change({
        productId: item.productId,
        productQuantity: item.productQuantity,
      })));

      window.routerHistory.push(ROUTES.CART);
    }
  }

  private changeQuantity = (index: number, value: number) => {
    const { data } = this.state;

    if (data) {
      data[index].productQuantity = value;
      this.safeSetState({ data });
    }
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        {data ? <div className="P-profile-order-saved-basket-items">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <Shared.Products.TableList list={data} onQuantityChange={this.changeQuantity} />
          <button className="G-main-ghost-button G-ml-auto" onClick={this.deleteSaved}>{Settings.translations.delete}</button>
          <button className="G-main-button G-ml-20" onClick={this.buy}>{Settings.translations.buy}</button>
        </div> : <PageLoader />}
      </Layout>
    );
  }
}

export default SavedBasketItems;