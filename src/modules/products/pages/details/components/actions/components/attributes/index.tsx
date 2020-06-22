import * as React from 'react';

import {
  ProductAttributeTypeEnum,
  IProduct,
  IProductAttributeOption,
  IProductChosenAttribute,
} from 'platform/api/product';
import ColorAttributes from './components/color-attributes';
import UsualAttributes from './components/usual-attributes';

import './style.scss';

interface IProps {
  submited: boolean;
  details: IProduct;
  toggleAttribute(id: string, option: IProductAttributeOption, first?: boolean): void;
  chosen: IProductChosenAttribute[];
};

const Attributes = React.memo(({ submited, details, toggleAttribute, chosen }: IProps) => {
  const attributeKeys = Object.keys(details.attributes || {});

  return attributeKeys.length ? <div className="P-attributes">
    {attributeKeys.map((item, index) => {

      if (!details.attributes) return null;
      const attribute = details.attributes[item];
      const chosenAttribute = chosen.find(elem => elem.attribute === item);

      return <div key={item}>
        <h3 className={submited && !chosenAttribute ? 'P-G-invalid-text' : ''}>{attribute.name}: {chosenAttribute ? chosenAttribute.displayName : ''}</h3>
        {attribute.type === ProductAttributeTypeEnum.Usual 
        ? 
        <UsualAttributes
          id={item}
          first={!index}
          chosen={chosen}
          attribute={attribute}
          toggleAttribute={toggleAttribute}
        /> : <ColorAttributes
          id={item}
          first={!index}
          chosen={chosen}
          attribute={attribute}
          toggleAttribute={toggleAttribute}
        />
        }
      </div>
    })}
  </div> : null;
});

export default Attributes;