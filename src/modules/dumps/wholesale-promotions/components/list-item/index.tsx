import * as React from 'react';

import './style.scss';

interface IProps {
  title: string;
  description: string;
};

const ListItem = React.memo(({ title, description }: IProps) => (
  <div className="P-wholesale-promotions-list-item">
    <h1 className="P-title">{title}</h1>
    <p className="P-description">{description}</p>
  </div>
));

export default ListItem;