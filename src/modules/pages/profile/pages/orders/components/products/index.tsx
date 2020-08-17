import * as React from 'react';

import { IOrderDetailsBasketItemResponseModel } from 'platform/api/order/models/response';
import Table from 'components/table';
import Settings from 'platform/services/settings';
import { getMediaPath } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';

import './style.scss';


interface IProps {
  list: IOrderDetailsBasketItemResponseModel[];
};



const Products = React.memo(({ list }: IProps) => {
  const columnConfig = [
    {
      name: Settings.translations.product,
      cell: (row: IOrderDetailsBasketItemResponseModel) => <>
        <div
          className="P-image G-square-image-block"
          style={{ background: `url('${getMediaPath(row.productPhoto)}') center/cover` }}
        />

        <div className="P-main-info">
          <h2>{row.productTitle}</h2>
          <span>{row.unitQuantity} {row.unitName}</span>
        </div>
      </>,
    },
    {
      name: Settings.translations.quantity,
      cell: (row: IOrderDetailsBasketItemResponseModel) => <h3 className="G-fs-24">{row.productQuantity}</h3>,
    },
    {
      name: Settings.translations.price,
      style: { minWidth: 150, maxWidth: 150 },
      cell: (row: IOrderDetailsBasketItemResponseModel) => <h3 className="G-fs-24">{row.price} AMD</h3>,
    },
  ];

  return <Table<IOrderDetailsBasketItemResponseModel>
    className="P-order-products"
    columnConfig={columnConfig}
    data={list}
    redirectUrl={row => ROUTES.PRODUCTS.DETAILS.replace(':id', row.productId)}
  />;
});

export default Products