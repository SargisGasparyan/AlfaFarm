import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IMedicalHistoryListRequestModel } from './models/request';
import { IMedicalServiceListResponseModel } from '../medicalService/models/response';

class MedicalHistoryController {

  private static controller = 'medicalHistory';

  public static GetList = (body: IMedicalHistoryListRequestModel): Promise<IResponse<IPagingResponse<IMedicalServiceListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: MedicalHistoryController.controller,
    });

    return result;
  };
};

export default MedicalHistoryController;