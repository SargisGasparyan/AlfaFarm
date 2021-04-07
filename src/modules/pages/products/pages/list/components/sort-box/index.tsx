import * as React from 'react';

import { ProductSortEnum } from 'platform/api/product/constants/enums';
import { buildFilters } from '../../services/helper';
import Settings from 'platform/services/settings';
import Select from 'components/select';
import { IDropdownOption } from 'platform/constants/interfaces';
import { SortByDropdown } from 'platform/constants/dropdowns';
import ROUTES from 'platform/constants/routes';

import './style.scss';

interface IProps {
  onChange(): void;
};

const SortBox = ({ onChange }: IProps) => {
  const filter = buildFilters();
  const [sortBy, setSortBy] = React.useState(ProductSortEnum.AlphabeticalAZ);

  React.useEffect(() => {
    const changedSortBy = !filter.hasDiscount &&
      (filter.sortBy === ProductSortEnum.DiscountLowToHigh ||
        filter.sortBy === ProductSortEnum.DiscountHighToLow) ? ProductSortEnum.AlphabeticalAZ : filter.sortBy;

        changedSortBy && changeSortBy(changedSortBy);
  }, [JSON.stringify(filter)]);

  const changeSortBy = (chosen: ProductSortEnum) => {
    console.log("ekav hos");
    setSortBy(chosen);
    const query = new URLSearchParams(window.location.search);
    query.set('sortBy', chosen.toString());
    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
    onChange();
  }

  return (
    <div className="P-products-sort-box">
      <h3>{Settings.translations.sort_by}</h3>
      <Select<ProductSortEnum>
        value={sortBy}
        options={SortByDropdown(!filter.hasDiscount ? [ProductSortEnum.DiscountLowToHigh, ProductSortEnum.DiscountHighToLow] : [])}
        onChange={chosen => chosen && changeSortBy(chosen.value)}
      />
    </div>
  );
};

export default SortBox;