import Connection from '../../services/connection';
import { IResponse, IPagingResponse } from '../../constants/interfaces';
import { IPrescriptionListResponseModel } from './models/response';
import { IPrescriptionListRequestModel, IPrescriptionModifyRequestModel } from './models/request';
import { IBasketListResponseModel } from '../basket/models/response';

class PrescriptionController {

  private static controller = 'prescription';

  public static GetList = (body: IPrescriptionListRequestModel): Promise<IResponse<IPagingResponse<IPrescriptionListResponseModel>>> => {
    const result = Connection.POST({
      body,
      action: 'list',
      controller: PrescriptionController.controller,
    });

    return result;
  };

  public static GetAttachedProducts = (id: number): Promise<IResponse<IBasketListResponseModel[]>> => {
    const result = Connection.GET({
      action: `attachedProducts/${id}`,
      controller: PrescriptionController.controller,
    });

    return result;
  };

  public static Create = (body: IPrescriptionModifyRequestModel): Promise<IResponse<number>> => {
    const result = Connection.POST({
      body,
      action: '',
      controller: PrescriptionController.controller,
    });

    return result;
  };

  public static UploadFile = (id: number, body: FormData): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body,
      action: `file/${id}`,
      controller: PrescriptionController.controller,
      noneJSONBody: true,
    });

    return result;
  };

  public static DeleteFile = (id: number, files: number[]): Promise<IResponse<boolean>> => {
    const result = Connection.DELETE({
      body: {},
      query: { files },
      action: `file/${id}`,
      controller: PrescriptionController.controller,
    });

    return result;
  };
};

export default PrescriptionController;