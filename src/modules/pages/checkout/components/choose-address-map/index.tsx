import * as React from 'react';
import HelperComponent from 'platform/classes/helper-component';
import Maps from 'components/maps';
import SearchInput from 'components/search-input';
import Modal from 'components/modal';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';

import './style.scss';

interface IProps {
  onClose(chosen?: IPharmacyBranchListResponseModel): void;
};
interface IState {
  searchValue: string;
};

class ChooseAddressMap extends HelperComponent<IProps, IState> {

  public state: IState = {
    searchValue: '',
  };


  private onSearchChange = (searchValue: string) => this.safeSetState({ searchValue });


  public render() {
    const { onClose } = this.props;

    return  (
      <Modal className="P-checkout-choose-address-map-modal" onClose={() => onClose()}>
        <div className="P-content">
          <div className="P-maps-wrapper">
            <SearchInput onChange={this.onSearchChange} />
            <Maps />
          </div>
        </div>
      </Modal>
    );
  }
};

export default ChooseAddressMap;
