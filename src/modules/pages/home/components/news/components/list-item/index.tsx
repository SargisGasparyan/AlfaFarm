import * as React from 'react';

import Settings from 'platform/services/settings';

import TestImage from 'assets/images/test_background.jpg';
import TestImage1 from 'assets/images/test_background_1.jpg';
import TestImage2 from 'assets/images/test_background_2.jpg';

const arr = [TestImage, TestImage1, TestImage2];

import './style.scss';

interface IProps {
  data: any;
};

const ListItem = React.memo(({ data }: IProps) => (
  <a className="P-home-news-list-item">
    <div className="P-image" style={{ background: `url('${arr[Math.floor(Math.random() * 3)]}') center/cover` }} />
    <div className="P-content">
      <h3>Կանանց միամսյակին ընդառաջ «Ալֆա-Ֆարմ»-ը կազմակերպում է ԽԱՂԱՐԿՈՒԹՅՈՒՆ</h3>
      <a className="G-orange-color">{Settings.translations.read_more} <i className="icon-Group-5513" /></a>
    </div>
    {data?'':''}
  </a>
));

export default ListItem;