import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import Options from '../../components/options';
import Settings from 'platform/services/settings';
import SearchInput from 'components/search-input';
import Table from 'components/table';
import { IMedicalServiceListResponseModel, IMedicalServicePriceListResponseModel } from 'platform/api/medicalService/models/response';
import PageLoader from 'components/page-loader';
import MedicalServiceController from 'platform/api/medicalService';
import { onlyForUsers } from 'platform/guards/routes';

import './style.scss';
import { formatPrice } from 'platform/services/helper';
import EmptyState from 'components/empty-state';
import Connection from 'platform/services/connection';

interface IState {
  data?: IMedicalServicePriceListResponseModel[];
  searchValue: string;
};

@byRoute([ROUTES.CLINIC.PRICE_LIST], [onlyForUsers])
class PriceList extends HelperComponent<{}, {}> {

  public state: IState = {
    searchValue: '',
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const { searchValue } = this.state;
    Connection.AbortAll();
    const result = await MedicalServiceController.GetPriceList(searchValue);
    !result.aborted && this.safeSetState({ data: result.data });  
  }

  private onSearchChange = (searchValue: string) => {
    const oldSearchValue = this.state.searchValue;
    this.safeSetState({ searchValue }, () => this.fetchData());
    // this.safeSetState({ searchValue }, () => searchValue !== oldSearchValue && !searchValue && this.fetchData());
  }

  private columnConfig = (name: string) => [
    {
      name,
      cell: (row: IMedicalServiceListResponseModel) => row.name,
    },
    {
      name: Settings.translations.price,
      style: { minWidth: 200, maxWidth: 200 },
      cell: (row: IMedicalServiceListResponseModel) => <b className="G-clr-orange">{formatPrice(row.price)}</b>,
    },
  ];

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-clinic-price-list-page">
        <Options />
        <div id="clinic-page-start" className="P-content">
          <h1 className="G-clr-main P-title">
            {Settings.translations.price_list}
            <SearchInput
              withSubmit={true}
              onChange={this.onSearchChange}
              onSubmit={this.fetchData}
            />
          </h1>
          {data?.map(item => <Table<IMedicalServiceListResponseModel>
            key={item.id}
            columnConfig={this.columnConfig(item.name)}
            data={item.services}
          />)}
        </div>
      </section>
    );
  }
}

export default PriceList;