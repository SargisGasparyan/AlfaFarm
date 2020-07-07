import * as React from 'react';

import Settings from 'platform/services/settings';

import TestImage from 'assets/images/test_background.jpg';
import TestImage1 from 'assets/images/test_background_1.jpg';
import TestImage2 from 'assets/images/test_background_2.jpg';

import './style.scss';

const arr = [TestImage, TestImage1, TestImage2];

interface IProps {
  data: any;
};

const ListItem = React.memo(({ data }: IProps) => (
  <div className="P-blog-list-item">
    <div className="P-image" style={{ background: `url('${arr[Math.round(Math.random() * 2)]}') center/cover` }} />
    <div className="P-content">
      <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
      <a className="G-orange-color">{Settings.translations.read_more} <i className="icon-Group-5513" /></a>
    </div>
    {data?'':''}
  </div>
));

export default ListItem;