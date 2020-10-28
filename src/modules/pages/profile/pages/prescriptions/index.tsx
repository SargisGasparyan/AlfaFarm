import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import { formatDate, getViewEnum } from 'platform/services/helper';
import { onlyForUsers } from 'platform/guards/routes';
import Create from './pages/create';
import Deciphered from './pages/deciphered';
import PrescriptionController from 'platform/api/prescription';
import { paginationPageLimit } from 'platform/constants';
import { IPagingResponse } from 'platform/constants/interfaces';
import { IPrescriptionListResponseModel } from 'platform/api/prescription/models/response';
import { PrescriptionStatusEnum } from 'platform/api/prescription/constants/enums';
import Pagination from 'components/pagination';

import './style.scss';

interface IState {
  data?: IPagingResponse<IPrescriptionListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.PRESCRIPTIONS.MAIN, [onlyForUsers])
class Prescriptions extends HelperComponent<IState, {}> {

  public state: IState = {};

  private statusViewEnum = getViewEnum(PrescriptionStatusEnum);

  private columnConfig = [
    {
      name: Settings.translations.date,
      cell: (row: IPrescriptionListResponseModel) => formatDate(row.createdDate),
    },
    {
      name: Settings.translations.medical_institution,
      cell: (row: IPrescriptionListResponseModel) => row.medicalInstitution,
    },
    {
      name: Settings.translations.doctor,
      cell: (row: IPrescriptionListResponseModel) => row.doctorName,
    },
    {
      name: Settings.translations.prescription,
      cell: (row: IPrescriptionListResponseModel) => row.name,
    },
    {
      name: Settings.translations.status,
      cell: (row: IPrescriptionListResponseModel) => Settings.translations[this.statusViewEnum[row.status]],
    },
    {
      name: Settings.translations.deciphered,
      cell: (row: IPrescriptionListResponseModel) => row.status === PrescriptionStatusEnum.Success ? <Link
        to={ROUTES.PROFILE.PRESCRIPTIONS.DECIPHERED.replace(':id', row.id)}
        className="P-see-more-label"
      >
        {Settings.translations.see_more}
      </Link> : '-',
    },
  ];

  private fetchData = async (pageNumber: number) => {
    const body = {
      pageNumber,
      pageSize: paginationPageLimit,
    };

    const result = await PrescriptionController.GetList(body);
    this.safeSetState({ data: result.data });

    return result.data;
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <div className="P-profile-prescriptions">
          <div className="P-content">
            <h3>
              <span className="G-mr-auto">{Settings.translations.prescriptions}</span>
              <Link to={ROUTES.PROFILE.PRESCRIPTIONS.CREATE} className="G-normal-link G-main-color G-fs-48">
                <i className="icon-Group-5532" />
              </Link>
            </h3>
            
            {data && <Table<IPrescriptionListResponseModel>
              columnConfig={this.columnConfig}
              data={data.list}
            />}
          </div>
          
          <Pagination<IPrescriptionListResponseModel> fetchData={this.fetchData} />
        </div>
      </Layout>
    );
  }
}

export default { Prescriptions, Create, Deciphered };