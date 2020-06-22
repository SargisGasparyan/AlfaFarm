import * as React from 'react';
import Slider from 'react-slick';

import { IFilterCategory } from 'platform/api/category';
import { IProductListFilter } from 'platform/api/product';
import { BackArrow, NextArrow } from 'components/slider-arrows';

import './style.scss';

interface IProps {
  list: IFilterCategory[];
  onChange(filter: IProductListFilter): void;
};


const Categories = React.memo(({ list, onChange }: IProps) => {

  const change = (item: IFilterCategory) => {
    const filter = { category: item._id };
    onChange(filter);
  }

  return (
    <div className="P-product-list-categories">
      <div className="P-content">
        <Slider
          className="variable-width"
          infinite={true}
          variableWidth={true}
          draggable={false}
          prevArrow={<BackArrow />}
          nextArrow={<NextArrow />}
        >
          {list.map(item => !!item.imageList.length && <div key={item._id} onClick={() => change(item)} className="P-category">
            {!!item.imageList.length && <div className="P-images">
              {item.imageList.map((image, index) => <div key={index}>
                <div style={{ background: `url(${image}) white center/contain no-repeat` }} />
              </div>)}
            </div>}
            {item.name}
          </div>)}
        </Slider>
      </div>
    </div>
  )
});

export default Categories;