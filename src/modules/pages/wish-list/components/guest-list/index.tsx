import * as React from 'react';
import { Link } from 'react-router-dom';

import EmptyState from 'components/empty-state';
import WishController from 'platform/api/wish';
import { IWishListCartProductItem } from 'platform/api/product';
import GuestWishList from '../../services/guest';
import PageLoader from 'components/page-loader';
import { currency } from 'platform/constants';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';

import * as WishListAnimationJSON from 'assets/animations/empty_wish_list.json';

import './style.scss';

interface IState {
  data: IWishListCartProductItem[] | null;
}

class GuestList extends HelperComponent<{}, IState> {

  public state: IState = { data: null };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    if (GuestWishList.Ids.length) {
      const { data } = await WishController.Guest({ idList: GuestWishList.Ids });
      const { deletedIdList, itemList } = data;
      if (deletedIdList.length) GuestWishList.Remove(deletedIdList);
      this.safeSetState({ data: itemList });  
    } else this.safeSetState({ data: [] });
  }

  private deleteItem = (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    GuestWishList.Remove([id]);
    this.safeSetState({ data: null }, this.fetchData);
  }

  private addToCart = () => {
    const { data } = this.state;
    if (data) {
      const cartItems = data.map(item => ({
        product: item.productId,
        productVersion: item.versionId,
        count: item.minCount,
      }));

      window.routerHistory.push(ROUTES.CART);
    }
  }

  private ProductRow = ({ product }: { product: IWishListCartProductItem }) => (
    <Link to={
      product.versionId ?
      ROUTES.PRODUCTS.DETAILS.replace(':id', `${product.productId}?version=${JSON.stringify(product.attributes)}`) :
      ROUTES.PRODUCTS.DETAILS.replace(':id', product.productId)
    } className="P-product-row">
      <div className="P-image">
        <div style={{ background: `url("${product.filePath}") center/cover` }} />
      </div>
      <h3 className="P-name-attributes">
        {product.name}
        {!!product.attributes.length && <span className="P-attributes">
          {product.attributes.map(item => <React.Fragment key={item.attributeId}>
            {item.attributeName}: {item.optionName}&nbsp;
          </React.Fragment>)}
        </span>}
      </h3>
      <h3 className="P-price">
        {product.discountedPrice || product.defaultPrice} {currency}&nbsp;
        {!!product.discountedPrice && <del>{product.defaultPrice} {currency}</del>}
      </h3>
      <h3 className="G-pink P-delete" onClick={e => this.deleteItem(e, product.versionId || product.productId)}><i className="icon-delete" /></h3>
    </Link>
  );

  public render() {
    const { data } = this.state;
    
    return data ? <>
      <h1 className="G-page-title">
        {Settings.translations.wish_list}
        {!!data.length && <button onClick={this.addToCart}>{Settings.translations.add_to_cart}</button>}
      </h1>

      <div className="P-wish-list-content P-wish-list-guest G-page-min-height">
        {data.length ? data.map((item, index) => <this.ProductRow
          key={index}
          product={item}
        />) : <EmptyState
          animation={WishListAnimationJSON}
          text={Settings.translations.no_products}
        />}
      </div>
    </> : <PageLoader />;
  };
};

export default GuestList;