import * as React from 'react';

import { IProduct } from 'platform/api/product';
import { currency } from 'platform/constants';

import './style.scss';

interface IProps { details: IProduct; }

const Pricing = React.memo(({ details }: IProps) => {
  if (details.price) {
    if (details.discountedPrice) {
      return <div className="P-product-details-pricing">
        <h3>{details.discountedPrice} {currency}</h3>
        {details.discountedPrice !== details.price && <del>{details.price} {currency}</del>}
      </div>;
    }

    return <div className="P-product-details-pricing">
      <h3>{details.price} {currency}</h3>
    </div>
  }

  if (details.discountedMaxPrice && details.discountedMinPrice) return <div className="P-product-details-pricing">
    <h3>
      {details.discountedMaxPrice === details.discountedMinPrice ?
        <>{details.discountedMaxPrice} {currency}</> :
        <>{details.discountedMinPrice}-{details.discountedMaxPrice} {currency}</>}
    </h3>
    <del>
      {details.maxPrice === details.minPrice ?
        <>{details.maxPrice} {currency}</> :
        <>{details.minPrice}-{details.maxPrice} {currency}</>}
    </del>
  </div>;

  return <div className="P-product-details-pricing">
    <h3>
      {details.maxPrice === details.minPrice ?
        <>{details.maxPrice} {currency}</> :
        <>{details.minPrice}-{details.maxPrice} {currency}</>}
    </h3>
  </div>;
});

export default Pricing;