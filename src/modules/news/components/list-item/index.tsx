import * as React from 'react';

import TestImage from 'assets/images/download_background.png';

import './style.scss';
import Settings from 'platform/services/settings';

interface IProps {
  data: any;
};

const FirstItem = React.memo(({ data }: IProps) => (
  <div className="P-news-list-item">
    <div className="P-image" style={{ background: `url('${TestImage}') center/cover` }} />
    <div className="P-content">
      <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
      <a className="G-orange-color">{Settings.translations.read_more} <i className="icon-Group-5513" /></a>
    </div>
    {data?'':''}
  </div>
));

export default FirstItem;