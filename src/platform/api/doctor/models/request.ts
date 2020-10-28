import { IPagingRequest } from 'platform/constants/interfaces';

export interface IDoctorListRequestModel extends IPagingRequest {
  text: string;
}