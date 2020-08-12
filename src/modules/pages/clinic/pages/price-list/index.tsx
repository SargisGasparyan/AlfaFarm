import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import Options from '../../components/options';

import './style.scss';
import Settings from 'platform/services/settings';
import SearchInput from 'components/search-input';
import Table from 'components/table';
import { IMedicalServiceListResponseModel } from 'platform/api/medicalService/models/response';
import PageLoader from 'components/page-loader';
import MedicalServiceController from 'platform/api/medicalService';

interface IState {
  data?: IMedicalServiceListResponseModel[];
  searchValue: string;
};

@byRoute([ROUTES.CLINIC.PRICE_LIST])
class PriceList extends HelperComponent<{}, {}> {

  public state: IState = {
    searchValue: '',
  };

  public componentDidMount() { this.fetchData(); }

  private get data() {
    const { data } = this.state;
    const { searchValue } = this.state;

    if (!searchValue) return data || [];
    return data ? data.filter(item => item.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
    ) : [];
  }

  private fetchData = async () => {
    const result = await MedicalServiceController.GetList();
    this.safeSetState({ data: result.data });
  }

  private onSearchChange = (searchValue: string) => this.safeSetState({ searchValue });

  private columnConfig = [
    {
      name: Settings.translations.service,
      cell: (row: IMedicalServiceListResponseModel) => row.name,
    },
    {
      name: Settings.translations.price,
      style: { minWidth: 200, maxWidth: 200 },
      cell: (row: IMedicalServiceListResponseModel) => <b className="G-orange-color">{row.price} AMD</b>,
    },
  ];

  public render() {
    return (
      <section className="G-page P-clinic-price-list-page">
        <Options />
        {this.data ? <div id="clinic-content" className="P-content">
          <h1 className="G-main-color P-title">
            {Settings.translations.price_list}
            <SearchInput withSubmit={false} onChange={this.onSearchChange} />
          </h1>
          <Table<IMedicalServiceListResponseModel>
            columnConfig={this.columnConfig}
            data={this.data}
          />
        </div> : <PageLoader />}
      </section>
    );
  }
}

export default PriceList;