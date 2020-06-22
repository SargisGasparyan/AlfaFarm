import * as React from 'react';

import EmptyState from 'components/empty-state';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byPrivateRoute } from 'platform/decorators/routes';
import ModifyModal from './components/modify-modal';
import AddressController, { IAddress } from 'platform/api/address';
import { paginationPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import HelperComponent from 'platform/classes/helper-component';

import * as EmptyAddressesJSON from 'assets/animations/empty_addresses.json';

import './style.scss';

interface IState {
  modifyOpen: boolean;
  modifyId: string | null;
  loading: boolean;
  data: IAddress[] | null;
};

@byPrivateRoute(ROUTES.PROFILE.MY_ADDRESSES)
class MyAddresses extends HelperComponent<{}, IState> {

  public state: IState ={
    modifyOpen: false,
    modifyId: null,
    loading: false,
    data: null,
  };

  private pageNo = 1;
  private lastPage = false;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const result = await AddressController.List(this.pageNo, paginationPageLimit);
      const data = this.state.data || [];
      this.safeSetState({ data: overwrite ? result.data.itemList : [...data, ...result.data.itemList], loading: false });
      this.lastPage = !result.data.pagesLeft;
    } else this.safeSetState({ loading: false });
  });

  private scroll = () => {
    const { loading } = this.state;
    
    if (!this.lastPage && scrolledToBottom() && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  private closeModify = (updateList: boolean) => {
    this.safeSetState({
      modifyOpen: false,
      modifyId: null,
    });

    if (updateList) {
      this.pageNo = 1;
      this.lastPage = false;
      this.safeSetState({ data: null }, () => this.fetchData(true));
    }
  }

  private openModfiy = () => this.safeSetState({
    modifyOpen: true,
    modifyId: null,
  });

  private openModifyData = (id: string) => this.safeSetState({
    modifyOpen: true,
    modifyId: id,
  });

  private delete = async (id: string) => {
    const result = await AddressController.Delete(id);
    if (result.success) {
      this.pageNo = 1;
      this.lastPage = false;
      this.safeSetState({ data: null }, () => this.fetchData(true));
    }
  }

  private AddressItem = ({ address }: { address: IAddress }) => (
    <div className="P-address-item">
      <h3>
        {address.address}&nbsp;
        {!!address.house && address.house}
        {!!address.apartment && `${address.house ? '/' : ''}${address.apartment}`}
        <div className="P-item-actions">
          <span onClick={() => this.openModifyData(address._id)}><i className="icon-edit" /></span>
          <span className="P-G-pink" onClick={() => this.delete(address._id)}><i className="icon-delete" /></span>
        </div>
      </h3>
      <h4>
        {address.contactName} &middot; +{address.contactPhoneNumber}
        {address.isUserDefaultAddress && <> &middot; <span className="P-G-main-color">{Settings.translations.default_address}</span></>}
      </h4>
    </div>
  );

  public render() {
    const { modifyOpen, modifyId, data } = this.state;

    return (
      <section className="P-G-page P-my-addresses-page">
        <h1 className="P-G-page-title">
          {Settings.translations.my_addresses}
          {data && !!data.length && <button onClick={this.openModfiy}>{Settings.translations.add_new_address}</button>}
        </h1>
        {data ? <div className="P-my-addresses-content P-G-page-min-height">
          {!!data.length ? data.map(item => <this.AddressItem key={item._id} address={item} />) : <EmptyState
            text={Settings.translations.no_addresses}
            animation={EmptyAddressesJSON}
            buttonText={Settings.translations.add_new_address}
            onClick={this.openModfiy}
          />}
        </div> : <PageLoader />}
        {modifyOpen && <ModifyModal
          onClose={this.closeModify}
          id={modifyId}
        />}
      </section>
    );
  }
};

export default MyAddresses;