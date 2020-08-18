import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import UserAddressController from 'platform/api/userAddress';
import Modify from './pages/modify';

import './style.scss';

interface IState {
  data: IUserAddressListResponseModel[];
};

@byPrivateRoute(ROUTES.PROFILE.ADDRESSES.MAIN)
class Addresses extends HelperComponent<IState, {}> {

  public state: IState = {
    data: [],
  };

  private columnConfig = [
    {
      name: Settings.translations.name,
      cell: (row: IUserAddressListResponseModel) => row.name,
    },
    {
      name: Settings.translations.city,
      cell: (row: IUserAddressListResponseModel) => row.cityName,
    },
    {
      name: Settings.translations.region,
      cell: (row: IUserAddressListResponseModel) => row.regionName,
    },
    {
      name: Settings.translations.address,
      cell: (row: IUserAddressListResponseModel) => row.addressText,
    },
    {
      name: '',
      style: { minWidth: 120, maxWidth: 120 },
      cell: (row: IUserAddressListResponseModel) => <>
        <Link to={ROUTES.PROFILE.ADDRESSES.UPDATE.replace(':id', row.id)}>
          <i
            className="icon-Group-5545 G-back-icon G-main-color G-mr-40 G-fs-26"
          />
        </Link>

        <i
          className="icon-Group-5032 G-orange-color G-cursor-pointer G-fs-24"
          onClick={() => this.deleteRow(row.id)}
        />
      </>,
    },
  ];

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await UserAddressController.GetList();
    this.safeSetState({ data: result.data });
  }

  private deleteRow = async (id: number) => {
    const result = await UserAddressController.Delete(id);
    result.data && this.fetchData();
  }
  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <div className="G-flex G-justify-end G-mb-30">
          <Link
            to={ROUTES.PROFILE.ADDRESSES.CREATE}
            className="G-normal-link G-main-button G-auto-margin-left G-fs-16"
          >{Settings.translations.add_address}</Link>
        </div>
        <div className="G-flex P-profile-orders">
          <Table<IUserAddressListResponseModel>
            columnConfig={this.columnConfig}
            data={data}
          />
        </div>
      </Layout>
    );
  }
}

export default { Addresses, Modify };