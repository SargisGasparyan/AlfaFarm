import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IPharmacyBranchListResponseModel } from './models/response';

class PharmacyBranchController {
 
  private static controller = 'pharmacyBranch';

  public static GetByRegion = (regionId: number): Promise<IResponse<IPharmacyBranchListResponseModel[]>> => {
    const result = Connection.GET({
      action: `Region/${regionId}`,
      controller: PharmacyBranchController.controller,
    });

    return result;
  };
};

export default PharmacyBranchController;