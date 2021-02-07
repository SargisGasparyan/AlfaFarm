import * as React from 'react';

import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  data: IProductDetailsResponseModel;
}

class Bundles extends HelperComponent<IProps, {}> {

  private get list() {
    const { data } = this.props;
    if (!data.promotion.availablePromotions) return [];
    return data.promotion.availablePromotions.groupProductPromotions || [];
  }

  public render() {

    return (
      <div className="P-product-details-bundles">
        {this.list.map(item => <div key={item.bundleId}>
          <h4></h4>
        </div>)}
      </div>
    );
  };
};

export default Bundles;
