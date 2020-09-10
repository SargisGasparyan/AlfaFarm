import * as React from 'react';
import { Link } from 'react-router-dom';

import { getMediaPath, formatDate } from 'platform/services/helper';
import { ITenderListResponseModel } from 'platform/api/tender/models/response';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';

import './style.scss';

interface IProps {
  data: ITenderListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => (
  <div className="P-tenders-list-item">
    <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/cover` }} />
    <div className="P-main-info">
      <h2>{data.title}</h2>
      <p className="P-description">{data.shortDescription}</p>
      <div className="G-flex G-flex-justify-between">
        <h3 className="G-fs-normal">{Settings.translations.end_date}: <span className="G-ml-20">{formatDate(data.endDate)}</span></h3>
        <Link to={ROUTES.TENDERS.DETAILS.replace(':id', data.id)} className="G-main-button">{Settings.translations.read_more}</Link>
      </div>
    </div>
  </div>
));

export default ListItem;