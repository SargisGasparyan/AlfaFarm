import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { IPagingResponse } from 'platform/constants/interfaces';
import { INotificationListResponseModel } from 'platform/api/notification/models/response';
import NotificationController from 'platform/api/notification';
import { infinityScrollPageLimit } from 'platform/constants';
import { NotificationTypeEnum } from 'platform/constants/enums';
import { Link } from 'react-router-dom';
import ROUTES from 'platform/constants/routes';
import { formatDate } from 'platform/services/helper';

import './style.scss';
import ClickOutside from 'components/click-outside';

interface IState {
  data?: IPagingResponse<INotificationListResponseModel>;
};

interface IProps {
  onClose(e: Event | React.SyntheticEvent): void;
}

class Notifications extends HelperPureComponent<IProps, IState> {

  public state: IState = {};

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const body = {
      pageSize: infinityScrollPageLimit,
      pageNumber: 1,
      onlyUnseen: true,
    };

    const result = await NotificationController.GetList(body);
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { onClose } = this.props;
    const { data } = this.state;

    return (
      <ClickOutside onClickOutside={onClose}>
        <aside className="P-header-notifications">
          {data && data.list.map(item => <this.ListItem key={item.id} item={item} />)}
        </aside>
      </ClickOutside>
    );
  }

  private ListItem = ({ item }: { item: INotificationListResponseModel }) => {
    const { onClose } = this.props;

    const types = {
      [NotificationTypeEnum.PrescriptionDeciphered]: <Link
        to={ROUTES.PROFILE.PRESCRIPTIONS.DECIPHERED.replace(':id', item.dataId)}
        className="P-list-item"
        onClick={onClose}
      >
        {item.description}
        <span>{formatDate(item.createdDate, false)}</span>
      </Link>,
    };

    return types[item.type];
  }  
}

export default Notifications;