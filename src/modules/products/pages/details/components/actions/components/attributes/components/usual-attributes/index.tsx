import * as React from 'react';

import {
  IProductAttribute,
  IProductChosenAttribute,
  IProductAttributeOption,
} from 'platform/api/product';

import './style.scss';

interface IProps {
  id: string,
  attribute: IProductAttribute,
  chosen: IProductChosenAttribute[],
  first: boolean;
  toggleAttribute(id: string, option: IProductAttributeOption, first?: boolean): void;
}

const UsualAttributes = ({ attribute, id, chosen, toggleAttribute, first }: IProps) => {
  return <>
    {
      attribute.options.map(item => {
        return <span
          key={item._id}
          className={`P-attribute P-usual-attribute 
                              ${chosen.find(elem => elem.option === item._id) ? 'P-choosed' : ''}
                              ${item.disabled && !first ? 'P-disabled' : ''}`}
          onClick={() => toggleAttribute(id, item, first)}
        >
          {item.name}
        </span>
      })}
  </>
};

export default UsualAttributes;