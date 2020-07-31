import { ProductSortEnum } from '../api/product/models/request';
import { enumToSelectOptions } from '../services/helper';

export const SortByDropdown = () => enumToSelectOptions<ProductSortEnum>(ProductSortEnum);