import Connection    from '../services/connection';
import { IResponse } from '../constants/interfaces';
import {IBecomePartner} from 'platform/constants/interfaces';

const controller = 'partner';


class AddressController {
 
  public static SendRequest = (form: IBecomePartner): Promise<IResponse<string>> => {
    const result = Connection.POST<IBecomePartner>({
      body: form,
      action: 'request',
      controller,
    });
    return result;


  };

};

export default AddressController;