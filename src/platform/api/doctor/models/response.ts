import { IMedicalServiceListResponseModel } from 'platform/api/medicalService/models/response';

export interface IDoctorListResponseModel {
  id: number;
  fullName: string;
  professionId: number;
  professionName: string;
  photoPath: string;
  services: IMedicalServiceListResponseModel[];
};
