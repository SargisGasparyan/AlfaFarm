import * as React from 'react';
import { Link } from 'react-router-dom';
import Settings from 'platform/services/settings';
import { INewsListResponseModel } from 'platform/api/news/models/response';
import { getMediaPath } from 'platform/services/helper';
import ROUTES from 'platform/constants/routes';
import './style.scss';
import Moment from "react-moment";


interface IProps {
  data: INewsListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <Link to={ROUTES.NEWS.DETAILS.replace(':id', data.id)} className="P-home-news-list-item">
      <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/cover` }} />
      <h4 className="homedmy">
          <Moment format="DD MMMM YYYY">{data.createdDate.split("T").join(" ").split(".")[0]}</Moment>
      </h4>

      <div className="P-content">
          <h3>{data.title}</h3>
      <Link to={ROUTES.NEWS.DETAILS.replace(':id', data.id)} className="G-clr-orange G-normal-link">
        {Settings.translations.see_more} <i className="icon-Group-5513" />
      </Link>
    </div>
  </Link>
));

export default ListItem;
