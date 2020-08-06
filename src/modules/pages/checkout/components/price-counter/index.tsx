import * as React from 'react';
import Settings from 'platform/services/settings';
import { currency } from 'platform/constants';
import { IPriceCounterData } from '../../constants/interfaces';

import './style.scss';

interface IProps {
  data: IPriceCounterData;
};

const PriceCounter = React.memo(({ data }: IProps) => (
  <div className="P-cart-price-counter">
    <div className="P-counters">
      <h2>{Settings.translations.total}</h2>
      <h3>{Settings.translations.subtotal} <span>{data.subtotal} {currency}</span></h3>
      {!!data.delivery && <h3>{Settings.translations.delivery} <span>{data.delivery} {currency}</span></h3>}      
      {!!data.discount && <h3>{Settings.translations.discount} <span className="G-pink">-{data.discount} {currency}</span></h3>}
      {!!data.promoDiscount && <h3>{Settings.translations.promo_discount} <span className="G-pink">-{data.promoDiscount} {currency}</span></h3>}
      {!!data.points && <h3>{Settings.translations.points} <span className="G-pink">-{data.points}</span></h3>}
      </div>
    <h3 className="P-total">{Settings.translations.total} <span>{data.subtotal + data.delivery - data.points - data.discount - data.promoDiscount} {currency}</span></h3>
  </div>
));

export default PriceCounter;