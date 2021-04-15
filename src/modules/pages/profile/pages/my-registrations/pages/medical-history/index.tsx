import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import Settings from 'platform/services/settings';
import { scrolledToBottom, getMediaPath, formatDate } from 'platform/services/helper';
import { onlyForUsers } from 'platform/guards/routes';
import { infinityScrollPageLimit } from 'platform/constants';
import MedicalHistoryController from 'platform/api/medicalHistory';
import { IMedicalServiceListResponseModel } from 'platform/api/medicalHistory/models/response';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyMedicalHistory.json';

import './style.scss';

interface IState {
  data?: IMedicalServiceListResponseModel[];
  loading: boolean;
};

@byPrivateRoute(ROUTES.PROFILE.MY_REGISTRATIONS.MEDICAL_HISTORY, [onlyForUsers])
class MedicalHistory extends HelperComponent<IState, {}> {

  public state: IState = {
    loading: false,
  };

  private pageNo = 1;
  private lastPage = false;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private fetchData = () => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const body = {
        pageNumber: this.pageNo,
        pageSize: infinityScrollPageLimit,
      };

      const result = await MedicalHistoryController.GetList(body);
      const data = this.state.data || [];

      this.safeSetState({ data: [...data, ...result.data.list], loading: false });
      this.lastPage = result.data.pageCount === this.pageNo;
    } else this.safeSetState({ loading: false });
  });

  private scroll = () => {
    const { loading } = this.state;
    
    if (!this.lastPage && scrolledToBottom() && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <section className="P-profile-my-registrations-medical-history-page">
          <h2 className="P-title G-mb-30 G-flex G-flex-justify-between">
            <p><Link to={ROUTES.PROFILE.MY_REGISTRATIONS.MAIN}>{Settings.translations.my_registrations}</Link></p>
            <p className="P-registrations-title">{Settings.translations.medical_history}</p>
          </h2>
          {data ? (data.length ? data.map(item => <div key={item.id} className="P-list-item">
            <div className="P-main-info">
              <h3>{Settings.translations.date}</h3>
              <span>{formatDate(item.createdDate)}</span>
              <h3>{Settings.translations.doctor}</h3>
              <span>{item.doctorName}</span>
            </div>
            <div className="P-files">
              <h3>{Settings.translations.treatment}</h3>
              {item.files.map((sub, subIndex) => <a
                key={subIndex}
                target="_blank"
                href={getMediaPath(sub)}
                style={{ background: `url('${getMediaPath(sub)}') center/contain no-repeat` }}
                className="P-image"
              />)}
            </div>
          </div>) : <EmptyState animationData={animationData} text={Settings.translations.empty_medical_history} />) : null}          
        </section>
      </Layout>
    );
  }
}

export default MedicalHistory;
