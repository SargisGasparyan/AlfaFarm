import * as React from 'react';

import { ITenderDetailsResponseModel } from 'platform/api/tender/models/response';
import { getMediaPath } from 'platform/services/helper';

import './style.scss';


interface IProps {
  data: ITenderDetailsResponseModel;
}

const Images = React.memo(({ data }: IProps) => (
  <div className="P-tender-details-images">
    <div className="P-current-image" style={{ background: `url("${getMediaPath(data.imagePath)}") center/cover` }} />
  </div>
));

export default Images;