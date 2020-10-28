import * as React from 'react';

import { ITenderDetailsResponseModel } from 'platform/api/tender/models/response';

import './style.scss';

interface IProps {
  data: ITenderDetailsResponseModel;
}

const Info = React.memo(({ data }: IProps) => (
  <div className="P-tender-details-info">
    <h2 className="P-name">{data.title}</h2>
    <p className="P-description">{data.shortDescription}</p>
  </div>
));

export default Info;