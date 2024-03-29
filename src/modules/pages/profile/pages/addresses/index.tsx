import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import List from './components/list';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import UserAddressController from 'platform/api/userAddress';
import Modify from './pages/modify';
import { onlyForUsers } from 'platform/guards/routes';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyAddresses.json';
import * as loadingData from 'assets/animations/loading.json';
import './style.scss';

interface IState {
  data: IUserAddressListResponseModel[] | null;
  isLoading: boolean;
};

@byPrivateRoute(ROUTES.PROFILE.ADDRESSES.MAIN, [onlyForUsers])
class Addresses extends HelperComponent<IState, {}> {

  public state: IState = {
    data: null,
    isLoading: true,
  };



  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await UserAddressController.GetList();
    this.safeSetState({ data: result.data, isLoading: false });
  }

  private makeDefault = async (id: number) => {
    const result = await UserAddressController.MakeDefault(id);
    result.data && this.fetchData();
  }

  private deleteRow = async (id: number) => {
    const result = await UserAddressController.Delete(id);
    result.data && this.fetchData();
  }


  public render() {
    const { data, isLoading } = this.state;
    return (
      <Layout>
        <div className="G-flex G-flex-justify-end G-mb-30 G-flex-align-center">
          <h2 className="G-clr-main">{Settings.translations.addresses}</h2>
          <Link
            to={ROUTES.PROFILE.ADDRESSES.CREATE}
            className="G-normal-link G-main-button G-ml-auto G-fs-16"
          >+ {Settings.translations.add_address}</Link>
        </div>
        {data ? (data.length ? <div className="G-flex P-profile-addresses">
          <List
            onEditDefault={(id: number) => this.makeDefault(id)}
            onRemove={(id: number) => this.deleteRow(id)}
            data={data}
          />
        </div> : <EmptyState animationData={isLoading ? loadingData : animationData} text={isLoading ? '' : Settings.translations.empty_address_list} />) : null}
      </Layout>
    );
  }
}

export default { Addresses, Modify };
