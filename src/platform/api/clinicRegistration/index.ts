import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IClinicRegistrationModifyRequestModel, IClinicRegistrationListRequestModel } from './models/request';
import {
  IClinicRegistrationListResponseModel,
  IClinicRegistrationDoctorBusyHourResponseModel,
} from './models/response';
import Settings from "../../services/settings";

class ClinicRegistrationController {

  private static controller = 'clinicRegistration';

  public static GetList = (body: IClinicRegistrationListRequestModel): Promise<IResponse<IPagingResponse<IClinicRegistrationListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static GetLaboratoryBusyHours = (serviceIds: number[]): Promise<IResponse<IClinicRegistrationDoctorBusyHourResponseModel>> => {
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
    const result = Connection.POST({
      body,
      action: '',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };

  public static Cancel = (id: number): Promise<IResponse<any>> => {
    const result = Connection.PUT({
      body: {},
      action: `Cancel/${id}`,
      controller: ClinicRegistrationController.controller,
    }, {
      title: Settings.translations.appointments_cancel,
      text: Settings.translations.appointments_cancel_text
    });

    return result;
  };
};

export default ClinicRegistrationController;
