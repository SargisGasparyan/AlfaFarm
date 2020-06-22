import Connection    from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';

const controller = 'notification';

export interface INotification {
  _id: string;
  title: string;
  body: string;
  image?: string;
  createdDt: string;
  seen: boolean;
};

class NotificationController {

  public static List = (pageNo: number, limit: number): Promise<IResponse<IPagination<INotification>>> => {
    const result = Connection.GET({
      action: 'list',
      query: { pageNo, limit },
      controller,
    });

    return result;
  };

  public static Delete = (id: string): Promise<IResponse<string>> => {
    const result = Connection.DELETE<object>({
      body: {},
      action: '',
      query: { id },
      controller,
    });

    return result;
  };
};

export default NotificationController;