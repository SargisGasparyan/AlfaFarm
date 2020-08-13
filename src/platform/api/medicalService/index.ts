import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IMedicalServicePriceListResponseModel, IMedicalServiceListResponseModel } from './models/response';

class MedicalServiceController {

  private static controller = 'medicalService';

  public static GetPriceList = (text?: string): Promise<IResponse<IMedicalServicePriceListResponseModel[]>> => {
    const result = Connection.GET({
      action: 'priceList',
      query: { text },
      controller: MedicalServiceController.controller,
    });

    return result;
  };

  public static GetLaboratoryList = (): Promise<IResponse<IMedicalServiceListResponseModel[]>> => {
    const result = Connection.GET({
      action: 'laboratoryList',
      controller: MedicalServiceController.controller,
    });

    return result;
  };
};

export default MedicalServiceController;