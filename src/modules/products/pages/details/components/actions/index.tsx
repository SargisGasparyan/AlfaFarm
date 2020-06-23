import * as React from 'react';
import URLSearchParams from '@ungap/url-search-params';

import ProductController, {
  IProduct,
  IProductAttributeOption,
  IProductChosenAttribute,
  IProductVersionRequestModel,
} from 'platform/api/product';
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';
import GuestWishList from 'modules/wish-list/services/guest';
import CountInput from 'components/count-input';
import PageLoader from 'components/page-loader';
import AdditionalSales from './components/additional-sales';
import BonusAndType from './components/bonus-and-type';
import Pricing from './components/pricing';
import Attributes from './components/attributes';
import Storage from 'platform/services/storage';
import { IProductListItemAttribute } from 'platform/api/product';
import ChangeListModal from './components/change-list-modal';
import CartManager from '../../../../../cart/services/manager';
import { getAmountByCount } from '../../../../services/helper';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import './style.scss';

interface IProps {
  details: IProduct;
  initialDetails: IProduct;
  onImageChange(id: string): void;
  onDetailsUpdate(details: IProduct, checkAttributes?: boolean): void;
};

interface IState {
  count: number;
  submited: boolean;
  versionId: string | null;
  loading: boolean;
  chosenAttributes: IProductChosenAttribute[];
  changeListOpen: boolean;
  isFavorite: boolean;
  countValid: boolean;
  choosePrevented: boolean;
  added: boolean;
};

class Actions extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    count: 1,
    countValid: true,
    submited: false,
    versionId: null,
    loading: false,
    chosenAttributes: [],
    changeListOpen: false,
    isFavorite: false,
    choosePrevented: false,
    added: false
  };

  public componentDidMount() {

    const { details } = this.props;
    this.safeSetState({ count: details.minCount, isFavorite: Storage.profile ? details.isFavorite : this.isGuestFavorite() }, this.checkCount);
    this.checkForVersion();
    this.tryChooseAttributes();
  }

  private tryChooseAttributes = () => {
    const { details: { attributes, _id } } = this.props;

    if (attributes) {
      const attributeIds = Object.keys(attributes);
      const onlyOneOptions = !attributeIds.find(item => attributes[item].options.length > 1);
      const chosenModified = false;
      const { chosenAttributes } = this.state;

      attributeIds.map(item => {
        const currentOptions = attributes[item].options.filter(option => !option.disabled);
        if (currentOptions.length === 1) {
          const option = currentOptions[0];

          if (!chosenAttributes.find(sub => sub.option === option._id)) {
            // chosenModified = true;
            // chosenAttributes.push({
            //   attribute: item,
            //   option: option._id,
            //   displayName: option.name,
            // });
          }
        }
      });

      if (chosenAttributes.length && chosenModified) {
        this.safeSetState({ chosenAttributes, choosePrevented: onlyOneOptions }, () => {
          const chosen = chosenAttributes.map(item => ({ ...item }));
          chosen.map(item => delete item.displayName);
          this.fetchAttributeChange({ id: _id, chosen });
        });
      }
    }
  }

  private isGuestFavorite = (versionId?: string) => {
    const { details } = this.props;
    const id = details.attributes ? versionId : details._id;
    return !!id && GuestWishList.Ids.indexOf(id) !== -1;
  }

  private checkForVersion = () => {
    const { details } = this.props;
    const query = new URLSearchParams(window.location.search);
    const gettedVersion = query.get('version');
    if (gettedVersion) {
      try {
        const version = JSON.parse(gettedVersion) as IProductListItemAttribute[];
        if (Array.isArray(version)) {
          const chosen = version.map(item => ({
            attribute: item.attributeId,
            option: item.optionId,
            displayName: item.optionName,
          }));

          const body = {
            id: details._id,
            chosen: chosen.map(item => ({ attribute: item.attribute, option: item.option })),
          };

          this.safeSetState({ loading: true, chosenAttributes: chosen }, () => this.fetchAttributeChange(body, true));
        }
      } catch (e) { /* */ }
    }
  }

  private onlyOneOptions = () => {
    const { details: { attributes } } = this.props;

    if (attributes) {
      const attributeIds = Object.keys(attributes);
      const moreOneOptions = attributeIds.find(item => {
        const options = attributes[item].options.filter(option => !option.disabled);
        return options.length > 1;
      });

      return !moreOneOptions;
    }

    return false;
  }

  private toggleAttribute = async (attributeId: string, option: IProductAttributeOption, first: boolean) => {
    const { choosePrevented } = this.state;
    if (first) {
      this.state.chosenAttributes = [];
    }

    if (!choosePrevented) {
      const { details } = this.props;
      let { chosenAttributes } = this.state;
      const currentAttribute = chosenAttributes.find(item => item.attribute === attributeId);
      const currentOption = currentAttribute ? chosenAttributes.find(item => item.option === option._id) : null;

      if (currentOption && details.attributes) {
        const attributeOptions = details.attributes[attributeId].options;
        const activeOptions = attributeOptions.filter(item => !item.disabled);
        if (currentAttribute && activeOptions.length === 1 && !this.onlyOneOptions() || attributeOptions.length === 1) {
          return;
        }
        else if (this.onlyOneOptions()) {
          chosenAttributes = [];
        }
        else {
          chosenAttributes.splice(chosenAttributes.indexOf(currentOption), 1)
        };

        this.safeSetState({ isFavorite: false, versionId: null });

      } else if (currentAttribute) {

        currentAttribute.option = option._id;
        currentAttribute.displayName = option.name;
      } else {
        chosenAttributes.push({
          attribute: attributeId,
          option: option._id,
          displayName: option.name,
        });
      }

      this.safeSetState({ chosenAttributes, submited: false }, this.tryChooseAttributes);

      if (chosenAttributes.length) {

        const chosen = chosenAttributes.map(item => ({ ...item }));

        chosen.map(item => delete item.displayName);
        this.fetchAttributeChange({ id: details._id, chosen });
      } else {
        const { initialDetails } = this.props;
        this.props.onDetailsUpdate(initialDetails, true);
      }
    }
  }

  private changeCount = (count: number, countValid: boolean) => {
    this.safeSetState({ count, countValid }, this.checkCount);
  }

  private fetchAttributeChange = async (body: IProductVersionRequestModel, onlyVersion: boolean = false) => this.safeSetState({ choosePrevented: true },
    async () => {
      const { count } = this.state;
      const { details } = this.props;
        
      if (details.attributes) {
        if (body.chosen.length === Object.keys(details.attributes).length) {
          const result = await ProductController.Version(body);
          if (result.data) {

            const { version, attributes } = result.data;
            const amount = !this.countInvalid() ? getAmountByCount(count, version.priceAmounts) : null;
            const data = {
              attributes,
              price: version.price,
              priceAmounts: version.priceAmounts.sort((first, second) => second.fromCount - first.fromCount),
              ...amount,
            };

            version.photo && this.props.onImageChange(version.photo);
            this.props.onDetailsUpdate({
              ...details,
              ...data,
            }, true);

            this.safeSetState({
              versionId: version._id,
              isFavorite: Storage.profile ? version.isFavorite : this.isGuestFavorite(version._id),
              loading: false,
            });
          }
        } else if (!onlyVersion) {
          const result = await ProductController.Range(body);
          if (result.data) {
            this.props.onDetailsUpdate({
              ...details,
              ...result.data,
            }, true);

            result.data.photo && this.props.onImageChange(result.data.photo);
            this.tryChooseAttributes();
          }
        }
      }
      this.safeSetState({ choosePrevented: false });
    }
  );

  private countInvalid = () => {
    const { details } = this.props;
    const { count } = this.state;
    return +count < details.minCount || (+count * 100) % (+details.step * 100);
  }

  private checkCount = () => {
    const { count } = this.state;
    const { details, initialDetails } = this.props;

    if (details.priceAmounts) {
      const amount = !this.countInvalid() && getAmountByCount(count, details.priceAmounts);
      if (amount) this.props.onDetailsUpdate({
        ...details,
        ...amount,
      }); else this.props.onDetailsUpdate({
        ...initialDetails,
        ...details.attributes,
      });
    }
  }

  private addToCart = async () => {
    const { details } = this.props;
    const { submited, versionId, countValid } = this.state;
    const alertify = await import('alertifyjs');

    if (countValid) {
      !submited && this.safeSetState({ submited: true });

      alertify.dismissAll();
      if (details.attributes && !versionId) {
        alertify.error(Settings.translations.choose_all_attributes);
      }
      else {
        CartManager.Add({
          product: details._id,
          productVersion: versionId,
          count: this.state.count,
        });
        this.safeSetState({
          added: true
        })
      }
    }
  }

  private modifyList = async () => {
    const { details } = this.props;
    const { submited, versionId } = this.state;
    const alertify = await import('alertifyjs');

    !submited && this.safeSetState({ submited: true });
    if (details.attributes && !versionId) {
      alertify.dismissAll();
      alertify.error(Settings.translations.choose_all_attributes);
    } else {
      const id = details.attributes ? versionId : details._id;
      if (id) {
        const currentIndex = GuestWishList.Ids.indexOf(id);

        if (currentIndex !== -1) {
          GuestWishList.Remove([id]);
          this.safeSetState({ isFavorite: false });
        } else {
          GuestWishList.Add(id);
          this.safeSetState({ isFavorite: true });
        }
      }
    }
  }

  private openChangeListModal = async () => {
    const { details } = this.props;
    const { versionId, submited } = this.state;
    const alertify = await import('alertifyjs');

    if (!submited) this.safeSetState({ submited: true });
    if (details.attributes && !versionId) {
      alertify.dismissAll();
      alertify.error(Settings.translations.choose_all_attributes);
    } else this.safeSetState({ changeListOpen: true, submited: false });
  }

  private closeChangeListModal = (isFavorite?: boolean) => {
    if (typeof isFavorite !== 'undefined') {
      this.safeSetState({ changeListOpen: false, isFavorite });
      window.dispatchEvent(new CustomEvent('wishlistmodify'));
    } else this.safeSetState({ changeListOpen: false });
  }

  public render() {
    const { details } = this.props;
    const { submited, loading, chosenAttributes, changeListOpen, isFavorite, versionId, countValid } = this.state;
    if (this.state.added === true) {
      setTimeout(() => {
        this.safeSetState({
          added: false
        })
      }, 2000);
    }

    return !loading ? (
      <div className="P-product-actions">
        <a className="P-brand">{details.brand}</a>
        <h2 className="P-name">{details.name}</h2>
        <Pricing details={details} />
        <BonusAndType details={details} />
        <div className="P-border-line" />
        {details.attributes && <Attributes
          details={details}
          submited={submited}
          chosen={chosenAttributes}
          toggleAttribute={this.toggleAttribute}
        />}
        <form className="G-fields-form">
          <CountInput step={details.step} min={details.minCount} onChange={this.changeCount} />
          <LoaderContent
            type="button"
            loading={false}
            disabled={!countValid}
            className="G-form-button P-add-to-cart"
            onClick={this.addToCart}
          >{this.state.added === true ? <span><i className="icon-tick" /> {Settings.translations.added}</span>
            : window.innerWidth < 1600 && window.innerWidth > 1250
              ? Settings.translations.add_to_cart_short : Settings.translations.add_to_cart}
          </LoaderContent>
          <i className="icon-cart icon-cart-mobile" onClick={this.addToCart} />
          <button
            type="button"
            className="G-form-button P-add-to-list"
            onClick={Storage.profile ? this.openChangeListModal : this.modifyList}
          ><i className={isFavorite ? 'icon-wishlist_01 G-pink' : 'icon-wishlist'} /> {Settings.translations.lists}</button>
          <i className={`icon-wishlist-mobile ${isFavorite ? 'icon-wishlist_01 G-pink ' : 'icon-wishlist'}`}
            onClick={Storage.profile ? this.openChangeListModal : this.modifyList} />
        </form>
        <AdditionalSales details={details} />
        {changeListOpen && <ChangeListModal onClose={this.closeChangeListModal} version={versionId} details={details} />}
      </div>
    )
      : <PageLoader />;

  }
};

export default Actions;
