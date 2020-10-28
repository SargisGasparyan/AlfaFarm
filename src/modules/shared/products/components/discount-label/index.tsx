import * as React from 'react';

import './style.scss';

interface IProps {
  percent: number;
};

const DiscountLabel = React.memo(({ percent }: IProps) => (
  <div className="P-products-discount-label">
    <span>{percent}%</span>
  </div>
));

export default DiscountLabel;