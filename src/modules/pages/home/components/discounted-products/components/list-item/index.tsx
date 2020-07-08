import * as React from 'react';

import { Shared } from 'modules';
import Settings from 'platform/services/settings';

import MedicineImage from 'assets/images/medicine.png';
import MedicineImage1 from 'assets/images/medicine_1.jpg';
import MedicineImage2 from 'assets/images/medicine_2.jpg';
import MedicineImage3 from 'assets/images/medicine_3.jpg';

import './style.scss';

const arr = [MedicineImage, MedicineImage1, MedicineImage2, MedicineImage3];

interface IProps {
  data: any;
};

const ListItem = React.memo(({ data }: IProps) => (
  <a className="P-home-discounted-products-list-item">
    <Shared.Products.DiscountLabel percent={Math.round(Math.random() * 50) + 1} />
    <div className="P-image" style={{ background: `url('${arr[Math.round(Math.random() * 3)]}') center/contain no-repeat` }} />
    <h3>Վիլակտ Մաշկի քսոււք</h3>
    <del className="P-discounted-price">5,500 AMD</del>
    <span className="P-price">2,500 AMD</span>
    <button className="G-main-button">{Settings.translations.add_to_cart}</button>
    {data?'':''}
  </a>
));

export default ListItem;