import * as React from 'react';

import {
  IProductAttribute,
  IProductChosenAttribute,
  IProductAttributeOption,
  ProductColorTypeEnum,
} from 'platform/api/product';

import MultiColorImage from 'assets/images/about_1.png';

import './style.scss';

interface IProps {
  id: string,
  attribute: IProductAttribute,
  chosen: IProductChosenAttribute[],
  first: boolean;
  toggleAttribute(id: string, option: IProductAttributeOption, first?: boolean): void;
}

const ColorAttributes = ({ attribute, id, chosen, toggleAttribute, first }: IProps) => {
  const getColorContent = (item: IProductAttributeOption) => {
    switch (item.colorType) {
      case ProductColorTypeEnum.OneColor: return item.firstColor || '';
      case ProductColorTypeEnum.TwoColor: return item.firstColor && item.secondColor ? `linear-gradient(-45deg, ${item.firstColor} 50%, ${item.secondColor} 50%)` : '';
      default: return `url(${MultiColorImage}) center/cover`;
    }
  }

  return <>
    {attribute.options.map(item => (
      <span
        key={item._id}
        className={`P-attribute P-color-attribute ${chosen.find(elem => elem.option === item._id) ? 'P-choosed' : ''} ${item.disabled && !first ? 'P-disabled' : ''}`}
        onClick={() => !item.disabled && toggleAttribute(id, item)}
      >
        <span style={{ background: getColorContent(item) }} />
      </span>
    ))}
  </>;
};

export default ColorAttributes;