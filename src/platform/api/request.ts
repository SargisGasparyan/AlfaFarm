import Connection from '../services/connection';
import { IResponse, IPagination } from '../constants/interfaces';
import Settings from '../services/settings';
import { IProductListItem } from './product';
import { IProfile } from './user';
import { IContactInfoModel } from '../constants/interfaces';

const controller = 'request';

export enum RequestTypeEnum {
  Active = 1,
  Completed,
};

export enum RequestSendTypeEnum {
  Form = 1,
  OnlyFiles,
};

export enum RequestStatusEnum {
  Draft = 1,
  Pending,
  Succeed,
  Failed,
  Canceled,
};

export enum RequestPackStatusEnum {
  Active = 1,
  Finished,
  Canceled,
};

export interface IRequestAddModel {
  category?: string;
  iNeed: string;
  mu?: string;
  count: number;
  description: string;
  doc: File[],
  audio: File[],
  photo: File[],
  video: File[],
};

export interface IRequest extends IProfile {
  _id: string;
  nid: number;
  createdDt: string;
  fileCount: number;
  requestCount: number;
  status: RequestPackStatusEnum;
  sender: string;
  type: RequestSendTypeEnum;
  requestList: IRequestDetailsItem[];
};

export enum RequestFileTypeEnum {
  Document = 1,
  Audio,
  Photo,
  Video,
};

export interface IRequestDetailsItem {
  _id: string;
  category?: string;
  count?: number;
  description?: string;
  files: Array<{
    _id: string;
    originalName: string;
    path: string;
    type: RequestFileTypeEnum;
  }>;
  iNeed?: string;
  measurementUnit?: string;
  products: IProductListItem[];
  status: RequestStatusEnum;
  type: RequestSendTypeEnum;
};

export interface IRequestDetachRequestModel {
  requestId: string;
  fileId: string;
};

export interface IAddFilesResponseModel { _id: string; };

class RequestController {

  public static Add = (form: FormData): Promise<IResponse<string>> => {
    const result = Connection.POST<FormData>({
      body: form,
      action: 'add',
      controller,
      noneJSONBody: true,
    });

    return result;
  };

  public static AddFiles = (form: FormData): Promise<IResponse<IAddFilesResponseModel>> => {
    const result = Connection.POST<FormData>({
      body: form,
      action: 'add',
      controller,
      noneJSONBody: true,
    });

    return result;
  };

  public static Send = (form: IContactInfoModel): Promise<IResponse<string>> => {
    const result = Connection.POST<IContactInfoModel>({
      body: form,
      action: 'send',
      controller,
    });

    return result;
  };

  public static List = (pageNo: number, limit: number, status: RequestTypeEnum): Promise<IResponse<IPagination<IRequest>>> => {
    const result = Connection.GET({
      action: 'pack',
      query: { language: Settings.language, pageNo, limit, status },
      controller,
    });

    return result;
  };

  public static Details = (id: string): Promise<IResponse<IRequest>> => {
    const result = Connection.GET({
      action: 'packDetails',
      query: { id, language: Settings.language },
      controller,
    });

    return result;
  };

  public static Cancel = (id: string): Promise<IResponse<null>> => {
    const result = Connection.PUT({
      body: { id },
      action: 'pack/cancel',
      controller,
    });

    return result;
  };

};



export default RequestController;