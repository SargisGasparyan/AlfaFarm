import * as React from 'react';
import { Link } from 'react-router-dom';

import EmptyState from 'components/empty-state';
import { IWishListCartProductItem, ICartItem } from 'platform/api/product';
import CartManager from '../../services/manager';
import { currency } from 'platform/constants';
import Settings from 'platform/services/settings';
import CountInput from 'components/count-input';
import ROUTES from 'platform/constants/routes';
import { getAmountByCount } from '../../../products/services/helper';
import HelperComponent from 'platform/classes/helper-component';
import * as CartAnimationJSON from 'assets/animations/empty_cart.json';

import './style.scss';

interface IProps {
  queryExists: boolean;
  data: IWishListCartProductItem[];
  chosenItemsList: ICartItem[];
  onChosenChange(list: ICartItem[]): void;
  onDataChange(data: IWishListCartProductItem[]): void;
  onRemove(id: string): void;
};


class List extends HelperComponent<IProps, {}> {

  public componentDidMount() {
    addEventListener('deleteCard' , (e)=> {
      //@ts-ignore
      if(e.detail)  this.removeItem(e.detail)
    })
  }
  private removeItem = (id: string) => this.props.onRemove(id);

  private changeCount = (product: IWishListCartProductItem, cartItem: ICartItem, count: number) => {
    const { data, queryExists, chosenItemsList, onDataChange, onChosenChange } = this.props;
    const chosenCartItem = chosenItemsList.find(item => {
      if (item.productVersion) return item.productVersion === cartItem.productVersion;
      else return item.product === cartItem.product;
    });
    
    cartItem.count = count;

    const amount = getAmountByCount(count, product.priceList, true);

    if (amount) {
      product.discountedPrice = amount.discountedPrice;
      onDataChange(data);
    } else if (product.discountedPrice) {
      product.discountedPrice = null;
      onDataChange(data);
    }


    if (chosenCartItem) chosenCartItem.count = count;

    !queryExists && CartManager.Update(cartItem);    
    onChosenChange(chosenItemsList);
  }

  private findRow(product: IWishListCartProductItem) {
    return this.props.chosenItemsList.find(item => {
      if (item.productVersion) return item.productVersion === product.productVersion;
      else return item.product === product.product;
    })
  }

  private ProductRow = ({ product }: { product: IWishListCartProductItem }) => {
    const cartItem = this.findRow(product) as ICartItem;

    const mainPrice = cartItem.count / product.step * (product.discountedPrice || product.defaultPrice);

    return <div className="P-product-row">
     
      <div className="P-image">
        <div style={{ background: `url("${product.filePath}") center/cover` }} />
      </div>
      <Link to={
        product.productVersion ?
        ROUTES.PRODUCTS.DETAILS.replace(':id', `${product.product}?version=${JSON.stringify(product.attributes)}`) :
        ROUTES.PRODUCTS.DETAILS.replace(':id', product.product)
      } className="P-name-attributes">
        <span>{product.name}</span>
        {!!product.attributes.length && <span className="P-attributes">
          {product.attributes.map(item => <React.Fragment key={item.attributeId}>{item.attributeName}: {item.optionName}&nbsp;</React.Fragment>)}
        </span>}
      </Link>
      <div className="P-product-right">
      <CountInput
        min={product.minCount}
        step={product.step}
        defaultValue={cartItem.count}
        onChange={(count, valid) => valid && this.changeCount(product, cartItem, count)}
      />
      <div className="P-delete-bin">
        <h3 className="P-price" title={`${mainPrice.toString()} ֏`}>
          {mainPrice} {currency}&nbsp;
          {!!product.discountedPrice && <del>{cartItem.count / product.step * product.defaultPrice} {currency}</del>} 
        </h3>
        <h3 className="G-pink P-delete" onClick={() => this.removeItem(product.productVersion || product.product)}><i className="icon-delete" /></h3>
      </div>
    </div>
    </div>
  }
  public render() {
    const { data, chosenItemsList } = this.props;

    return (
      <div className={`P-cart-list G-page-min-height ${!data.length ? 'P-empty' : ''} ${chosenItemsList.length ? 'P-has-chosen' : ''}`}>
        {data.length ? data.filter(product => !!this.findRow(product)).map((item, index) => <this.ProductRow
          key={index}
          product={item}
        />) : <EmptyState
          animation={CartAnimationJSON}
          text={Settings.translations.no_products}
        />}
      </div>
    );
  };
};

export default List;