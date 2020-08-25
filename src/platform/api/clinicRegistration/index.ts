import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IClinicRegistrationListResponseModel, IClinicRegistrationBusyHourResponseModel, IClinicRegistrationDoctorBusyHourResponseModel } from './models/response';
import { IClinicRegistrationCreateRequestModel } from './models/request';

class ClinicRegistrationController {

  private static controller = 'clinicRegistration';

  public static GetList = (): Promise<IResponse<IClinicRegistrationListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static GetLaboratoryBusyHours = (serviceIds: number[]): Promise<IResponse<IClinicRegistrationBusyHourResponseModel[]>> => {
    const result = Connection.GET({
      action: 'LaboratoryBusyHours',
      query: { serviceIds },
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static GetDoctorBusyHours = (id: number): Promise<IResponse<IClinicRegistrationDoctorBusyHourResponseModel>> => {
    const result = Connection.GET({
      action: `DoctorBusyHours/${id}`,
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static Create = (body: IClinicRegistrationCreateRequestModel[]): Promise<IResponse<boolean>> => {
    const result = Connection.POST<IClinicRegistrationCreateRequestModel[]>({
      body,
      action: '',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };
};

export default ClinicRegistrationController;