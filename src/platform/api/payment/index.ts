import Connection    from '../../services/connection';
import { IResponse } from '../../constants/interfaces';
import { IUserCardListModel } from './models/response';
import Settings from '../../services/settings';

class PaymentController {
 
  private static controller = 'payment';

  public static registerCard = (): Promise<IResponse<any>> => {
    const result = Connection.GET({
      action: 'registerCard',
      controller: PaymentController.controller,
    });

    return result;
  };

  public static removeCard = (cardId: string): Promise<IResponse<any>> => {
    const result = Connection.DELETE({
      body: {},
      action: `deleteCard/${cardId}`,
      controller: PaymentController.controller,
    }, { text: Settings.translations.delete_credit_card });

    return result;
  };

  public static confirm = (orderId: string): Promise<IResponse<boolean>> => {
    const result = Connection.GET({
      action: `confirmPayment/${orderId}`,
      controller: PaymentController.controller,
    });

    return result;
  };

  public static saveCard = (orderId: string): Promise<IResponse<boolean>> => {
    const result = Connection.GET({
      action: `saveCard/${orderId}`,
      controller: PaymentController.controller,
    });

    return result;
  };

  public static getUserCards = (): Promise<IResponse<IUserCardListModel[]>> => {
    const result = Connection.GET({
      action: 'getUserCards',
      controller: PaymentController.controller,
    });

    return result;
  };
};

export default PaymentController;
