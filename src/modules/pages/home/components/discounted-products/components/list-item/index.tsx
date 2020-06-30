import * as React from 'react';

import Settings from 'platform/services/settings';

import PhotoImage from 'assets/images/photo.png';
import './style.scss';

interface IProps {
  data: any;
};

const ListItem = React.memo(({ data }: IProps) => (
  <a className="P-home-discounted-products-list-item">
    <div className="P-image" style={{ background: `url('${PhotoImage}') center/contain no-repeat` }} />
    <h3>Վիլակտ Մաշկի քսոււք</h3>
    <del className="P-discounted-price">5,500 AMD</del>
    <span className="P-price">2,500 AMD</span>
    <button className="G-main-button">{Settings.translations.add_to_cart}</button>
    {data?'':''}
  </a>
));

export default ListItem;