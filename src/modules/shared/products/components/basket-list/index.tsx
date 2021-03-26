import * as React from 'react';
import { Link } from 'react-router-dom';

import { IBasketListResponseModel } from '../../../../../platform/api/basket/models/response';
import Settings from '../../../../../platform/services/settings';

import './style.scss';
import ROUTES from '../../../../../platform/constants/routes';
import { formatPrice, getMediaPath } from '../../../../../platform/services/helper';
import { getBasketItemPriceInfo } from '../../../../../platform/services/basket';
import CountInput from '../../../../../components/count-input';
import HelperComponent from '../../../../../platform/classes/helper-component';

interface IProps {
  data: IBasketListResponseModel[];

  onQuantityChange(index: number, value: number): void;

  onDeleteBasketItem?(item: IBasketListResponseModel): void;
};

class BasketList extends HelperComponent<IProps, {}> {
  private priceInfo = (item: IBasketListResponseModel) => getBasketItemPriceInfo(item);

  public render() {
    const { data, onQuantityChange, onDeleteBasketItem } = this.props;

    return (<>
      {data.map((item: IBasketListResponseModel, index: number) =>
        <div className={(!item.productStockQuantity ? 'P-out-of-stock-product' : '') + ` P-list-item G-my-30`}
             key={index}>
          {onDeleteBasketItem && <i className="icon-Group-5032 G-clr-orange G-cursor-pointer G-fs-18 P-remove"
                                    onClick={() => onDeleteBasketItem(item)}/>}
          <Link to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.productId)}>
            <div className="P-product-det G-flex">

              <div className="P-image">
                <div
                  className="G-square-image-block"
                  style={{ background: `url('${getMediaPath(item.productPhoto)}') center/contain no-repeat` }}
                />
              </div>


              <div className="P-main-info G-flex G-flex-column G-flex-justify-between G-ml-40 G-mr-30">
                <div className="G-text-bold P-prod-title">{item.productTitle}</div>
                <div>
                  <CountInput
                    value={item.productQuantity}
                    step={1}
                    min={1}
                    onChange={value => item.productStockQuantity && onQuantityChange(index, value)}
                  />
                </div>
              </div>
            </div>
            <hr className="G-my-30 G-clr-gray"/>

            <div className="G-flex P-price">
              <div
                className="G-clr-main G-text-bold">{formatPrice(getBasketItemPriceInfo(item).bonus) || ' 0 '} {Settings.translations.bonus}</div>
              <hr className="G-clr-gray"/>
              <div>
                <div>{this.priceInfo(item).discountedPrice ? <del>{formatPrice(item.totalPrice)}</del> : null}</div>
                <h4 className="G-fs-18 G-clr-orange">
                  {this.priceInfo(item).discountedPrice ?
                    formatPrice(this.priceInfo(item).discountedPrice) :
                    formatPrice(this.priceInfo(item).price)}
                </h4>
              </div>
            </div>
          </Link>
        </div>)}
    </>);
  }
};

export default BasketList;
