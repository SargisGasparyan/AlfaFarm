import * as React from 'react';

import Table from 'components/table';
import Settings from 'platform/services/settings';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';

import CountInput from 'components/count-input';
import { Link } from 'react-router-dom';
import { getBasketItemPriceInfo } from 'platform/services/basket';
import PhotoStorage from 'platform/services/photoStorage';

import './style.scss';

interface IProps {
  list: IBasketListResponseModel[];
  onQuantityChange?(index: number, quantity: number): void;
};

const TableList = ({ list, onQuantityChange }: IProps) => {
  const [tableList, setTableList] = React.useState<IBasketListResponseModel[]>([]);

  const columnConfig = [
    {
      name: Settings.translations.product,
      cell: (row: IBasketListResponseModel) => <Link to={ROUTES.PRODUCTS.DETAILS.replace(':id', row.productId)}>
        <div
          className="P-image G-square-image-block"
          style={{ background: `url('${getMediaPath(row.productPhoto)}') center/contain no-repeat` }}
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
      cell: (row: IBasketListResponseModel) => {
        const priceInfo = getBasketItemPriceInfo(row);

        return <>
          <div>{priceInfo.discountedPrice ? <del>{formatPrice(row.totalPrice)}</del> : null}</div>
          <h3 className={`G-fs-24 ${priceInfo.discountedPrice ? 'G-orange-color' : ''}`}>
            {priceInfo.discountedPrice ?
              formatPrice(priceInfo.discountedPrice) :
              formatPrice(priceInfo.price)}
          </h3>
        </>;
      },
    },
  ];

  React.useEffect(() => {
    setTableList(list.map(item => ({...item})));
    Promise.all(list.map(item => PhotoStorage.getURL(item.productPhoto).then(url => ({
      ...item,
      productPhoto: url,
    })))).then(result => setTableList(result));
  }, [JSON.stringify(list)]);

  return <Table<IBasketListResponseModel>
    className="P-products-table-list"
    columnConfig={columnConfig}
    data={tableList}
  />;
};

export default TableList;