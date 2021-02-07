import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from '../../../../components/layout';
import Settings from 'platform/services/settings';
import { byPrivateRoute } from 'platform/decorators/routes';
import { onlyForUsers } from 'platform/guards/routes';
import ROUTES from 'platform/constants/routes';
import HelperComponent from 'platform/classes/helper-component';
import PrescriptionController from 'platform/api/prescription';
import { IBasketListResponseModel, IBasketResponseModel } from 'platform/api/basket/models/response';
import { Shared } from 'modules';

import './style.scss';
import PageLoader from 'components/page-loader';
import BasketController from 'platform/api/basket';


interface IState {
  data?: IBasketResponseModel;
};

interface IRouteParams { id: string; }

@byPrivateRoute(ROUTES.PROFILE.PRESCRIPTIONS.DECIPHERED, [onlyForUsers])
class Deciphered extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = { };

  public componentDidMount() { this.fetchData(); }

  private goBack = () => window.routerHistory.goBack();

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await PrescriptionController.GetAttachedProducts(+id);
    this.safeSetState({ data: result.data });
  }

  private buy = async () => {
    const { data } = this.state;

    if (data) {
      await Promise.all(data.items.map(item => BasketController.Change({
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
    console.log(data)

    return (
      <Layout>
        <div className="G-flex G-flex-wrap P-profile-prescriptions-deciphered">
          <h3>
            {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
            {Settings.translations.deciphered_prescription}
          </h3>

          {data ? <>
            <Shared.Products.TableList list={data.items} onQuantityChange={this.changeQuantity} />
            <button className="G-main-button G-ml-auto" onClick={this.buy}>{Settings.translations.buy}</button>
          </> : <PageLoader />}
        </div>
      </Layout>
    );
  }
}

export default Deciphered;