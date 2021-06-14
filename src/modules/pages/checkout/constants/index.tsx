import { PaymentTypeEnum } from 'platform/constants/enums';
import Settings from 'platform/services/settings';
import { IPaymentTypeEnumItemModel } from './interfaces';
import CashImage from 'assets/images/icons/cash.svg';
import CreditCardImage from 'assets/images/icons/credit_card.svg';
import IDramImage from 'assets/images/icons/idram.svg';
import TelcellImage from 'assets/images/icons/telcell.svg';
import PosImage from 'assets/images/icons/pos_terminal.svg';

export const PaymentTypeEnumItems = (): IPaymentTypeEnumItemModel[] => [
  {
    name: Settings.translations.card,
    type: PaymentTypeEnum.IPay,
    class: 'P-ipay',
    image: CreditCardImage,
  },
  {
    name: Settings.translations.cash,
    type: PaymentTypeEnum.Cash,
    class: 'P-cash',
    image: CashImage,
  },
  {
    name: Settings.translations.post_terminal,
    type: PaymentTypeEnum.PostTerminal,
    class: 'P-post-terminal',
    image: PosImage,
  },
  {
    name: 'IDram',
    type: PaymentTypeEnum.Idram,
    class: 'P-post-terminal',
    image: IDramImage,
  }
  // {
  //   name: 'Telcell',
  //   type: PaymentTypeEnum.Telcell,
  //   class: 'P-post-terminal',
  //   image: TelcellImage,
  // }
];
