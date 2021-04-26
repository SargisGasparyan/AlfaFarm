import * as React from 'react';
import { IProductFilterRequestModel } from 'platform/api/product/models/request';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { Range, getTrackBackground } from 'react-range';
import ProductController from 'platform/api/product';
import { IProductPriceRangeResponseModel } from 'platform/api/product/models/response';

import { gray, mainColor } from 'assets/styles/variables.scss';
import { formatPrice } from 'platform/services/helper';
import useSubscriber from 'platform/hooks/use-subcriber';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';


interface IProps {
  body: IProductFilterRequestModel;
  onChange(body: IProductFilterRequestModel): void;
}

const PriceRange = ({ body, onChange }: IProps) => {
  const prevCategoryIdRef = React.useRef<number>();
  const prevProductTextRef = React.useRef<string>();
  const [priceRange, setPriceRange] = React.useState<IProductPriceRangeResponseModel>();
  const [value, setValue] = React.useState<[number, number]>();

  React.useEffect(() => {
    const categoryId = body.categoryIds && body.categoryIds[0];
    const productText = body.productText;

    (categoryId !== prevCategoryIdRef.current || productText !== prevProductTextRef.current) && ProductController.GetPriceRange(categoryId ? { categoryIds: body.categoryIds } : productText ? { productText } : {})
      .then(result => {
        setPriceRange(result.data && result.data.max ? result.data : undefined);
        setValue([body.minPrice || (result.data && result.data.min), body.maxPrice || (result.data && result.data.max)]);
      });

    prevCategoryIdRef.current = categoryId;
    prevProductTextRef.current = productText;
  });

  useSubscriber(DispatcherChannels.ProductFilterClear, () => priceRange && setValue([priceRange.min, priceRange.max]));

  const changePrice = ([minPrice, maxPrice]: [number, number]) => {
    const bodyCopy = { ...body };

    const query = new URLSearchParams(window.location.search);
    query.set('minPrice', `${minPrice}`);
    query.set('maxPrice', `${maxPrice}`);
    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);

    bodyCopy.minPrice = minPrice;
    bodyCopy.maxPrice = maxPrice;
    setValue([bodyCopy.minPrice, bodyCopy.maxPrice]);

    onChange(bodyCopy);
  }

  const changeInput = ([minPrice, maxPrice]: [number, number]) => {
    minPrice = (minPrice || priceRange?.min) as number;
    maxPrice = (maxPrice || priceRange?.max) as number;
    if (minPrice < maxPrice && minPrice >= (priceRange?.min || 0) && maxPrice <= (priceRange?.max || 0)) {
      changePrice([minPrice, maxPrice]);
    }
  }


  return priceRange && value ? <>
    <h2>{Settings.translations.price}</h2>
    <div className="G-flex G-flex-justify-between P-price-range-inputs">
      <input className="G-main-input" min={priceRange.min} max={priceRange.max} type="number" value={body.minPrice || priceRange.min} onChange={(e) => changeInput([+e.target.value, body.maxPrice as number])} />
      <input className="G-main-input" min={priceRange.min} max={priceRange.max} type="number" value={body.maxPrice || priceRange.max} onChange={(e) => changeInput([body.minPrice as number, +e.target.value])} />
    </div>

    <Range
      min={priceRange.min}
      max={priceRange.max}
      values={value}
      onChange={changePrice}
      renderThumb={({ props }) => <div {...props} className="P-range-thumb" />}
      renderTrack={({ props, children }) => (
        <div className="P-products-filter-price-range P-range-track">
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
