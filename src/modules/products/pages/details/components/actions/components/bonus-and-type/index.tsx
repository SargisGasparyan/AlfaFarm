import * as React from 'react';

import { IProduct } from 'platform/api/product';
import Settings from 'platform/services/settings';
import { currency } from 'platform/constants';

import './style.scss';

interface IProps { details: IProduct; }

const BonusAndType = React.memo(({ details }: IProps) => {
  const bonusPrice = <>{details.bonusAmount || details.minBonusAmount} {currency}</>;
  const bonusPriceRange = <>{details.minBonusAmount}-{details.maxBonusAmount} {Settings.translations.i_bonus}</>;

  return details.bonus ? <div className="P-bonus-and-type">
    <span className="P-G-info-span">i</span>
    <h4>{details.bonus}% / {details.minBonusAmount === details.maxBonusAmount || details.bonusAmount ? bonusPrice : bonusPriceRange}</h4>
    
    {!!details.preparingDayCount && <>
      <i className="icon-products P-preparing-days-icon" />
      <h4>{details.preparingDayCount} {Settings.translations.days}</h4>
    </>}
  </div> : null;
});

export default BonusAndType;