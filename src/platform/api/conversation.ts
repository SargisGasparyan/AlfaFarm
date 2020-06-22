import Connection from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';

const controller = 'conversation';

export enum ConversationMessageMediaTypeEnum {
  Message = 1,
  File,
};

export enum ConversationMessageTypeEnum {
  User = 1,
  Admin,
}

export interface IConversationMessage {
  _id: string;
  createdDt: string;
  filePath: string | null;
  message: string | null;
  messageMediaType: ConversationMessageMediaTypeEnum;
  messageType: ConversationMessageTypeEnum;
};

class ConversationController {

  public static Send = (body: FormData): Promise<IResponse<boolean>> => {
    const result = Connection.POST<FormData>({
      body,
      action: 'send',
      noneJSONBody: true,
      controller,
    });

    return result;
  };

  public static SendWeb = (body: FormData): Promise<IResponse<boolean>> => {
    const result = Connection.POST<FormData>({
      body,
      action: 'sendWeb',
      noneJSONBody: true,
      controller,
    });

    return result;
  };

  public static List = (pageNo: number, limit: number): Promise<IResponse<IPagination<IConversationMessage>>> => {
    const result = Connection.GET({
      action: '',
      noneJSONBody: true,
      controller,
      query: { pageNo, limit },
    });

    return result;
  };

  public static WebGuest = (pageNo: number, limit: number): Promise<IResponse<IPagination<IConversationMessage>>> => {
    const result = Connection.GET({
      action: 'webGuest',
      noneJSONBody: true,
      controller,
      query: { pageNo, limit },
    });

    return result;
  };
};

export default ConversationController;