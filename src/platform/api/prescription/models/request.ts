import { IPagingRequest } from 'platform/constants/interfaces';

export interface IPrescriptionListRequestModel extends IPagingRequest {};

export interface IPrescriptionModifyRequestModel {
  name: string;
  description: string;
  doctorName: string;
  medicalInstitution: string;
};