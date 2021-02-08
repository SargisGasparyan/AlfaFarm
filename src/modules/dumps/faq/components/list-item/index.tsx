import * as React from 'react';

import { IFAQListResponseModel } from 'platform/api/faq/models/response';

import './style.scss';

interface IProps {
  data: IFAQListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return <>
    <div className={`P-faq-list-item ${open ? 'P-open' : ''}`} onClick={() => setOpen(!open)}>
      <h2 className="P-title">{data.title}</h2>
      <i className="icon-Group-5504" />
    </div>

    {open && <div className="P-faq-list-item-content">
      <p className="P-description" dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>}
  </>
});

export default ListItem;