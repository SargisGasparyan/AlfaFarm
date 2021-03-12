import * as React from 'react';
import { Link } from 'react-router-dom';

import { Shared } from 'modules';
import HelperComponent from 'platform/classes/helper-component';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';

import './style.scss';
import { PromotionTypeEnum } from 'platform/constants/enums';

interface IProps {
  data: IBasketListResponseModel[];
};

class OrderListItem extends HelperComponent<IProps, {}> {

  public render() {
    const { data } = this.props;

    return (
      <div className="G-flex P-order-item">
        {data ? (data.length ? data.map((item, index) => <Link
          to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.id)}
          key={item.id}
          className="P-list-item"
        >
          {!!item.promotion.percent && <Shared.Products.DiscountLabel percent={item.promotion.percent} type={item.promotion.promotionType} />}
          <div
            className="P-image G-square-image-block"
            style={{ background: `url('${getMediaPath(item.productPhoto)}') center/cover` }}
          />

          <div className="P-main-info">
            <h2>{item.productTitle}</h2>
            <span>{item.unitQuantity} {item.unitName}</span>
          </div>

          <div className="P-quantity">
            x {item.productQuantity}
          </div>

          <div className="P-price">
            <div>{item.promotion.promotionType === PromotionTypeEnum.Discount && item.promotion.result > 0 ? <del>{formatPrice(item.totalPrice)}</del> : null}</div>
            <h2 className={`${item.promotion.promotionType === PromotionTypeEnum.Discount && item.promotion.result ? 'G-clr-orange' : ''}`}>
              {item.promotion.promotionType === PromotionTypeEnum.Discount ?
                formatPrice(item.promotion.result) :
                formatPrice(item.totalPrice)}
            </h2>
          </div>
        </Link>) : null) : null}
      </div>
    );
  }
}

export default OrderListItem;