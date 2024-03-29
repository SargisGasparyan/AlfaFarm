import { ProductSortEnum } from '../api/product/constants/enums';
import { enumToSelectOptions } from '../services/helper';
import { OrderDeliveryTimeTypeEnum, OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import { GenderEnum } from 'platform/api/user/constants/enums/gender';

export const SortByDropdown = (notInclude: ProductSortEnum[] = []) => enumToSelectOptions<ProductSortEnum>(ProductSortEnum, true, notInclude);
export const GenderDropdown = () => enumToSelectOptions<GenderEnum>(GenderEnum, true, [GenderEnum.NotFilled]);
export const OrderDeliveryTypeDropdown = () => enumToSelectOptions<OrderDeliveryTypeEnum>(OrderDeliveryTypeEnum);
export const OrderDeliveryTimeTypeDropdown = () => enumToSelectOptions<OrderDeliveryTimeTypeEnum>(OrderDeliveryTimeTypeEnum);