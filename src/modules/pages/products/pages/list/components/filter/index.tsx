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
  brandsOpen: boolean;
  activeIngredientsOpen: boolean;
  body: IProductFilterRequestModel;
};

const priceMin = 0;
const priceMax = 10000;

class Filter extends HelperComponent<IProps, IState> {

  public state: IState = {
    brandsOpen: true,
    activeIngredientsOpen: false,
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
    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);

    body.minPrice = minPrice;
    body.maxPrice = maxPrice;
    this.safeSetState({ body }, onChange);
  }

  private toggleBrandItem = (id: number) => {
    const { body } = this.state;
    const { onChange } = this.props;

    if (body.brandIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = body.brandIds?.indexOf(id);

      if (existingIndex === -1) body.brandIds.push(id);
      else body.brandIds.splice(existingIndex, 1);
      
      query.set('brandIds', body.brandIds.join(','));
      window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      this.safeSetState({ body }, onChange)
    }
  }

  private toggleActiveIngredientItem = (id: number) => {
    const { body } = this.state;
    const { onChange } = this.props;

    if (body.activeIngredientIds) {
      const query = new URLSearchParams(window.location.search);
      const existingIndex = body.activeIngredientIds?.indexOf(id);

      if (existingIndex === -1) body.activeIngredientIds.push(id);
      else body.activeIngredientIds.splice(existingIndex, 1);
      
      query.set('activeIngredientIds', body.activeIngredientIds.join(','));
      window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
      this.safeSetState({ body }, onChange)
    }
  }

  private toggleBrands = () => {
    const { brandsOpen }  = this.state;
    this.safeSetState({ brandsOpen: !brandsOpen });
  }

  private toggleActiveIngredients = () => {
    const { activeIngredientsOpen }  = this.state;
    this.safeSetState({ activeIngredientsOpen: !activeIngredientsOpen });
  }

  public render() {
    const { body, brandsOpen, activeIngredientsOpen } = this.state;
    const priceValues = [body.minPrice || 0, body.maxPrice || 0]

    return (
      <div className="P-products-filter">
        <h2>{Settings.translations.price} ({body.minPrice}-{body.maxPrice}) AMD</h2>

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

        <h2 className="P-row-title" onClick={this.toggleBrands}>
          {Settings.translations.brand}
          <span className="G-orange-color">{brandsOpen ? '-' : '+'}</span>
        </h2>
        
        {brandsOpen && Storage.brands.map(item => <div className="P-checkbox-row" key={item.id}>
          <CheckBox checked={body.brandIds?.includes(item.id)} onChange={() => this.toggleBrandItem(item.id)} />
          <span className="P-name">{item.name}</span>
        </div>)}

        <h2 className="P-row-title" onClick={this.toggleActiveIngredients}>
          {Settings.translations.active_ingredient}
          <span className="G-orange-color">{activeIngredientsOpen ? '-' : '+'}</span>
        </h2>

        {activeIngredientsOpen && Storage.activeIngredients.map(item => <div className="P-checkbox-row" key={item.id}>
          <CheckBox checked={body.activeIngredientIds?.includes(item.id)} onChange={() => this.toggleActiveIngredientItem(item.id)} />
          <span className="P-name">{item.name}</span>
        </div>)}
      </div>
    );
  }
}

export default Filter;