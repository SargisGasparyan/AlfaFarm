import { PaymentTypeEnum } from 'platform/constants/enums';
import Settings from 'platform/services/settings';
import { IPaymentTypeEnumItemModel } from './interfaces';
import CashImage from 'assets/images/ic_cash.svg';
import IdramImage from 'assets/images/ic_idram.svg';
import PosImage from 'assets/images/ic_pos.svg';

export const PaymentTypeEnumItems = (): IPaymentTypeEnumItemModel[] => [
  {
    name: Settings.translations.cash,
    type: PaymentTypeEnum.Cash,
    image: CashImage,
  },
  {
    name: Settings.translations.card,
    type: PaymentTypeEnum.IPay,
    image: null,
  },
  {
    name: Settings.translations.post_terminal,
    type: PaymentTypeEnum.PostTerminal,
    image: PosImage,
  },
  {
    name: 'IDram',
    type: PaymentTypeEnum.Idram,
    image: IdramImage,
  }
];