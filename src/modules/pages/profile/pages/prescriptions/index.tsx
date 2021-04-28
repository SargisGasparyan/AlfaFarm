import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import Settings from 'platform/services/settings';
import List from './components/list';
import { onlyForUsers } from 'platform/guards/routes';
import Create from './pages/create';
import Deciphered from './pages/deciphered';
import PrescriptionController from 'platform/api/prescription';
import { paginationPageLimit } from 'platform/constants';
import { IPagingResponse } from 'platform/constants/interfaces';
import { IPrescriptionListResponseModel } from 'platform/api/prescription/models/response';
import Pagination from 'components/pagination';

import './style.scss';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyRecipe.json';

interface IState {
  data?: IPagingResponse<IPrescriptionListResponseModel>;
};

@byPrivateRoute(ROUTES.PROFILE.PRESCRIPTIONS.MAIN, [onlyForUsers])
class Prescriptions extends HelperComponent<IState, {}> {

  public state: IState = {};


  private fetchData = async (pageNumber: number) => {
    const body = {
      pageNumber,
      pageSize: paginationPageLimit
    };

    const result = await PrescriptionController.GetList(body);
    this.safeSetState({ data: result.data });

    return result.data;
  };

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <div className="G-flex G-flex-justify-end G-mb-30 G-flex-align-center">
          <h2 className="G-clr-main">{Settings.translations.prescriptions}</h2>
          <Link
              to={ROUTES.PROFILE.PRESCRIPTIONS.CREATE}
              className="G-normal-link G-main-button G-ml-auto G-fs-16"
          >+ {Settings.translations.add_prescription}</Link>
        </div>
        <div className="P-profile-prescriptions">
          <div className="P-content G-flex-justify-between">
            {data && data.list.length ? <List
              data={data.list}
            /> : <EmptyState animationData={animationData} text={Settings.translations.empty_prescriptions_list}/>}
          </div>

          <Pagination<IPrescriptionListResponseModel> fetchData={this.fetchData}/>
        </div>
      </Layout>
    );
  }
}

export default { Prescriptions, Create, Deciphered };
