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
import { onlyForUsers } from 'platform/guards/routes';
import EmptyState from 'components/empty-state';
import DoneImage from 'assets/images/done.svg';

import './style.scss';

interface IState {
  data: IUserAddressListResponseModel[] | null;
};

@byPrivateRoute(ROUTES.PROFILE.ADDRESSES.MAIN, [onlyForUsers])
class Addresses extends HelperComponent<IState, {}> {

  public state: IState = {
    data: null,
  };

  private columnConfig = [
    {
      name: Settings.translations.name,
      cell: (row: IUserAddressListResponseModel) => <>
        {row.isDefault && <img className="P-done-icon" src={DoneImage} />}
        {row.name}
      </>,
    },
    {
      name: Settings.translations.address,
      cell: (row: IUserAddressListResponseModel) => row.addressText,
    },
    {
      name: '',
      cell: (row: IUserAddressListResponseModel) => !row.isDefault && <button
        className="G-main-button P-make-default"
        onClick={() => this.makeDefault(row.id)}
      >{Settings.translations.make_default}</button>,
    },
    {
      name: '',
      style: { minWidth: 150, maxWidth: 150 },
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

  private makeDefault = async (id: number) => {
    const result = await UserAddressController.MakeDefault(id);
    result.data && this.fetchData();
  }

  private deleteRow = async (id: number) => {
    const result = await UserAddressController.Delete(id);
    result.data && this.fetchData();
  }


  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <div className="G-flex G-flex-justify-end G-mb-30">
          <Link
            to={ROUTES.PROFILE.ADDRESSES.CREATE}
            className="G-normal-link G-main-button G-ml-auto G-fs-16"
          >{Settings.translations.add_address}</Link>
        </div>
        {data ? (data.length ? <div className="G-flex P-profile-addresses">
          <Table<IUserAddressListResponseModel>
            columnConfig={this.columnConfig}
            data={data}
          />
        </div> : <EmptyState text={Settings.translations.empty_address_list} />) : null}
      </Layout>
    );
  }
}

export default { Addresses, Modify };