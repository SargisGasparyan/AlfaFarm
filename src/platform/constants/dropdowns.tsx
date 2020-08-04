import { ProductSortEnum } from '../api/product/constants/enums';
import { enumToSelectOptions } from '../services/helper';

export const SortByDropdown = () => enumToSelectOptions<ProductSortEnum>(ProductSortEnum);