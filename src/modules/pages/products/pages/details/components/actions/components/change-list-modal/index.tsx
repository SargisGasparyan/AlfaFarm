import * as React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from 'rc-checkbox';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import WishController, { IWishListShortItem, IWishListShortRequestModel, IChangeProductWishList, ProductWishListActionEnum } from 'platform/api/wish';
import LoaderContent from 'components/loader-content';
import ROUTES from 'platform/constants/routes';
import { IProduct } from 'platform/api/product';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  version: string | null;
  details: IProduct;
  onClose(isFavorite?: boolean): void;
};

interface IState {
  lists: IWishListShortItem[] | null;
  loading: boolean;
};

class ChangeListModal extends HelperComponent<IProps, IState> {

  public state: IState = {
    lists: null,
    loading: false,
  };

  public async componentDidMount() {
    this.fetchData();
  }

  private fetchData = () => this.safeSetState({ loading: true }, async () => {
    const { details, version } = this.props;
    const query: IWishListShortRequestModel = { productId: details._id };
    if (details.attributes && version) query.productVersionId = version;

    const result = await WishController.Short(query);
    this.safeSetState({ lists: result.data, loading: false });
  })

  private changeFavorite = (list: IWishListShortItem) => {
    const { lists } = this.state;
    list.added = !list.added;
    this.safeSetState({ lists });
  }
  private save = () => this.safeSetState({ loading: true }, async () => {
    const { details, version } = this.props;
    const { lists } = this.state;
    
    if (lists) {
      const body: IChangeProductWishList = {
        productId: details._id,
        actions: lists.map(item => ({
          wishListId: item._id,
          action: item.added ? ProductWishListActionEnum.Add : ProductWishListActionEnum.Delete,
        }))
      };
      if (details.attributes && version) body.productVersionId = version;

      const result = await WishController.Product(body);
      if (result.success) this.props.onClose(!!body.actions.find(item => item.action === ProductWishListActionEnum.Add));
    }
  });

  private onCloseModal = () => this.props.onClose();

  public render() {
    const { lists, loading } = this.state;

    return (
      <Modal onClose={this.onCloseModal} className="P-change-list-modal">
        <form className="G-fields-form">
          <h2>{Settings.translations.wish_list}</h2>
          {lists && lists.map(item => <label className="P-list" key={item._id}>
            <CheckBox checked={item.added} onChange={() => this.changeFavorite(item)} />
            <h3>{item.name}</h3>
          </label>)}
          <Link to={ROUTES.WISH_LIST.MAIN} className="P-list P-new">
            <h3 className="G-main-color">{Settings.translations.new}</h3>
          </Link>
          <LoaderContent loading={loading} className="G-form-button" onClick={this.save}>
            {Settings.translations.save}
          </LoaderContent>
        </form>
      </Modal>
    );
  }
};

export default ChangeListModal;