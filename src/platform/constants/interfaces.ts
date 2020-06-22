import * as React from 'react';

import { DropdownNameFunctionType } from './types';
import { RequestSendTypeEnum } from '../api/request';

export interface IResponse<Data> {
  data: Data;
  message: string;
  success: boolean;
  abort(): void;
  aborted?: boolean;
};

export interface IPaging {
  pageCount: number;
  totalCount: number;
}

export interface IRoute {
  path: string;
  component: React.ComponentClass;
  isPrivate: boolean;
};

export interface IRequest {
  controller: string;
  action: string;
  query?: object;
  noneJSONBody?: boolean;
  dataAsSuccess?: boolean;
  withoutError?: boolean;
  unabortable?: boolean;
};

export interface IBodyRequest<Body extends object> extends IRequest { body: Body; };

export interface IPaginationChange { selected: number };

export interface IDropdownOption<Value> {
  name: string | number | React.ReactNode | HTMLElement | DropdownNameFunctionType;
  value: Value;
};

export interface IGooglePlace {
  geometry: {
    location: {
      lat(): number;
      lng(): number;
    };
  };
};

export interface IPagination<Data> {
  itemList: Data[];
  categoryParentTree : ITreeList[];
  itemCount?: number;
  pagesLeft: boolean;
};

export interface IContactInfoModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  idList?: string[];
  code?: string;
  type?: RequestSendTypeEnum;
};

export interface ITreeList {
  name:string,
  _id:string,
}


export interface IBecomePartner {
 
  vatid: string,
  name: string,
  email: string,
  message: string,
  phoneNumber: string,
  contactperson: string,
  
}