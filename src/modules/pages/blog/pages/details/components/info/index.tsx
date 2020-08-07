import * as React from 'react';

import { IBlogDetailsResponseModel } from 'platform/api/blog/models/response';

import './style.scss';

interface IProps {
  data: IBlogDetailsResponseModel;
}

const Info = React.memo(({ data }: IProps) => (
  <div className="P-blog-details-info">
    <h2 className="P-name">{data.title}</h2>
    <p className="P-description">{data.shortDescription}</p>
  </div>
));

export default Info;