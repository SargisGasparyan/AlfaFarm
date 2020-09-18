import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { INotificationListRequestModel } from './models/request';
import { INotificationListResponseModel, INotificationUnseenListResponseModel } from './models/response';

class NotificationController {

  private static controller = 'notification';

  public static GetList = (body: INotificationListRequestModel): Promise<IResponse<IPagingResponse<INotificationListResponseModel>>> => {
    const result = Connection.POST<INotificationListRequestModel>({
      body,
      action: 'list',
      controller: NotificationController.controller,
    });

    return result;
  };

  public static GetUnseenList = (): Promise<IResponse<number>> => {
    const result = Connection.GET({
      action: 'unseen',
      controller: NotificationController.controller,
    });

    return result;
  };
};

export default NotificationController;