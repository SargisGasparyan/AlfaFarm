import Connection from '../../services/connection';
import { IResponse, IPagingRequest, IPagingResponse } from '../../constants/interfaces';
import { IDoctorListResponseModel } from './models/response';
import { IDoctorListRequestModel } from './models/request';

class DoctorController {

  private static controller = 'doctor';

  public static GetList = (body: IDoctorListRequestModel): Promise<IResponse<IPagingResponse<IDoctorListResponseModel>>> => {
    const result = Connection.POST<IDoctorListRequestModel>({
      body,
      action: 'list',
      controller: DoctorController.controller,
    });

    return result;
  };
};

export default DoctorController;