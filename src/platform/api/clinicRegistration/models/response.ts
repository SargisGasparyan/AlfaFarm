export interface IClinicRegistrationListResponseModel {
  id: number;
  doctorName: string;
  serviceName: string;
  servicePrice: number;
  startDate: string;
  endDate: number;
};

export interface IClinicRegistrationBusyHourResponseModel {
  start: string;
  end: string;
};

export interface IClinicRegistrationDoctorBusyHourResponseModel {
  workingHours: [];
  registrations: IClinicRegistrationBusyHourResponseModel[];
};
