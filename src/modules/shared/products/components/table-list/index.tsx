import * as React from 'react';

import Table from 'components/table';
import Settings from 'platform/services/settings';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';

import './style.scss';
import CountInput from 'components/count-input';
import { Link } from 'react-router-dom';
import { PromotionTypeEnum } from 'platform/constants/enums';


interface IProps {
  list: IBasketListResponseModel[];
  onQuantityChange?(index: number, quantity: number): void;
};

const TableList = ({ list, onQuantityChange }: IProps) => {
  const columnConfig = [
    {
      name: Settings.translations.product,
      cell: (row: IBasketListResponseModel) => <Link to={ROUTES.PRODUCTS.DETAILS.replace(':id', row.productId)}>
        <div
          className="P-image G-square-image-block"
          style={{ background: `url('${getMediaPath(row.productPhoto)}') center/cover` }}
        />

        <div className="P-main-info">
          <h2>{row.productTitle}</h2>
          <span>{row.unitQuantity} {row.unitName}</span>
        </div>
      </Link>,
    },
    {
      name: Settings.translations.quantity,
      style: { minWidth: 150, maxWidth: 150 },
      cell: (row: IBasketListResponseModel, index: number) => onQuantityChange ?
      <CountInput
        value={row.productQuantity}
        step={1}
        min={1}
        onChange={value => onQuantityChange(index, value)}
      /> :
      <h3 className="G-fs-24">{row.productQuantity}</h3>,
    },
    {
      name: Settings.translations.price,
      style: { minWidth: 150, maxWidth: 150 },
      cell: (row: IBasketListResponseModel) => 
      <>
      <div>{row.promotion.promotionType === PromotionTypeEnum.Discount && row.promotion.result > 0 ? <del>{formatPrice(row.totalPrice)}</del> : null}</div>
      <h3 className={`G-fs-24 ${row.promotion.promotionType === PromotionTypeEnum.Discount && row.promotion.result ? 'G-orange-color' : ''}`}>
        {row.promotion.promotionType === PromotionTypeEnum.Discount && row.promotion.result ?
          formatPrice(row.promotion.result) :
          formatPrice(row.productQuantity * row.price)}
      </h3>
      </>,
    },
  ];

  return <Table<IBasketListResponseModel>
    className="P-products-table-list"
    columnConfig={columnConfig}
    data={list}
  />;
};

export default TableList;