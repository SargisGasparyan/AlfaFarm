import * as React from 'react';

import { IProduct, IProductPricing } from 'platform/api/product';
import Settings from 'platform/services/settings';

import './style.scss';

interface IProps { details: IProduct; }

const AdditionalSales = React.memo(({ details }: IProps) => {
  const getAdditionalSaleLabel = (sale: IProductPricing) => {
    const text = Settings.translations.additional_sale_label(sale.fromCount);
    const bonus = `${sale.bonus}% ${Settings.translations.i_bonus}`;
    const discount = `${sale.discount}% ${Settings.translations.off}`;

    if (sale.discount && sale.bonus) return `
      ${text} 
      ${Settings.translations.get} 
      ${discount} 
      ${Settings.translations.and}
      ${bonus}
    `;

    return `
      ${text} 
      ${Settings.translations.get} 
      ${sale.discount ? discount : bonus}
    `;
  }

  return details.pricing && details.pricing.length ? <>
    <div className="P-border-line" />
    <div className="P-additional-sales">
      <h4>{Settings.translations.additional_sales}</h4>
      {details.pricing.map((item, index) => <div key={index}>
        <i className="icon-products" />
        <h3>{getAdditionalSaleLabel(item)}</h3>
      </div>)}
    </div>
  </> : null;
});

export default AdditionalSales;