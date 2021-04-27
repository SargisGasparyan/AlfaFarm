import { CardTypeEnum } from "platform/constants/enums";

export interface IUserCardListModel {
  id: number;
  orderId: number | null;
  pan: string;
  bankName: string;
  expiration: string;
  cardHolderName: string;
  type: CardTypeEnum;
}
