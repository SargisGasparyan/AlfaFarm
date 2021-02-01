import { BonusStatusEnum } from '../constants/enums';
import { IPagingResponse } from 'platform/constants/interfaces';

export interface IBonusCardDetailsWithHistoryResponseModel {
  bonusCardDetails: IBonusCardDetailsResponseModel;
  bonusHistoryGroupedByDate: IPagingResponse<IBonusCardHistoryResponseModel>;
};

export interface IBonusCardDetailsResponseModel {
  fullName: string;
  amount: number;
  cardNumber: string;
};

export interface IBonusCardHistoryResponseModel {
  date: string;
  bonusHistory: IBonusCardHistoryItemResponseModel[];
};

export interface IBonusCardHistoryItemResponseModel {
  id: number;
  orderId: number;
  amount: number;
  bonus: number;
  status: BonusStatusEnum;
  date: string;
};