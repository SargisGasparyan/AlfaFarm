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
import Dates from './components/dates';
import LoaderContent from 'components/loader-content';
import DispatcherChannels from '../../constants/dispatcher-channels';
import ClinicRegistrationController from 'platform/api/clinicRegistration';
import SuccessModal from 'components/success-modal';
import { onlyForUsers } from 'platform/guards/routes';

import './style.scss';
import { formatPrice } from 'platform/services/helper';
import { Link } from 'react-router-dom';


interface IState {
  data?: IMedicalServiceListResponseModel[];
  searchValue: string;
  submitLoading: boolean;
  chosenService?: number;
  chosenDate?: Date;
  showSuccess: boolean;
};

@byRoute([ROUTES.CLINIC.LABORATORY], [onlyForUsers])
class Laboratory extends HelperComponent<{}, {}> {

  public state: IState = {
    searchValue: '',
    submitLoading: false,
    showSuccess: false,
  };

  public componentDidMount() {
    this.fetchData();
    window.addEventListener(DispatcherChannels.ClinicTimeChoose, this.timeChoose);
  }

  public componentWillUnmount() {
    window.removeEventListener(DispatcherChannels.ClinicTimeChoose, this.timeChoose);
  }

  private columnConfig = [
    {
      name: Settings.translations.laboratory,
      cell: (row: IMedicalServiceListResponseModel) => <div className="G-flex G-flex-justify-between">
        {row.name}
        <span>{formatPrice(row.price)}</span>
      </div>,
    },
  ];

  private timeChoose = ({ detail }: CustomEvent) => this.safeSetState({ chosenDate: detail });

  private fetchData = async () => {
    const result = await MedicalServiceController.GetLaboratoryList();
    this.safeSetState({ data: result.data });
  }

  private toggleService = (row: IMedicalServiceListResponseModel) => {
    const { chosenService, chosenDate } = this.state;

    this.safeSetState({
      chosenService: chosenService !== row.id ? row.id : undefined,
      chosenDate: chosenService !== row.id ? chosenDate : undefined
    });
  }

  private toggleSuccessModal = () => {
    const { showSuccess } = this.state;
    
    if (showSuccess) this.safeSetState({
      chosenService: undefined,
      chosenDate: undefined,
      showSuccess: false,
    }); else this.safeSetState({ showSuccess: true });
  }

  private submit = () => this.safeSetState({ submitLoading: true }, async () => {
    const { chosenService, chosenDate } = this.state;

    if (chosenService && chosenDate) {
      const result = await ClinicRegistrationController.Create([{
        medicalServiceId: chosenService,
        start: chosenDate,
      }]);

      result.success && this.toggleSuccessModal();
      this.safeSetState({ submitLoading: false });
    }
  });

  public render() {
    const { data, chosenDate, chosenService, submitLoading, showSuccess } = this.state;

    return (
      <section className="G-page P-clinic-laboratory-page">
        <Options />
        <h1 id="clinic-page-start" className="G-clr-main G-page-title">
          {Settings.translations.laboratory}
        </h1>
        <div className="P-content">
          {data ? <>
            <div className="P-list">
              <div className="G-flex G-flex-1 G-flex-wrap G-flex-align-center G-flex-justify-between">
                <Table<IMedicalServiceListResponseModel>
                  useCheckbox={() => true}
                  checkBoxClass="G-radio"
                  checkBoxState={row => chosenService === row.id}
                  onRowClick={this.toggleService}
                  columnConfig={this.columnConfig}
                  data={data}
                />

                <LoaderContent
                  loading={submitLoading}
                  className="G-main-button"
                  onClick={this.submit}
                  disabled={!chosenDate}
                >
                  {Settings.translations.book}
                </LoaderContent>
              </div>
            </div>

            <Dates chosen={chosenService ? data.find(item => item.id === chosenService) : undefined} />
            {showSuccess && <SuccessModal onClose={this.toggleSuccessModal}>
              <h3>{Settings.translations.appointment_success}</h3>
              <Link className="G-main-button G-normal-link G-mt-30" to={ROUTES.PROFILE.MY_REGISTARTIONS.MAIN}>{Settings.translations.my_registrations}</Link>
            </SuccessModal>}
          </> : <PageLoader />}
        </div>
      </section>
    );
  }
}

export default Laboratory;