import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';
import CountInput from 'components/count-input';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import { getMediaPath } from 'platform/services/helper';
import DiscountLabel from '../discount-label';

import './style.scss';


interface IProps {
  data: IProductListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <Link className="P-products-list-item" to={ROUTES.PRODUCTS.DETAILS.replace(':id', data.id)}>
    {data.discount && <DiscountLabel percent={data.discount} />}
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/contain no-repeat` }} />
    <i className={`P-favorite ${Math.random() > 0.5 ? 'icon-Group-5518' : 'P-active icon-Group-5520'}`} />
    <h3>{data.title}</h3>
    
    <div className="P-price">
      <span>{data.price} AMD</span>
      <CountInput step={1} min={1} onChange={() => { /**/ }} />
    </div>
    <button className="G-main-button">{Settings.translations.add}</button>
  </Link>
));

export default ListItem;