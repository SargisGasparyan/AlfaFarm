import * as React from 'react';

import './style.scss';

interface IProps {
  title: string;
  description: string;
};

const ListItem = React.memo(({ title, description }: IProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return <>
    <div className={`P-vacancies-list-item ${open ? 'P-open' : ''}`} onClick={() => setOpen(!open)}>
      <h2 className="P-title">{title}</h2>
      <i className="icon-Group-5504" />
    </div>

    {open && <div className="P-vacancies-list-item-content">
      <p className="P-description">{description}</p>
    </div>}
  </>
});

export default ListItem;