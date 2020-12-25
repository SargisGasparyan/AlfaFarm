import * as React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import Options from '../../components/options';
import Settings from 'platform/services/settings';
import Table from 'components/table';
import { IMedicalServiceListResponseModel } from 'platform/api/medicalService/models/response';
import PageLoader from 'components/page-loader';
import Dates from './components/dates';
import LoaderContent from 'components/loader-content';
import DispatcherChannels from '../../constants/dispatcher-channels';
import ClinicRegistrationController from 'platform/api/clinicRegistration';
import SuccessModal from 'components/success-modal';
import { onlyForUsers } from 'platform/guards/routes';
import { infinityScrollPageLimit } from 'platform/constants';
import DoctorController from 'platform/api/doctor';
import { scrolledToBottom, getMediaPath, formatPrice } from 'platform/services/helper';
import { IDoctorListResponseModel } from 'platform/api/doctor/models/response';
import SearchInput from 'components/search-input';

import './style.scss';



interface IState {
  data?: IDoctorListResponseModel[];
  searchValue: string;
  loading: boolean;
  submitLoading: boolean;
  chosenService?: number;
  chosenDoctor?: number;
  chosenDate?: Date;
  showSuccess: boolean;
};

@byRoute([ROUTES.CLINIC.DOCTORS], [onlyForUsers])
class Doctors extends HelperComponent<{}, {}> {

  public state: IState = {
    searchValue: '',
    submitLoading: false,
    loading: false,
    showSuccess: false,
  };

  private pageNo = 1;
  private lastPage = false;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
    window.addEventListener(DispatcherChannels.ClinicTimeChoose, this.timeChoose);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener(DispatcherChannels.ClinicTimeChoose, this.timeChoose);
  }

  private columnConfig = (professionName: string) => [
    {
      name: professionName,
      cell: (row: IMedicalServiceListResponseModel) => <div className="G-flex G-flex-justify-between">
        {row.name}
        <span>{formatPrice(row.price)}</span>
      </div>,
    },
  ];

  private timeChoose = ({ detail }: CustomEvent) => this.safeSetState({ chosenDate: detail });

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const { searchValue } = this.state;
      const body = {
        text: searchValue,
        pageNumber: this.pageNo,
        pageSize: infinityScrollPageLimit,
      };

      const result = await DoctorController.GetList(body);
      const data = this.state.data || [];

      this.safeSetState({ data: overwrite ? result.data.list : [...data, ...result.data.list], loading: false });
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

  private search = (value: string) => this.safeSetState({ searchValue: value, loading: true }, () => {
    this.pageNo = 1;
    this.lastPage = false;
    this.fetchData(true);
  });

  private toggleService = (doctorId: number, row: IMedicalServiceListResponseModel) => {
    const { chosenService, chosenDoctor } = this.state;

    if (chosenService !== row.id || chosenDoctor !== doctorId) this.safeSetState({
      chosenDoctor: doctorId,
      chosenService: row.id,
    }); else this.safeSetState({ chosenDoctor: undefined, chosenService: undefined, chosenDate: undefined });
  }

  private toggleSuccessModal = () => {
    const { showSuccess } = this.state;
    
    if (showSuccess) this.safeSetState({
      chosenService: undefined,
      chosenDate: undefined,
      showSuccess: false,
    }); else this.safeSetState({ showSuccess: true });
  }

  private registerDisabled = (doctorId: number) => {
    const { chosenDoctor, chosenDate } = this.state;
    return doctorId !== chosenDoctor || !chosenDate;
  }

  private submit = () => this.safeSetState({ submitLoading: true }, async () => {
    const { chosenService, chosenDoctor, chosenDate } = this.state;

    if (chosenDoctor && chosenService && chosenDate) {
      const result = await ClinicRegistrationController.Create([{
        doctorId: chosenDoctor,
        medicalServiceId: chosenService,
        start: chosenDate,
      }]);

      result.success && this.toggleSuccessModal();
      this.safeSetState({ submitLoading: false });
    }
  });

  public render() {
    const { data, chosenService, chosenDoctor, submitLoading, showSuccess, loading } = this.state;

    return (
      <section className="G-page P-clinic-doctors-page">
        <Options />
        <h1 id="clinic-page-start" className="G-main-color G-page-title">
          {Settings.translations.doctors}
          <SearchInput onChange={this.search} />
        </h1>
        <div className="P-content">
          {data ? data.map(item => <div key={item.id} className="P-item">
            <div className="P-main-info">
              <div className="P-image" style={{ background: `url('${getMediaPath(item.photoPath)}') center/cover` }} />
              <h3>{item.fullName}</h3>
            </div>
            <div className="P-services">
              <Table<IMedicalServiceListResponseModel>
                useCheckbox={() => true}
                checkBoxClass="G-radio"
                checkBoxState={row => chosenService === row.id && chosenDoctor === item.id}
                onRowClick={row => this.toggleService(item.id, row)}
                columnConfig={this.columnConfig(item.professionName)}
                data={item.services}
              />
              {item.services && item.services.length > 0 ?
              <LoaderContent
                className="G-main-button"
                loading={submitLoading}
                disabled={this.registerDisabled(item.id)}
                onClick={this.submit}
              >
                {Settings.translations.book}
              </LoaderContent>: null }
            </div>
            <Dates
              doctorId={chosenDoctor}
              chosen={chosenService && chosenDoctor === item.id ? item.services.find(sub => sub.id === chosenService) : undefined}
            />
          </div>) : <PageLoader />}
          {loading && <PageLoader />}
          {showSuccess && <SuccessModal onClose={this.toggleSuccessModal}>
            <h3>{Settings.translations.appointment_success}</h3>
            <Link className="G-main-button G-normal-link G-mt-30" to={ROUTES.PROFILE.MY_REGISTRATIONS.MAIN}>{Settings.translations.my_registrations}</Link>
          </SuccessModal>}
        </div>
      </section>
    );
  }
}

export default Doctors;