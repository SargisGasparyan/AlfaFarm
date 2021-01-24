import * as React from 'react';

import { DropdownNameFunctionType } from './types';

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
  withoutConfirmModal?: boolean;
};

export interface IBodyRequest<Body> extends IRequest { body: Body; };

export interface IDropdownOption<Value> {
  name: string | number | React.ReactNode | HTMLElement | DropdownNameFunctionType;
  value: Value;
};

export interface IGooglePlace {
  formatted_address: string;
  geometry: {
    location: {
      lat(): number;
      lng(): number;
    };
  };
};

export interface IPagingResponse<Data> {
  list: Data[];
  totalCount: number;
  pageCount: number;
};

export interface IFile {
  id: number;
  path: string;
};

export interface ITreeList {
  name: string,
  _id: string,
}


export interface IBecomePartner {
 
  vatid: string,
  name: string,
  email: string,
  message: string,
  phoneNumber: string,
  contactperson: string,
  
}

export interface IPagingRequest {
  pageSize: number;
  pageNumber: number;
};