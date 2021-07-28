import * as React from 'react';
import { Link } from 'react-router-dom';
import Settings from 'platform/services/settings';
import Moment from 'react-moment';

import { INewsListResponseModel } from 'platform/api/news/models/response';
import {getMediaPath, truncateText} from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';

import './style.scss';

interface IProps {
  data: INewsListResponseModel;
};

// const momentDate = moment("2014-09-15 09:00:00");

const ListItem = React.memo(({ data }: IProps) => (
  <div className="P-news-list-item">
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/cover` }} />
      <div className="P-content">
          <h4 className="dmy"><Moment format="DD MMMM YYYY">{data.createdDate.split("T").join(" ").split(".")[0]}</Moment></h4>
          <h3>{truncateText(data.title, 45)}</h3>
        <Link
        to={ROUTES.NEWS.DETAILS.replace(':id', data.id)}
        className="G-clr-orange G-normal-link"
      >{Settings.translations.see_more} <i className="icon-Group-5513" /></Link>
    </div>
  </div>
));

export default ListItem;
