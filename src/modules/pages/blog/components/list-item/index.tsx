import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import { IBlogListResponseModel } from 'platform/api/blog/models/response';
import {getMediaPath, truncateText} from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';

import './style.scss';


interface IProps {
  data: IBlogListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <div className="P-blog-list-item">
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/contain no-repeat` }} />
    <div className="P-content">
      <h3>{truncateText(data.title, 60)}</h3>
      <Link
        to={ROUTES.BLOG.DETAILS.replace(':id', data.id)}
        className="G-orange-color G-normal-link"
      >{Settings.translations.read_more} <i className="icon-Group-5513" /></Link>
    </div>
  </div>
));

export default ListItem;
