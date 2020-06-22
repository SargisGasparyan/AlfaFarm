import { ProductSortEnum } from '../api/product';
import { enumToSelectOptions } from '../services/helper';

export const SortByDropdown = () => enumToSelectOptions<ProductSortEnum>(ProductSortEnum);