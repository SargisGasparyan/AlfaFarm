import { CardTypeEnum } from "platform/constants/enums";

export interface IUserCardListModel {
  id: number;
  orderId: number | null;
  pan: string;
  type: CardTypeEnum;
}