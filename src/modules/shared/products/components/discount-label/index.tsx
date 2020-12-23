import { PromotionTypeEnum } from 'platform/constants/enums';
import * as React from 'react';
import discount from 'assets/images/discount_label.png';
import bonus from 'assets/images/bonus_label.svg';
import './style.scss';

interface IProps {
  percent: number;
  type?: PromotionTypeEnum;
};

const DiscountLabel = React.memo(({ percent, type }: IProps) => (
  <div className="P-products-discount-label" style={{ background: `url(${type === PromotionTypeEnum.Discount ? discount : bonus}) left/contain no-repeat` }}>
    <span>{type === PromotionTypeEnum.Discount ? '-' : ''}{percent}%</span>
  </div>
));

export default DiscountLabel;