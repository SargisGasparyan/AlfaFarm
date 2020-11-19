import Connection    from '../../services/connection';
import { IPagingResponse, IResponse } from '../../constants/interfaces';
import { IPharmacyBranchListResponseModel } from './models/response';
import { IPharmacyBranchListRequestModel } from './models/request';

class PharmacyBranchController {
 
  private static controller = 'pharmacyBranch';

  public static GetList = (body: IPharmacyBranchListRequestModel): Promise<IResponse<IPagingResponse<IPharmacyBranchListResponseModel>>> => {
    const result = Connection.POST<IPharmacyBranchListRequestModel>({
      body,
      action: `list`,
      controller: PharmacyBranchController.controller,
    });

    return result;
  };

  public static GetByRegion = (regionId: number): Promise<IResponse<IPharmacyBranchListResponseModel[]>> => {
    const result = Connection.GET({
      action: `region/${regionId}`,
      controller: PharmacyBranchController.controller,
    });

    return result;
  };
};

export default PharmacyBranchController;