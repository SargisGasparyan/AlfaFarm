import * as React from 'react';

import EmptyState from 'components/empty-state';
import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byPrivateRoute } from 'platform/decorators/routes';
import { paginationPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import NotificationController, { INotification } from 'platform/api/notification';
import HelperComponent from 'platform/classes/helper-component';
import Details from './components/details';

import * as EmptyNotificationsJSON from 'assets/animations/empty_notifications.json';

import './style.scss';

interface IState {
  loading: boolean;
  data: INotification[] | null;
  activeDetails: INotification | null;
};

@byPrivateRoute(ROUTES.PROFILE.NOTIFICATIONS)
class Notifications extends HelperComponent<{}, IState> {

  public state: IState ={
    loading: false,
    data: null,
    activeDetails: null,
  };

  private pageNo = 1;
  private lastPage = false;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const result = await NotificationController.List(this.pageNo, paginationPageLimit);
      const data = this.state.data || [];
      this.safeSetState({ data: overwrite ? result.data.itemList : [...data, ...result.data.itemList], loading: false });
      this.lastPage = !result.data.pagesLeft;
    } else this.safeSetState({ loading: false });
  });

  private scroll = () => {
    const { loading } = this.state;
    
    if (!this.lastPage && scrolledToBottom() && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  private delete = async (e: React.SyntheticEvent, id: string) => {
    e.stopPropagation();
    const result = await NotificationController.Delete(id);
    
    if (result.success) {
      this.pageNo = 1;
      this.lastPage = false;
      this.safeSetState({ data: null }, () => this.fetchData(true));
    }
  }

  private NotificationItem = ({ notification }: { notification: INotification }) => (
    <div className="P-notification-item" onClick={() => this.safeSetState({ activeDetails: notification })}>
      {notification.image && <div className="P-image">
        <div style={{ background: `url("${notification.image}") center/cover` }} />
      </div>}
      <h3>
        {notification.title}&nbsp;
        {notification.body}
        <div className="P-item-actions">
          <span className="G-pink" onClick={e => this.delete(e, notification._id)}><i className="icon-delete" /></span>
        </div>
      </h3>
    </div>
  );

  private closeDetails = () => this.safeSetState({ activeDetails: null });

  public render() {
    const { data, activeDetails } = this.state;

    return (
      <section className="G-page P-notifications-page">
        <h1 className="G-page-title">{Settings.translations.notifications}</h1>
        {data ? <div className="P-notifications-content G-page-min-height">
          {!!data.length ? data.map(item => <this.NotificationItem key={item._id} notification={item} />) : <EmptyState
            text={Settings.translations.no_notifications}
            animation={EmptyNotificationsJSON}
          />}
          {activeDetails && <Details data={activeDetails} onClose={this.closeDetails} />}
        </div> : <PageLoader />}
      </section>
    );
  }
};

export default Notifications;