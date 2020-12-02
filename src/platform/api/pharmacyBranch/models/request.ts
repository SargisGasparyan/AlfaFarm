import { IPagingRequest } from 'platform/constants/interfaces';

export interface IPharmacyBranchListRequestModel extends IPagingRequest {
    text?: string;
};