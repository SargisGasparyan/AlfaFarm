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
  const [sortBy, setSortBy] = React.useState(ProductSortEnum.AlphabeticalAZ);

  React.useEffect(() => {
    const filter = buildFilters();
    filter.sortBy && setSortBy(filter.sortBy);
  }, []);

  const changeSortBy = (chosen: IDropdownOption<ProductSortEnum>) => {
    setSortBy(chosen.value);
    const query = new URLSearchParams(window.location.search);
    query.set('sortBy', chosen.value.toString());
    window.routerHistory.replace(`${ROUTES.PRODUCTS.MAIN}?${query.toString()}`);
    onChange();
  }

  return (
    <div className="P-products-sort-box">
      <h3>{Settings.translations.sort_by}</h3>
      <Select<ProductSortEnum>
        value={sortBy}
        options={SortByDropdown()}
        onChange={changeSortBy}
      />
    </div>
  );
};

export default SortBox;