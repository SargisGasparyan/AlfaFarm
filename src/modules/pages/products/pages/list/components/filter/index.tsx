import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import CheckBox from 'rc-checkbox';

import HelperComponent from "platform/classes/helper-component";
import Settings from 'platform/services/settings';

import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Storage from 'platform/services/storage';

import { gray, mainColor } from 'assets/styles/variables.scss';
import './style.scss';

interface IProps {
  onChange(): void;
};

interface IState {
  body: IProductFilterRequestModel;
};

const priceMin = 0;
const priceMax = 10000;

class Filter extends HelperComponent<IProps, IState> {

  public state: IState = {
    body: {
      minPrice: 0,
      maxPrice: 10000,
      brandIds: [],
      activeIngredientIds: [],
    },
  };

  private changePrice = ([minPrice, maxPrice]: [number, number]) => {
    const { body } = this.state;
    const { onChange } = this.props;

    const query = new URLSearchParams(window.location.search);
    query.set('minPrice', `${minPrice}`);
    query.set('maxPrice', `${maxPrice}`);
    window.routerHistory.replace(`${ROUTES.PRODUCTS.LIST}?${query.toString()}`);

    body.minPrice = minPrice;
    body.maxPrice = maxPrice;
    this.safeSetState({ body }, onChange);
  }

  private toggleBrand = (id: number) => {
    const { body } = this.state;
    const { onChange } = this.props;

    if (body.brandIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = body.brandIds?.indexOf(id);

      if (existingIndex === -1) body.brandIds.push(id);
      else body.brandIds.splice(existingIndex, 1);
      
      query.set('brandIds', body.brandIds.join(','));
      window.routerHistory.replace(`${ROUTES.PRODUCTS.LIST}?${query.toString()}`);
      this.safeSetState({ body }, onChange)
    }
  }

  private toggleActiveIngredient = (id: number) => {
    const { body } = this.state;
    const { onChange } = this.props;

    if (body.activeIngredientIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = body.activeIngredientIds?.indexOf(id);

      if (existingIndex === -1) body.activeIngredientIds.push(id);
      else body.activeIngredientIds.splice(existingIndex, 1);
      
      query.set('activeIngredientIds', body.activeIngredientIds.join(','));
      window.routerHistory.replace(`${ROUTES.PRODUCTS.LIST}?${query.toString()}`);
      this.safeSetState({ body }, onChange)
    }
  }

  public render() {
    const { body } = this.state;
    const priceValues = [body.minPrice || 0, body.maxPrice || 0]

    return (
      <div className="P-products-filter">
        <h2>{Settings.translations.price} ({body.minPrice}-{body.maxPrice})</h2>

        <Range
          min={priceMin}
          max={priceMax}
          values={priceValues}
          onChange={this.changePrice}
          renderThumb={({ props }) => <div {...props} className="P-range-thumb" />}
          renderTrack={({ props, children }) => (
            <div className="P-range-track">
              <div
                className="P-range-track-active"
                ref={props.ref}
                style={{
                  alignSelf: 'center',
                  background: getTrackBackground({
                    values: priceValues,
                    colors: [gray, mainColor, gray],
                    min: priceMin,
                    max: priceMax
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
        />

        <h2>{Settings.translations.brand}</h2>
        {Storage.brands.map(item => <div className="P-checkbox-row" key={item.id}>
          <CheckBox checked={body.brandIds?.includes(item.id)} onChange={() => this.toggleBrand(item.id)} />
          <span className="P-name">{item.name}</span>
        </div>)}

        <h2>{Settings.translations.active_ingredient}</h2>
        {Storage.activeIngredients.map(item => <div className="P-checkbox-row" key={item.id}>
          <CheckBox checked={body.activeIngredientIds?.includes(item.id)} onChange={() => this.toggleActiveIngredient(item.id)} />
          <span className="P-name">{item.name}</span>
        </div>)}
      </div>
    );
  }
}

export default Filter;