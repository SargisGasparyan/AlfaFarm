import * as React from 'react';

import { IWholesaleNewsListResponseModel } from 'platform/api/wholesaleNews/models/response';
import { getMediaPath } from 'platform/services/helper';

import './style.scss';
import { Link } from 'react-router-dom';
import ROUTES from 'platform/constants/routes';

interface IProps {
  data: IWholesaleNewsListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <div className="P-wholesale-news-list-item">
    <Link className="P-product" to={ROUTES.PRODUCTS.DETAILS.replace(':id', data.product.id)}>
      <div className="P-image" style={{ background: `url('${getMediaPath(data.product.imagePath)}') center/cover` }} />
      <div className="P-description">
        <h2>{data.product.title}</h2>
        <span>{data.product.unitQuantity} {data.product.unitName}</span>
      </div>
    </Link>
    <p className="P-description">{data.description}</p>
  </div>
));

export default ListItem;