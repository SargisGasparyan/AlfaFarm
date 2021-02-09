import Connection from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IVacancyListResponseModel } from './models/response';
import { IVacancyCareerRequestModel } from './models/request';

class VacancyController {
  private static controller = 'vacancy';

  public static GetList = (): Promise<IResponse<IVacancyListResponseModel[]>> => {
    const result = Connection.GET({
      action: '',
      controller: VacancyController.controller,
    });

    return result;
  };

  public static ApplyCareer = (body: IVacancyCareerRequestModel): Promise<IResponse<number>> => {
    const result = Connection.POST({
      body,
      action: 'career',
      controller: VacancyController.controller,
    });

    return result;
  };

  public static UploadCV = (id: number, body: FormData): Promise<IResponse<boolean>> => {
    const result = Connection.POST({
      body,
      action: `careerCV/${id}`,
      controller: VacancyController.controller,
      noneJSONBody: true,
    });

    return result;
  };
};

export default VacancyController;