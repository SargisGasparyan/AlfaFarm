import { IPagingRequest } from 'platform/constants/interfaces';

export interface IClinicRegistrationListRequestModel extends IPagingRequest {
  name?: string;
  doctorName?: string;
};

export interface IClinicRegistrationModifyRequestModel {
  doctorId?: number;
  medicalServiceId: number;
  start: Date;
};