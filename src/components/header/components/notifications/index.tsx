import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { IPagingResponse } from 'platform/constants/interfaces';
import { INotificationListResponseModel } from 'platform/api/notification/models/response';
import NotificationController from 'platform/api/notification';
import { infinityScrollPageLimit } from 'platform/constants';
import { NotificationTypeEnum } from 'platform/constants/enums';
import { Link } from 'react-router-dom';
import ROUTES from 'platform/constants/routes';
import ClickOutside from 'components/click-outside';
import NotificationImage1 from 'assets/images/sale.svg';
import NotificationImage2 from 'assets/images/not.svg';
import NotificationImage3 from 'assets/images/help.svg';
import Settings from 'platform/services/settings';
import NotificationAnswer from '../notification-answer';
import { scrolledToBottomOfElement } from 'platform/services/helper';

import './style.scss';

interface IState {
  data?: IPagingResponse<INotificationListResponseModel>;
  selectedItem?: INotificationListResponseModel;
  loading: boolean;
};

interface IProps {
  onClose(e?: Event | React.SyntheticEvent): void;
  onSeenChange(all: boolean): void;
}

class Notifications extends HelperPureComponent<IProps, IState> {

  public state: IState = { loading: false };

  private pageNumber = 1;

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const { data } = this.state;
    const body = {
      pageSize: infinityScrollPageLimit,
      pageNumber: this.pageNumber,
    };

    const result = await NotificationController.GetList(body);
    if (data) result.data.list = [...data.list, ...result.data.list];
    this.safeSetState({ data: result.data });
  }

  private clickOnItem = async (e: Event | React.SyntheticEvent, item: INotificationListResponseModel) => {
    if (!item.seen) {
      await NotificationController.Seen(item.id);
      this.props.onSeenChange(false);
    }

    if (item.hasChoice) {
      this.safeSetState({ selectedItem: item });
    } else {
      this.props.onClose(e);
    }
  }

  private closeModal = async () => {
    this.safeSetState({ selectedItem: null });
    this.props.onClose();
  }

  private scrolled = (e: React.SyntheticEvent) => {
    const { loading, data } = this.state;
    if (scrolledToBottomOfElement(e.currentTarget as HTMLElement) && !loading && data && this.pageNumber < data.pageCount) {
      this.pageNumber += 1;
      this.fetchData();
    }
  }

  private markAsRead = async () => {
    await NotificationController.Seen();
    this.props.onSeenChange(true);

    const { data } = this.state;

    if (data) {
      data.list = data.list.map(item => {
        item.seen = true;
        return item;
      });
      
      this.safeSetState({ data: {...data} });
    }
  }

  public render() {
    const { onClose } = this.props;
    const { data, selectedItem } = this.state;

    return (
      <ClickOutside className="P-header-notifications" onClickOutside={!selectedItem ? onClose : () => { console.log('') }}>
        <aside onScroll={this.scrolled}>
          <h6>
            {Settings.translations.notifications}
            <a className="G-clr-orange" onClick={this.markAsRead}>{Settings.translations.mark_as_read}</a>
          </h6>
          {data && data.list.map(item => <this.ListItem key={item.id} item={item} />)}
        </aside>
      
        {this.state.selectedItem ? <NotificationAnswer selectedItem={this.state.selectedItem} onClose={this.closeModal} /> : null}
      </ClickOutside>
    );
  }

  private ListItem = ({ item }: { item: INotificationListResponseModel }) => {
    const isOrder = item.type === NotificationTypeEnum.OrderCanceled || item.type === NotificationTypeEnum.OrderCollected || item.type === NotificationTypeEnum.OrderFinished || item.type === NotificationTypeEnum.OrderStarted;

    if (item.type === NotificationTypeEnum.PrescriptionDeciphered) {
      return (
        <Link
          to={ROUTES.PROFILE.PRESCRIPTIONS.DECIPHERED.replace(':id', item.dataId)}
          className={`P-list-item ${!item.seen ? 'P-unseen' : ''}`}
          onClick={(e) => this.clickOnItem(e, item)}
        >
          <img src={NotificationImage2} alt=""/>
          {item.description}
        </Link>
      );
    } else if (isOrder) {
      return (
        <Link
          to={ROUTES.PROFILE.ORDERS.DETAILS.replace(':id', item.dataId)}
          className={`P-list-item ${!item.seen ? 'P-unseen' : ''}`}
          onClick={(e) => this.clickOnItem(e, item)}
        >
          <img src={NotificationImage2} alt=""/>
          {item.description}
        </Link>
      );
    } else if (item.type === NotificationTypeEnum.NewCustom) {
      return (
        <div
          className={`P-list-item ${!item.seen ? 'P-unseen' : ''}`}
          onClick={(e) => this.clickOnItem(e, item)}
        >
          <img src={item.hasChoice ? NotificationImage3 : NotificationImage1} alt=""/>
          <div>
            <h5>{item.title}</h5>
            <span>{item.description}</span>
          </div>
        </div>
      );
    } else if (item.type === NotificationTypeEnum.NewReminder) {
      return (
        <div
          className={`P-list-item ${!item.seen ? 'P-unseen' : ''}`}
          onClick={(e) => this.clickOnItem(e, item)}
        >
          <img src={NotificationImage2} alt=""/>
          <div>
            <h5>{item.title}</h5>
            <span>{item.description}</span>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Notifications;
