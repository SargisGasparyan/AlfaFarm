import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { ICityListResponseModel, IRegionListResponseModel } from './models/response';

class PlaceController {
 
  private static controller = 'place';

  public static GetCities = (): Promise<IResponse<ICityListResponseModel[]>> => {
    const result = Connection.GET({
      action: 'city',
      controller: PlaceController.controller,
    });

    return result;
  };

  public static GetRegions = (cityId: number): Promise<IResponse<IRegionListResponseModel[]>> => {
    const result = Connection.GET({
      action: 'region',
      query: { cityId },
      controller: PlaceController.controller,
    });

    return result;
  };
};

export default PlaceController;