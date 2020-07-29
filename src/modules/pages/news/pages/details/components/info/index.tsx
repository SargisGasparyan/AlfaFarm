import * as React from 'react';

import { INewsDetailsResponseModel } from 'platform/api/news/models/response';

import './style.scss';

interface IProps {
  data: INewsDetailsResponseModel;
}

const Info = React.memo(({ data }: IProps) => (
  <div className="P-news-details-info">
    <h2 className="P-name">{data.title}</h2>
    <p className="P-description">{data.shortDescription}</p>
  </div>
));

export default Info;