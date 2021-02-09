import * as React from 'react';

import { IVacancyListResponseModel } from 'platform/api/vacancy/models/response';

import './style.scss';
import Settings from 'platform/services/settings';
import Form from './components/form';

interface IProps {
  data: IVacancyListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return <>
    <div className={`P-vacancies-list-item ${open ? 'P-open' : ''}`} onClick={() => setOpen(!open)}>
      <h2 className="P-title">{data.name}</h2>
      <i className="icon-Group-5504" />
    </div>

    {open && <div className="P-vacancies-list-item-content">
      <p className="P-description" dangerouslySetInnerHTML={{ __html: data.description }} />

      <h2 className="P-apply-online">{Settings.translations.apply_online}</h2>

      <Form data={data} />
    </div>}
  </>
});

export default ListItem;