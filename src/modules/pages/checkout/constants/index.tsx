import { PaymentTypeEnum } from 'platform/constants/enums';
import Settings from 'platform/services/settings';
import { IPaymentTypeEnumItemModel } from './interfaces';
import CashImage from 'assets/images/icons/cash.svg';
import CreditCardImage from 'assets/images/icons/credit_card.svg';
import IDramImage from 'assets/images/icons/idram.svg';
import PosImage from 'assets/images/icons/pos_terminal.svg';

export const PaymentTypeEnumItems = (): IPaymentTypeEnumItemModel[] => [
  {
    name: Settings.translations.cash,
    type: PaymentTypeEnum.Cash,
    image: CashImage,
  },
  {
    name: Settings.translations.card,
    type: PaymentTypeEnum.IPay,
    image: CreditCardImage,
  },
  {
    name: Settings.translations.post_terminal,
    type: PaymentTypeEnum.PostTerminal,
    image: PosImage,
  },
  // {
  //   name: 'IDram',
  //   type: PaymentTypeEnum.Idram,
  //   image: IDramImage,
  // }
];
