import { PrescriptionStatusEnum } from '../constants/enums';

export interface IPrescriptionListResponseModel {
  id: number;
  name: string;
  doctorName: string;
  medicalInstitution: number;
  status: PrescriptionStatusEnum;
  createdDate: number;
};