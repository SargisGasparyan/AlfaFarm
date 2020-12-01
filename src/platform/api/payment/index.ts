import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';

class PaymentController {
 
  private static controller = 'payment';

  public static registerCard = (): Promise<IResponse<any>> => {
    const result = Connection.GET({
      action: 'registerCard',
      controller: PaymentController.controller,
    });

    return result;
  };
  public static getUserCards = (): Promise<IResponse<any>> => {
    const result = Connection.GET({
      action: 'getUserCards',
      controller: PaymentController.controller,
    });

    return result;
  };
};

export default PaymentController;