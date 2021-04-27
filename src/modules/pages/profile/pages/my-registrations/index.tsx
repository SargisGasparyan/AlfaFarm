import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import { onlyForUsers } from 'platform/guards/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
// import Table from 'components/table';
import List from './components/list';
import { formatDate, formatPrice } from 'platform/services/helper';
import { IClinicRegistrationListResponseModel } from 'platform/api/clinicRegistration/models/response';
import ClinicRegistrationController from 'platform/api/clinicRegistration';
import { IPagingResponse } from 'platform/constants/interfaces';
import { paginationPageLimit } from 'platform/constants';
import Pagination from 'components/pagination';
import MedicalHistory from './pages/medical-history';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyRegistrations.json';

import './style.scss';

interface IState {
  data?: IPagingResponse<IClinicRegistrationListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.MY_REGISTRATIONS.MAIN, [onlyForUsers])
class MyRegistrations extends HelperComponent<IState, {}> {

  public state: IState = {};


  private fetchData = async (pageNumber: number) => {
    const body = {
      pageNumber,
      pageSize: paginationPageLimit
    };

    const result = await ClinicRegistrationController.GetList(body);

    this.safeSetState({ data: result.data });
    return result.data;
  };

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <section className="P-profile-my-registrations-page">
          <h2 className="P-title G-mb-20 G-flex G-flex-justify-between">
            <p className="P-registrations-title">{Settings.translations.my_registrations}</p>
            <p><Link to={ROUTES.PROFILE.MY_REGISTRATIONS.MEDICAL_HISTORY}>{Settings.translations.medical_history}</Link></p>
          </h2>
          <div className="G-flex P-list">
            {data ? (data.list.length ? <List data={data.list}/> :
              <EmptyState animationData={animationData} text={Settings.translations.empty_registrations_list}/>) : null}
          </div>
          <Pagination<IClinicRegistrationListResponseModel> fetchData={this.fetchData}/>
        </section>
      </Layout>
    );
  }
}

export default { MyRegistrations, MedicalHistory };
