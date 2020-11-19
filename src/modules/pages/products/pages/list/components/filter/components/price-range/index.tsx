

import * as React from 'react';
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { Range, getTrackBackground } from 'react-range';
import ProductController from 'platform/api/product';
import { IProductPriceRangeResponseModel } from 'platform/api/product/models/response';

import { gray, mainColor } from 'assets/styles/variables.scss';

interface IProps {
  body: IProductFilterRequestModel;
  onChange(body: IProductFilterRequestModel): void;
}

const PriceRange = ({ body, onChange }: IProps) => {
  const prevCategoryIdRef = React.useRef<number>();
  const [priceRange, setPriceRange] = React.useState<IProductPriceRangeResponseModel>();
  const [value, setValue] = React.useState<[number, number]>();

  React.useEffect(() => {
    const categoryId = body.categoryIds && body.categoryIds[0];

    categoryId !== prevCategoryIdRef.current && ProductController.GetPriceRange(categoryId ? { categoryIds: body.categoryIds } : {})
      .then(result => {
        setPriceRange(result.data.max ? result.data : undefined);
        setValue([body.minPrice || result.data.min, body.maxPrice || result.data.max]);
      });

    prevCategoryIdRef.current = categoryId;
  });

  const changePrice = ([minPrice, maxPrice]: [number, number]) => {
    const bodyCopy = {...body};

    const query = new URLSearchParams(window.location.search);
    query.set('minPrice', `${minPrice}`);
    query.set('maxPrice', `${maxPrice}`);
    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);

    bodyCopy.minPrice = minPrice;
    bodyCopy.maxPrice = maxPrice;
    setValue([bodyCopy.minPrice, bodyCopy.maxPrice]);
    
    onChange(body);
  }


  return priceRange && value ? <>
    <h2>{Settings.translations.price} ({value[0]}-{value[1]}) &#1423;</h2>

    <Range
      min={priceRange.min}
      max={priceRange.max}
      values={value}
      onChange={changePrice}
      renderThumb={({ props }) => <div {...props} className="P-range-thumb" />}
      renderTrack={({ props, children }) => (
        <div className="P-range-track">
          <div
            className="P-range-track-active"
            ref={props.ref}
            style={{
              background: getTrackBackground({
                values: value,
                colors: [gray, mainColor, gray],
                min: priceRange.min,
                max: priceRange.max,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
    />
  </> : null;
};

export default PriceRange;