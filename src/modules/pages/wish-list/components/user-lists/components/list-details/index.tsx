import * as React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from 'rc-checkbox';

import WishController, { IWishListDetails, IWishListProductListRequestModel } from 'platform/api/wish';
import Settings from 'platform/services/settings';
import Select from 'components/select';
import { enumToSelectOptions, scrolledToBottom, getUserName } from 'platform/services/helper';
import { IDropdownOption, IPagination } from 'platform/constants/interfaces';
import ModifyInvitedModal from './components/modify-invited-modal';
import ROUTES from 'platform/constants/routes';
import { currency } from 'platform/constants';
import CountInput from 'components/count-input';
import { IProfile } from 'platform/api/user';
import InviteModal from './components/invite-modal';
import RequestedProducts from './components/requested-products';
import { IWishListCartProductItem, ICartItem } from 'platform/api/product';
import Connection from 'platform/services/connection';
import { getAmountByCount } from 'modules/pages/products/services/helper';
import OrderController from 'platform/api/order';
import PageLoader from 'components/page-loader';
import HelperComponent from 'platform/classes/helper-component';
import CartManager from '../../../../../cart/services/manager';
import './style.scss';

export enum ListActionsOwnerEnum {
  Edit = 1,
  Delete,
  GoToCheckout,
  EditInvitedList,
};

export enum ListActionsNonOwnerEnum {
  LeaveWishList = 1,
  GoToCheckout,
};

interface IProps {
  id: string;
  onEditChoose(): void;
  onListUpdate(): void;
};

interface IState {
  data: IWishListDetails | null;
  products: IPagination<IWishListCartProductItem> | null;
  memberIdList: string[];
  modifyInvitedOpen: boolean;
  productsLoading: boolean;
  loading: boolean;
  inviteOpen: boolean;
  membersDropdown: Array<IDropdownOption<string>>;
  chosenProducts: ICartItem[];
  listActionsDropdown: Array<IDropdownOption<ListActionsOwnerEnum | ListActionsNonOwnerEnum>>;
};

class ListDetails extends HelperComponent<IProps, IState> {

  public state: IState = {
    data: null,
    products: null,
    memberIdList: [],
    membersDropdown: [],
    productsLoading: false,
    loading: false,
    inviteOpen: false,
    modifyInvitedOpen: false,
    chosenProducts: [],
    listActionsDropdown: [],
  };

  private skip = 0;
  private limit = 20;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { id } = nextProps;
    id !== this.props.id && this.safeSetState({ chosenProducts: [] }, () => this.fetchData(id));
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private scroll = () => {
    const { products, productsLoading } = this.state;

    if (scrolledToBottom() && products && products.pagesLeft && !productsLoading) {
      this.skip += this.limit;
      this.fetchProducts();
    }
  }

  private fetchData = (id?: string) => this.safeSetState({ data: null }, async () => {
    const result = await WishController.Details(id || this.props.id);
    this.configData(result.data);
    this.safeSetState({ data: result.data }, () => this.fetchProducts(true));
  });

  private fetchProducts = (overwrite?: boolean) => this.safeSetState({ productsLoading: true }, async () => {
    const { data, products, memberIdList } = this.state;

    if (data) {
      const body: IWishListProductListRequestModel = {
        id: data._id,
        skip: this.skip,
        limit: this.limit,
      };

      if (memberIdList.length) body.memberIdList = memberIdList;
      const result = await WishController.Products(body);

      if (products && !overwrite) result.data.itemList = [...products.itemList, ...result.data.itemList];
      this.safeSetState({ products: result.data, productsLoading: false });
    }
  });

  private UsersFilterItem = ({ profile, owner }: { profile: IProfile, owner?: boolean }) => {
    const { memberIdList } = this.state;

    return (
      <label onClick={e => this.changeUsersFilter(e, profile._id)}>
        <CheckBox checked={memberIdList.indexOf(profile._id) !== -1} />
        {owner ? Settings.translations.my : getUserName(profile)}
      </label>
    );
  }

  private changeUsersFilter = (e: React.SyntheticEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const { memberIdList } = this.state;
    const currentIndex = memberIdList.indexOf(id);

    if (currentIndex !== -1) memberIdList.splice(currentIndex, 1);
    else memberIdList.push(id);

    this.safeSetState({ memberIdList }, () => this.fetchProducts(true))
  }

  private configData = (data: IWishListDetails) => {
    const { chosenProducts } = this.state;
    const noneImportArray = [];

    if (data.owner) {
      const membersDropdown: Array<IDropdownOption<string>> = data.owner && data.members.length ? [
        {
          name: () => <this.UsersFilterItem profile={data.creator} owner={true} />,
          value: data.creator._id
        }, ...data.members.map(item => ({
          name: () => <this.UsersFilterItem profile={item} />,
          value: item._id,
        })),
      ] : [];

      membersDropdown.length && this.safeSetState({ membersDropdown });
      !data.members.length && noneImportArray.push(ListActionsOwnerEnum.EditInvitedList);
      !chosenProducts.length && noneImportArray.push(ListActionsOwnerEnum.GoToCheckout);
      this.safeSetState({ listActionsDropdown: enumToSelectOptions<ListActionsOwnerEnum>(ListActionsOwnerEnum, true, noneImportArray) });
    } else {
      !chosenProducts.length && noneImportArray.push(ListActionsNonOwnerEnum.GoToCheckout);
      this.safeSetState({ listActionsDropdown: enumToSelectOptions<ListActionsNonOwnerEnum>(ListActionsNonOwnerEnum, true, noneImportArray) });
    }
  }

  private goToCheckout = async () => {
    const { chosenProducts } = this.state;
    window.routerHistory.push(`${ROUTES.CART}`)
    CartManager.AddList(chosenProducts);
    window.dispatchEvent(new CustomEvent('cartmodify'));
  }

  private chooseAction = (option: IDropdownOption<ListActionsOwnerEnum | ListActionsNonOwnerEnum>) => {
    const { data } = this.state;

    if (data && data.owner) {
      switch (option.value) {
        case ListActionsOwnerEnum.Edit:
          this.props.onEditChoose();
          break;
        case ListActionsOwnerEnum.Delete:
          this.deleteList();
          break;
        case ListActionsOwnerEnum.GoToCheckout:
          this.goToCheckout();
          break;
        case ListActionsOwnerEnum.EditInvitedList:
          this.toggleModifyInvited();
          break;
      };
    } else if (data) {
      switch (option.value) {
        case ListActionsNonOwnerEnum.LeaveWishList:
          this.leaveList();
          break;
        case ListActionsNonOwnerEnum.GoToCheckout:
          this.goToCheckout();
          break;
      }
    }
  }

  private deleteList = async () => {
    const { data } = this.state;
    if (data) {
      const result = await WishController.Delete(data._id);
      result.success && this.props.onListUpdate();
      window.dispatchEvent(new CustomEvent('addNewList'));
    }
  }

  private leaveList = async () => {
    const { data } = this.state;

    if (data) {
      const result = await WishController.Leave(data._id);
      result.success && this.props.onListUpdate();
    }
  }

  private toggleModifyInvited = () => this.safeSetState({ modifyInvitedOpen: !this.state.modifyInvitedOpen });
  private updateData = (data: IWishListDetails) => this.safeSetState({ data });
  private deleteItem = async (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    const { data } = this.state;
    if (data) {
      const body = {
        wishListId: data._id,
        wishProductId: +id,
      };

      const result = await WishController.DeleteProduct(body);
      if (result.success) {
        this.skip = 0;
        this.safeSetState({ products: null }, () => this.fetchProducts(true));
      }
    }
  }

  private countChange = async (product: IWishListCartProductItem, count: number, valid: boolean) => {
    const { data, products, chosenProducts } = this.state;

    if (valid && data) {
      const body = {
        wishListId: data._id,
        productId: product._id,
        sum: count,
      };

      const amount = valid ? getAmountByCount(count, product.priceList) : null;
      if (amount) product.discountedPrice = amount.price;
      else if (product.discountedPrice) product.discountedPrice = null;

      product.count = count;
      const chosenIndex = this.chosenIndex(product);

      if (chosenIndex !== -1) chosenProducts[chosenIndex].count = count;
      this.safeSetState({ products, chosenProducts });

      Connection.AbortAll();
      WishController.ProductCount(body);
    }
  }

  private toggleInvite = () => this.safeSetState({ inviteOpen: !this.state.inviteOpen });
  private toggleProduct = (product: IWishListCartProductItem) => {
    const { data, chosenProducts, products } = this.state;
    
    if (data) {
      const chosenIndex = chosenProducts.findIndex(item => item.product === product.product && item.productVersion === product.productVersion);
      if (chosenIndex !== -1) chosenProducts.splice(chosenIndex, 1);
      else {
        if (!product.count) product.count = product.minCount;
        chosenProducts.push({
          product: product.product,
          productVersion: product.productVersion,
          count: product.count || product.minCount,
        });
      }

      this.safeSetState({ chosenProducts, products }, () => this.configData(data));
    }
  }

  private chosenIndex = (product: IWishListCartProductItem) => {
    const { chosenProducts } = this.state;
    return chosenProducts.findIndex(item => item.product === product.product && item.productVersion === product.productVersion);
  }

  private ProductRow = ({ product }: { product: IWishListCartProductItem }) => {
    const { data } = this.state;

    const priceMultipler = product.count ? product.count / product.step : 1;

    return data && <div className="P-product-row">
      <CheckBox
        checked={this.chosenIndex(product) !== -1}
        onChange={() => this.toggleProduct(product)}
        className="P-checkbox"
      />
      <div className="P-image">
        <div style={{ background: `url("${product.image}") center/cover` }} />
      </div>
      <Link to={
        product.productVersion ?
          ROUTES.PRODUCTS.DETAILS.replace(':id', `${product.product}?version=${JSON.stringify(product.attributes)}`) :
          ROUTES.PRODUCTS.DETAILS.replace(':id', product.product)
      } className="P-name-attributes">
        {product.name}
        {!!product.attributes.length && <span className="P-attributes">
          {product.attributes.map(item => <React.Fragment key={item.attributeId}>
            {item.attributeName}: {item.optionName}&nbsp;
          </React.Fragment>)}
        </span>}
      </Link>
      <div className="P-responsive-block">
        <CountInput
          withPlus={true}
          step={product.step}
          min={product.minCount}
          value={product.count}
          onChange={(count, valid) => this.countChange(product, count, valid)}
        />
        <h3 className="P-price">
          {priceMultipler * (product.discountedPrice || product.defaultPrice)} {currency}&nbsp;
        {!!product.discountedPrice && <del>{priceMultipler * product.defaultPrice} {currency}</del>}
        </h3>
        {data.owner && <h3
          className="G-pink P-delete"
          onClick={e => this.deleteItem(e, product._id)}
        ><i className="icon-delete" /></h3>}
      </div>
    </div>;
  }

  private export = () => {
    const { data, chosenProducts } = this.state;

    if (data) this.safeSetState({ loading: true }, async () => {
      const result = await OrderController.Invoice({
        idList: chosenProducts,
        companyId: data.companyId || null,
      });

      result.data && window.open(result.data, '_blank');
      this.safeSetState({ loading: false });
    });
  }

  public render() {
    const {
      data,
      modifyInvitedOpen,
      chosenProducts,
      listActionsDropdown,
      products,
      inviteOpen,
      membersDropdown,
      loading,
    } = this.state;

    return data ? (
      <div className="P-wish-list-details P-wish-list-content G-page-min-height">
        <div className="P-list-header">
          <h2>
            <span>
              {data.name}
              {products && <span className="P-count">{products.itemCount}</span>}
            </span>
            {!!chosenProducts.length && <i className="icon-pdf" onClick={this.export} />}
            <Select<ListActionsOwnerEnum | ListActionsNonOwnerEnum>
              options={listActionsDropdown}
              placeholder={<i className="icon-more" />}
              onChange={this.chooseAction}
              className="P-actions"
              value={null}
            />
          </h2>
          <h3 className="P-payer">{Settings.translations.payer}: {data.company || Settings.translations.i}</h3>
        </div>
        {data.owner && <>
          <div className="P-border-line" />
          <button className="P-invite" onClick={this.toggleInvite}><i className="icon-Add P-big-icon" /> {Settings.translations.invite}</button>
        </>}
        <div className="P-border-line" />
        <RequestedProducts id={data._id} owner={data.owner} getProductsList={this.fetchData}/>
        {data.owner && !!data.members.length && <Select<string>
          options={membersDropdown}
          className="P-members-filter"
          placeholder={<h2><i className="icon-options P-big-icon" /> {Settings.translations.filter_for_users}</h2>}
        />}
        {products && products.itemList.map(item => <this.ProductRow key={item._id} product={item} />)}
        {modifyInvitedOpen && <ModifyInvitedModal data={data} onClose={this.toggleModifyInvited} onDataChange={this.updateData} />}
        {inviteOpen && <InviteModal id={data._id} onClose={this.toggleInvite} />}
        {loading && <PageLoader />}
      </div>
    ) : null;
  }
};

export default ListDetails;