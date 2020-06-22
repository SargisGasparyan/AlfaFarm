import Settings from '../services/settings';
import Connection from '../services/connection';
import { IResponse } from '../constants/interfaces';

export interface IMU {
  name: string;
  _id: string;
};

const controller = 'mu';

class MUController {

  public static List = (): Promise<IResponse<IMU[]>> => {
    const result = Connection.GET({
      action: '',
      query: { language: Settings.language },
      controller,
    });

    return result;
  };
};

export default MUController;