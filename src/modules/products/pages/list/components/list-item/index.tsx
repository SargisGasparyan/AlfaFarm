import * as React from 'react';

import Settings from 'platform/services/settings';

import PhotoImage from 'assets/images/photo.png';
import './style.scss';
import CountInput from 'components/count-input';

interface IProps {
  data: any;
};

const ListItem = React.memo(({ data }: IProps) => (
  <a className="P-products-list-item">
    <div className="P-image" style={{ background: `url('${PhotoImage}') center/contain no-repeat` }} />
    <i className={`P-favorite ${Math.random() > 0.5 ? 'icon-Group-5518' : 'P-active icon-Group-5520'}`} />
    <h3>Վիլակտ Մաշկի քսոււք</h3>
    
    <div className="P-price">
      <span>2,500 AMD</span>
      <CountInput step={1} min={1} onChange={() => { /**/ }} />
    </div>
    <button className="G-main-button">{Settings.translations.add}</button>
    {data?'':''}
  </a>
));

export default ListItem;