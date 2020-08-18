import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import Options from '../../components/options';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import { IMedicalServiceListResponseModel } from 'platform/api/medicalService/models/response';
import PageLoader from 'components/page-loader';
import MedicalServiceController from 'platform/api/medicalService';

import './style.scss';
import CheckBox from 'rc-checkbox';
import Dates from './components/dates';

interface IState {
  data?: IMedicalServiceListResponseModel[];
  searchValue: string;
  chosenServices: number[];
};

@byRoute([ROUTES.CLINIC.LABORATORY])
class Laboratory extends HelperComponent<{}, {}> {

  public state: IState = {
    searchValue: '',
    chosenServices: [],
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await MedicalServiceController.GetLaboratoryList();
    this.safeSetState({ data: result.data });
  }

  private columnConfig = [
    {
      name: Settings.translations.laboratory,
      cell: (row: IMedicalServiceListResponseModel) => <div className="G-flex G-flex-justify-between">
        {row.name}
        <span>{row.price} AMD</span>
      </div>,
    },
  ];

  private get totalPrice() { 
    const { chosenServices, data } = this.state;
    let price = 0;

    chosenServices.map(item => {
      const elem = data?.find(row => row.id === item)
      if (elem) price += elem.price;
    });

    return price;
  }

  private toggleService = (row: IMedicalServiceListResponseModel) => {
    const { chosenServices } = this.state;
    const existingIndex = chosenServices.indexOf(row.id);
    if (existingIndex === -1) chosenServices.push(row.id);
    else chosenServices.splice(existingIndex, 1);
    this.safeSetState({ chosenServices });
  }

  public render() {
    const { data, chosenServices } = this.state;

    return (
      <section className="G-page P-clinic-laboratory-page">
        <Options />
        <h1 id="clinic-page-start" className="G-main-color G-page-title">
          {Settings.translations.laboratory}
          <button className="G-main-button">{Settings.translations.sign_up}</button>
        </h1>
        <div className="P-content">
          {data ? <>
            <div className="P-list">
              <div className="G-flex G-flex-wrap G-flex-align-center G-flex-justify-between">
                <Table<IMedicalServiceListResponseModel>
                  useCheckbox={() => true}
                  checkBoxState={row => chosenServices.includes(row.id)}
                  onRowClick={this.toggleService}
                  columnConfig={this.columnConfig}
                  data={data}
                />

                <button className="G-main-button">{Settings.translations.sign_up}</button>
                <h1 className="P-total">
                  {Settings.translations.total}
                  <span className="G-orange-color">{this.totalPrice} AMD</span>
                </h1>
              </div>
            </div>
            <Dates />
          </> : <PageLoader />}
        </div>
      </section>
    );
  }
}

export default Laboratory;