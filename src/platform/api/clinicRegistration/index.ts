import Connection from '../../services/connection';
import { IResponse, IPagination } from '../../constants/interfaces';
import { IClinicRegistrationModifyRequestModel, IClinicRegistrationListRequestModel } from './models/request';
import {
  IClinicRegistrationListResponseModel,
  IClinicRegistrationBusyHourResponseModel,
  IClinicRegistrationDoctorBusyHourResponseModel,
} from './models/response';

class ClinicRegistrationController {

  private static controller = 'clinicRegistration';

  public static GetList = (body: IClinicRegistrationListRequestModel): Promise<IResponse<IPagination<IClinicRegistrationListResponseModel>>> => {
    const result = Connection.POST<IClinicRegistrationListRequestModel>({
      body,
      action: 'list',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static GetLaboratoryBusyHours = (serviceIds: number[]): Promise<IResponse<IClinicRegistrationBusyHourResponseModel[]>> => {
    const result = Connection.GET({
      action: 'laboratoryBusyHours',
      query: { serviceIds },
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static GetDoctorBusyHours = (id: number): Promise<IResponse<IClinicRegistrationDoctorBusyHourResponseModel>> => {
    const result = Connection.GET({
      action: `doctorBusyHours/${id}`,
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static Create = (body: IClinicRegistrationModifyRequestModel[]): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IClinicRegistrationModifyRequestModel[]>({
      body,
      action: '',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };
};

export default ClinicRegistrationController;