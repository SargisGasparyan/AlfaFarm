import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import { OrderStatusEnum } from 'platform/api/order/constants/enums';
import { getViewEnum, formatDate } from 'platform/services/helper';
import { IClinicRegistrationListResponseModel } from 'platform/api/clinicRegistration/models/response';
import ClinicRegistrationController from 'platform/api/clinicRegistration';

import './style.scss';

interface IState {
  data: IClinicRegistrationListResponseModel[];
};

@byPrivateRoute(ROUTES.PROFILE.MY_REGISTRATIONS)
class MyRegistrations extends HelperComponent<IState, {}> {

  public state: IState = {
    data: [],
  };

  private columnConfig = [

    {
      name: Settings.translations.doctor,
      cell: (row: IClinicRegistrationListResponseModel) => row.doctorName,
    },
    {
      name: Settings.translations.service,
      cell: (row: IClinicRegistrationListResponseModel) => row.serviceName,
    },
    {
      name: Settings.translations.date,
      cell: (row: IClinicRegistrationListResponseModel) => formatDate(row.startDate),
    },
    {
      name: Settings.translations.price,
      cell: (row: IClinicRegistrationListResponseModel) => <>{row.servicePrice} AMD</>,
    },
  ];

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await ClinicRegistrationController.GetList();
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <h2 className="G-main-color G-mb-30">{Settings.translations.my_registrations}</h2>
        <div className="G-flex P-profile-orders">
          <Table<IClinicRegistrationListResponseModel>
            columnConfig={this.columnConfig}
            data={data}
          />
        </div>
      </Layout>
    );
  }
}

export default MyRegistrations;