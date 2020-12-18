import { PaymentType } from 'platform/constants/enums';
import Settings from 'platform/services/settings';
import { IPaymentTypeItemModel } from './interfaces';

export const PaymentTypeItems = (): IPaymentTypeItemModel[] => [
  {
    name: Settings.translations.cash,
    type: PaymentType.Cash
  },
  {
    name: Settings.translations.card,
    type: PaymentType.IPay
  },
  {
    name: 'IDram',
    type: PaymentType.Idram
  }
];