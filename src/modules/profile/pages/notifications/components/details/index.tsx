import * as React from 'react';

import Modal from 'components/modal';
import { INotification } from 'platform/api/notification';
import { formatDate } from 'platform/services/helper';

import './style.scss';

interface IProps {
  data: INotification;
  onClose(): void;
}

const Details = React.memo(({ data, onClose }: IProps) => (
  <Modal onClose={onClose} className="P-notification-details P-modal-static">
    {data.image && <div className="P-image">
      <div style={{ background: `url("${data.image}") center/cover` }} />
    </div>}
    <h3>{data.title}</h3>
    <p>{data.body}</p>
    <h5>{formatDate(data.createdDt)}</h5>
  </Modal>
));

export default Details;