import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { INotificationListRequestModel } from './models/request';
import { INotificationAnswerResponseModel, INotificationListResponseModel } from './models/response';
import { NotificationChoiceTypeEnum } from 'platform/constants/enums';

class NotificationController {

  private static controller = 'notification';

  public static GetList = (body: INotificationListRequestModel): Promise<IResponse<IPagingResponse<INotificationListResponseModel>>> => {
    const result = Connection.POST({
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

  public static GetCustom = (id: number): Promise<IResponse<INotificationAnswerResponseModel>> => {
    const result = Connection.GET({
      action: `Custom/${id}`,
      controller: NotificationController.controller,
    });

    return result;
  };

  public static Answer = (id: number, type: NotificationChoiceTypeEnum): Promise<IResponse<INotificationAnswerResponseModel>> => {
    const result = Connection.POST({
      action: `AnswerCustom/${id}`,
      controller: NotificationController.controller,
      body: { choiceType: type }
    });

    return result;
  };

  public static Seen = (id?: number): Promise<IResponse<number>> => {
    const result = Connection.POST({
      action: 'seen',
      controller: NotificationController.controller,
      query: { id },
      body: {},
    });

    return result;
  };
};

export default NotificationController;