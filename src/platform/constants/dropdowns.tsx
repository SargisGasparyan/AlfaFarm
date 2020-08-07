import { ProductSortEnum } from '../api/product/constants/enums';
import { enumToSelectOptions } from '../services/helper';
import { OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';

export const SortByDropdown = () => enumToSelectOptions<ProductSortEnum>(ProductSortEnum);
export const OrderDeliveryTypeDropdown = () => enumToSelectOptions<OrderDeliveryTypeEnum>(OrderDeliveryTypeEnum);