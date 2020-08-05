import * as React from 'react';

import { Shared } from 'modules';
import Settings from 'platform/services/settings';
import { IProductListResponseModel } from 'platform/api/product/models/response';

import './style.scss';
import { getMediaPath } from 'platform/services/helper';

interface IProps {
  data: IProductListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <a className="P-home-discounted-products-list-item">
    {!!data.discount && <Shared.Products.DiscountLabel percent={data.discount} />}
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/contain no-repeat` }} />
    <h3>{data.title}</h3>
    {/* <del className="P-discounted-price">{data.price / 100 * data.discount} AMD</del> */}
    <span className="P-price">{data.price} AMD</span>
    <button className="G-main-button">{Settings.translations.add_to_cart}</button>
  </a>
));

export default ListItem;