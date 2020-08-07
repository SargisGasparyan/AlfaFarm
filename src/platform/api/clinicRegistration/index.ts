import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IClinicRegistrationListResponseModel } from './models/response';

class ClinicRegistrationController {

  private static controller = 'clinicRegistration';

  public static GetList = (): Promise<IResponse<IClinicRegistrationListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: ClinicRegistrationController.controller,
    });

    return result;
  };
};

export default ClinicRegistrationController;