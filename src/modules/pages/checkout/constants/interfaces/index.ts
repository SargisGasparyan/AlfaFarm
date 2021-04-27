import { PaymentTypeEnum } from 'platform/constants/enums';

export interface IPaymentTypeEnumItemModel {
  name: string;
  type: PaymentTypeEnum;
  class: string;
  image: string | null;
}
