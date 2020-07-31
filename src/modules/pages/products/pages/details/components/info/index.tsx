import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import CountInput from 'components/count-input';
import Settings from 'platform/services/settings';
import { IProductDetailsResponseModel } from 'platform/api/product/models/response';

import './style.scss';

interface IProps {
  data: IProductDetailsResponseModel;
}

class Info extends HelperPureComponent<IProps, {}> {

  public render() {
    const { data } = this.props;

    return (
      <div className="P-product-details-info">
        <h2 className="P-name">
          {data.title}
          <span className="G-orange-color G-auto-margin-left">{data.price} AMD</span>
        </h2>
        <h3 className="P-unit">{data.unitQuantity} {data.unitName}</h3>
        {data.category && <h3 className="P-row">
          {Settings.translations.category}
          <span className="P-value">{data.category.name}</span>
        </h3>}
        {data.brand && <h3 className="P-row">
          {Settings.translations.brand}
          <span className="P-value">{data.brand.name}</span>
        </h3>}
        {data.activeIngredients && <h3 className="P-row">
          {Settings.translations.active_ingredients}
          <span className="P-value">{data.activeIngredients.map(item => item.name).join(', ')}</span>
        </h3>}
        <h3>{Settings.translations.description}</h3>
        <p className="P-description">{data.description}</p>
        <div className="P-cart-actions">
          <CountInput step={1} min={1} onChange={() => { /* */ }} />
          <button className="G-main-button">{Settings.translations.add_to_cart}</button>
        </div>
      </div>
    );
  };
};

export default Info;