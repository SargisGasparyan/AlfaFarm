import * as React from 'react';
import { Link } from 'react-router-dom';

import { Shared } from 'modules';
import HelperComponent from 'platform/classes/helper-component';
import ROUTES from 'platform/constants/routes';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';

import './style.scss';
import { PromotionTypeEnum } from 'platform/constants/enums';

interface IProps {
  data: IBasketListResponseModel[];
};

const List = React.memo(({ data }: IProps) => {

  return (
    <div className="G-flex P-order-item">
      {data ? (data.length ? data.map((item, index) => <Link
        to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.id)}
        key={item.id}
        className="P-list-item"
      >
        {!!item.promotion.percent &&
        <Shared.Products.DiscountLabel percent={item.promotion.percent} type={item.promotion.promotionType}/>}
        <div
          className="P-image G-square-image-block"
          style={{ background: `url('${getMediaPath(item.productPhoto)}') center/cover` }}
        />

        <div className="P-main-info">
          <p className="P-prod-title">{item.productTitle}</p>
          <p>{item.unitQuantity} {item.unitName}</p>
        </div>

        <div className="P-quantity">
          x {item.productQuantity}
        </div>

        <div className="P-price">
          <div>{item.promotion.promotionType === PromotionTypeEnum.Discount && item.promotion.result > 0 ?
            <del>{formatPrice(item.totalPrice)}</del> : null}</div>
          <h2 className="G-clr-orange">
            {item.promotion.promotionType === PromotionTypeEnum.Discount ?
              formatPrice(item.promotion.result) :
              formatPrice(item.totalPrice)}
          </h2>
        </div>
      </Link>) : null) : null}
    </div>
  );
});

export default List;
