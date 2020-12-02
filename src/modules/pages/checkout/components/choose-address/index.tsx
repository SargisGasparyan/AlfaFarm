import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import UserAddressController from 'platform/api/userAddress';
import Table from 'components/table';

import './style.scss';
import ROUTES from "../../../../../platform/constants/routes";

interface IProps {
  onClose(chosen?: IUserAddressListResponseModel): void; 
};

interface IState {
  data: IUserAddressListResponseModel[];
};

class ChooseAddress extends HelperPureComponent<IProps, IState> {

  public state: IState ={
    data: [],
  };

  public componentDidMount() { this.fetchData(); }

  private columnConfig = [
    {
      name: Settings.translations.name,
      cell: (row: IUserAddressListResponseModel) => row.name,
    },
    {
      name: Settings.translations.address,
      cell: (row: IUserAddressListResponseModel) => row.addressText,
    },
  ];

  private fetchData = async () => {
    const result = await UserAddressController.GetList();
    if (result.data.length) this.safeSetState({ data: result.data });
    else window.routerHistory.push(ROUTES.PROFILE.ADDRESSES.CREATE)
  }

  public render() {
    const { data } = this.state;
    const { onClose } = this.props;

    return data.length && (
      <Modal className="P-checkout-choose-address-modal" onClose={() => onClose()}>
        <Table<IUserAddressListResponseModel>
          onRowClick={onClose}
          columnConfig={this.columnConfig}
          data={data}
        />
      </Modal>
    );
  }
}

export default ChooseAddress;