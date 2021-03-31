import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import UserAddressController from 'platform/api/userAddress';
import Table from 'components/table';
import ROUTES from "../../../../../platform/constants/routes";
import DoneImage from 'assets/images/done.svg';

import './style.scss';

interface IProps {
  data: IUserAddressListResponseModel[];
  selectedId?: number;
  onClose(chosen?: IUserAddressListResponseModel): void; 
};

interface IState {
};

class ChooseAddress extends HelperPureComponent<IProps, IState> {

  public state: IState ={
    data: [],
  };

  private columnConfig = [
    {
      name: Settings.translations.name,
      cell: (row: IUserAddressListResponseModel) => row.name,
    },
    {
      name: Settings.translations.address,
      cell: (row: IUserAddressListResponseModel) => row.addressText,
    },
    {
      name: '',
      cell: (row: IUserAddressListResponseModel) => this.props.selectedId === row.id && <img className="P-done-icon" src={DoneImage} alt="done" />,
      style: { minWidth: 46, maxWidth: 46 },
    },
  ];

  public componentDidMount() {
    const { data } = this.props;
    !data.length && window.routerHistory.push(ROUTES.PROFILE.ADDRESSES.CREATE);
  }

  public render() {
    const { data, onClose } = this.props;

    return !!data.length && (
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