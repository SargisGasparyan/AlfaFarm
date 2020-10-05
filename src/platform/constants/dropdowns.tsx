import { ProductSortEnum } from '../api/product/constants/enums';
import { enumToSelectOptions } from '../services/helper';
import { OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import { GenderEnum } from 'platform/api/user/constants/enums/gender';

export const SortByDropdown = () => enumToSelectOptions<ProductSortEnum>(ProductSortEnum);
export const GenderDropdown = () => enumToSelectOptions<GenderEnum>(GenderEnum);
export const OrderDeliveryTypeDropdown = () => enumToSelectOptions<OrderDeliveryTypeEnum>(OrderDeliveryTypeEnum);