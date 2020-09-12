import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import { formatDate } from 'platform/services/helper';
import { IClinicRegistrationListResponseModel } from 'platform/api/clinicRegistration/models/response';
import { onlyForUsers } from 'platform/guards/routes';
import ClinicRegistrationController from 'platform/api/clinicRegistration';

import './style.scss';
import { IPagingResponse } from 'platform/constants/interfaces';
import { paginationPageLimit } from 'platform/constants';
import Pagination from 'components/pagination';

interface IState {
  data?: IPagingResponse<IClinicRegistrationListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.MY_REGISTRATIONS, [onlyForUsers])
class MyRegistrations extends HelperComponent<IState, {}> {

  public state: IState = {};

  private columnConfig = [
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

  private fetchData = async (pageNumber: number) => {
    const body = {
      pageNumber,
      pageSize: paginationPageLimit,
    };

    const result = await ClinicRegistrationController.GetList(body);

    this.safeSetState({ data: result.data });
    return result.data;
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <h2 className="G-main-color G-mb-30">{Settings.translations.my_registrations}</h2>
        <div className="G-flex P-profile-orders">
          {data && <Table<IClinicRegistrationListResponseModel>
            columnConfig={this.columnConfig}
            data={data.list}
          />}
        </div>
        
        <Pagination<IClinicRegistrationListResponseModel> fetchData={this.fetchData} />
      </Layout>
    );
  }
}

export default MyRegistrations;