import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import { INewsListResponseModel } from 'platform/api/news/models/response';
import { getMediaPath } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';

import './style.scss';

interface IProps {
  data: INewsListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <div className="P-news-list-item">
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/cover` }} />
    <div className="P-content">
      <h3>{data.title}</h3>

      <Link
        to={ROUTES.NEWS.DETAILS.replace(':id', data.id)}
        className="G-orange-color G-normal-link"
      >{Settings.translations.read_more} <i className="icon-Group-5513" /></Link>
    </div>
  </div>
));

export default ListItem;