import { PaymentTypeEnum } from 'platform/constants/enums';
import Settings from 'platform/services/settings';
import { IPaymentTypeEnumItemModel } from './interfaces';

export const PaymentTypeEnumItems = (): IPaymentTypeEnumItemModel[] => [
  {
    name: Settings.translations.cash,
    type: PaymentTypeEnum.Cash
  },
  {
    name: Settings.translations.card,
    type: PaymentTypeEnum.IPay
  },
  {
    name: Settings.translations.post_terminal,
    type: PaymentTypeEnum.PostTerminal
  },
  {
    name: 'IDram',
    type: PaymentTypeEnum.Idram
  }
];