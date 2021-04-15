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
import { Shared } from 'modules';

import './style.scss';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyBaskets.json';

interface IState {
  data?: IBasketListResponseModel[];
  inProgress: boolean;
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute(ROUTES.PROFILE.FAVORITES.SAVED_BASKET_ITEMS)
class SavedBasketItems extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {
    inProgress: false,
  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await BasketController.GetSavedItemsList(+id);
    this.safeSetState({ data: result.data.items });
  }

  private deleteSaved = async () => {
    if (!this.state.inProgress) {
      this.safeSetState({ inProgress: true });
      const { id } = this.props.match.params;
      const result = await BasketController.DeleteSaved(+id);
      if (result && result.success) {
        this.safeSetState({ inProgress: false });
        this.goBack();
      }
    }
  }

  private goBack = () => window.routerHistory.goBack();

  private buy = async () => {
    const { data } = this.state;

    if (data) {
      await Promise.all(data.map(item => BasketController.Change({
        productId: item.productId,
        productQuantity: item.productQuantity,
        isPackage: item.isPackage,
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
        {data ? (data.length ?  <div className="P-profile-favorites-saved-basket-items G-flex G-flex-column">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <Shared.Products.BasketList data={data} onQuantityChange={this.changeQuantity} />

          <div className="G-flex G-flex-justify-end P-actions">
            <button className="G-main-ghost-button G-ml-auto" onClick={this.deleteSaved}>{Settings.translations.delete}</button>
            <button className="G-main-button G-ml-20" onClick={this.buy}>{Settings.translations.buy}</button>
          </div>

        </div> : <EmptyState animationData={animationData} text={Settings.translations.no_products} />)
         : <PageLoader />}
      </Layout>
    );
  }
}

export default SavedBasketItems;
