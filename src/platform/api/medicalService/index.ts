import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IMedicalServiceListResponseModel } from './models/response';

class MedicalServiceController {

  private static controller = 'medicalService';

  public static GetList = (): Promise<IResponse<IMedicalServiceListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: MedicalServiceController.controller,
    });

    return result;
  };
};

export default MedicalServiceController;