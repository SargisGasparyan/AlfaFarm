import { PaymentTypeEnum } from 'platform/constants/enums';

export interface IPaymentTypeEnumItemModel {
  name: string;
  type: PaymentTypeEnum;
  image: string | null;
}