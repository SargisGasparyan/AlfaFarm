import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import { INewListResponseModel } from 'platform/api/news/models/response';
import { getMediaPath } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';

import './style.scss';

interface IProps {
  data: INewListResponseModel;
};

const FirstItem = React.memo(({ data }: IProps) => (
  <div className="P-news-first-item">
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/cover` }} />
    <div className="P-content">
      <h2>{data.title}</h2>
      
      <p>{data.shortDescription}</p>

      <Link
        to={ROUTES.NEWS.DETAILS.replace(':id', data.id)}
        className="G-normal-link G-orange-color"
      >{Settings.translations.read_more} <i className="icon-Group-5513" /></Link>
    </div>
  </div>
));

export default FirstItem;