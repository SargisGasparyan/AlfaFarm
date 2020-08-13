import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { getUpcomingMonths } from 'platform/services/helper';
import MonthAvailableDays from 'modules/pages/clinic/components/month-available-days';

import './style.scss';

class Dates extends HelperPureComponent<{}, {}> {

  private months = getUpcomingMonths(3);

  public render() {
    return (
      <div className="P-clinic-laboratory-dates">
        {this.months.map((item, index) => <MonthAvailableDays key={index} month={item} />)}
      </div>
    );
  }
}

export default Dates;