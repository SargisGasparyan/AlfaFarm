import Socket from './socket';
import { getViewEnum } from './helper';
import { NotificationTypeEnum, LanguageEnum } from '../constants/enums';
import Settings from './settings';
import ROUTES from '../constants/routes';

interface INotification {
  _id: string;
  type: NotificationTypeEnum;
  order?: string;
  request?: string;
  wishList?: string;
  translations?: Array<{
    language: LanguageEnum;
    title: string;
    body: string;
  }>;
};

class Notifications {

  private static typeEnum = getViewEnum(NotificationTypeEnum);

  public static init = () => {
    Socket.connection.on('notification', async (payload: INotification) => {
      const label = Notifications.typeEnum[payload.type];
      const notification = Settings.translations.notification_texts[label];
      const translation = payload.translations ? payload.translations.find(item => item.language === Settings.language) : null;
      const milliseconds = Date.now();
      const alertify = await import('alertifyjs');
      
      const text = translation ? `<div pointer="true" id="notification${milliseconds}">
        ${translation && translation.title}<br /><br />
        ${translation && translation.body}
      </div>` : `<div pointer="true" id="notification${milliseconds}">
        ${notification && notification.title}<br /><br />
        ${notification && notification.body}
      </div>`;

      if (payload.type === NotificationTypeEnum.RequestFailed ||
          payload.type === NotificationTypeEnum.OrderCanceled ||
          payload.type === NotificationTypeEnum.WishListDelete ||
          payload.type === NotificationTypeEnum.WishListLeave ||
          payload.type === NotificationTypeEnum.WishListRemoveProduct ||
          payload.type === NotificationTypeEnum.WishListUnapprove ||
          payload.type === NotificationTypeEnum.WishListKick) alertify.error(text);
      else alertify.success(text);

      setTimeout(() => {
        //* Antipattern DOM Manipulation, but very beautiful, don't delete
        const element = document.getElementById(`notification${milliseconds}`);

        if (element) element.onclick = () => {
          if (payload.order) window.routerHistory.push(`${ROUTES.PROFILE.MY_ORDERS}?active=${payload.order}`);
          else if (payload.request) window.routerHistory.push(`${ROUTES.PROFILE.MY_REQUESTS}?active=${payload.request}`);
          else if (payload.wishList) window.routerHistory.push(`${ROUTES.WISH_LIST.MAIN}?active=${payload.wishList}`);
          else if (payload.translations) window.routerHistory.push(ROUTES.PROFILE.NOTIFICATIONS);
        }
      }, 0);
    });
  }
};

export default Notifications;