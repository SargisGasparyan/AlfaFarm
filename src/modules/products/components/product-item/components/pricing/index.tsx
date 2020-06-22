import * as React from 'react';

import { currency } from 'platform/constants';
import { IProductListItem } from '../../../../../..//platform/api/product';

import './style.scss';

interface IProps { details: IProductListItem; };

const Pricing = React.memo(({ details }: IProps) => (
  <div className="P-pricing P-product-list-pricing">
    <h3 className={details.discounted ? 'P-G-pink' : ''}>
      {details.maxPrice === details.minPrice ?
        <>{details.maxPrice} {currency}</> :
        <>{details.minPrice}-{details.maxPrice} {currency}</>}
    </h3>
  </div>
));

export default Pricing;