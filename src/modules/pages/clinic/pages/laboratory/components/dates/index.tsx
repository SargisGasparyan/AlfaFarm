import * as React from 'react';

import { getUpcomingMonths } from 'platform/services/helper';
import MonthAvailableDays from 'modules/pages/clinic/components/month-available-days';
import ClinicRegistrationController from 'platform/api/clinicRegistration';
import { IClinicRegistrationBusyHourResponseModel } from 'platform/api/clinicRegistration/models/response';
import { IMedicalServiceListResponseModel } from 'platform/api/medicalService/models/response';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  chosen?: IMedicalServiceListResponseModel;
};

interface IState {
  busyHours: IClinicRegistrationBusyHourResponseModel[];
};

class Dates extends HelperComponent<IProps, IState> {

  public state: IState = {
    busyHours: [],
  };

  private months = getUpcomingMonths(3);

  public async componentDidUpdate(prevProps: IProps) {
    const { chosen } = this.props;

    if (!prevProps.chosen && chosen) {
      const result = await ClinicRegistrationController.GetLaboratoryBusyHours([chosen.id]);
      this.safeSetState({ busyHours: result.data });
    }
  }

  public render() {
    const { chosen } = this.props;
    const { busyHours } = this.state;

    return (
      <div className="P-clinic-laboratory-dates">
        {this.months.map((item, index) => <MonthAvailableDays
          key={index}
          month={item}
          service={chosen}
          busyHours={busyHours}
        />)}
      </div>
    );
  }
}

export default Dates;