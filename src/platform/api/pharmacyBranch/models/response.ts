import { WeekDaysEnum } from 'platform/constants/enums';

export interface IPharmacyBranchListResponseModel {
  id: number;
  name: string;
  photoPath?: string;
  contactPhoneNumber: string;
  addressText: string;
  addressLat: number;
  addressLng: number;
  isOpen: boolean;
  workingPlan: IPharmacyBranchWorkingPlanResponseModel[];
}

export interface IPharmacyBranchWorkingPlanResponseModel {
  startDay: WeekDaysEnum;
  endDay?: WeekDaysEnum;
  startTime?: string;
  endTime?: string;
  isDayOff: boolean;
};