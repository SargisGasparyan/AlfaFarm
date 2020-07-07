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

const FirstItem = React.memo(({ data }: IProps) => (
  <div className="P-blog-first-item">
    <div className="P-image" style={{ background: `url('${arr[Math.round(Math.random() * 2)]}') center/cover` }} />
    <div className="P-content">
      <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui possimus reiciendis amet sint non ab hic esse id.</h2>
      
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolorum cupiditate nulla officiis inventore error necessitatibus corporis, doloremque ratione fugiat unde repellendus voluptates a magni! Suscipit nobis odit dolor aperiam!
      Fugit iste possimus eaque quidem libero rerum, odit consectetur voluptatum neque vel dolorem ex totam, voluptatibus aspernatur provident, soluta nihil quo ut quas iure quaerat quibusdam eveniet. Natus, illo consequuntur.
      Amet itaque commodi voluptates eligendi suscipit! Assumenda quibusdam quidem consequuntur commodi cum nihil voluptatem dolores! Quos officia accusamus vel rem laborum sit iste quod a. Nesciunt mollitia culpa est deserunt!</p>

      <a className="G-orange-color">{Settings.translations.read_more} <i className="icon-Group-5513" /></a>
    </div>
    {data?'':''}
  </div>
));

export default FirstItem;