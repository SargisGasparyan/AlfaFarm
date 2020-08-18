import * as React from 'react';

import { getMonthDays } from 'platform/services/helper';
import Settings from 'platform/services/settings';

import './style.scss';

interface IProps {
  month: {
    date: Date;
    name: string;
  };
};

const MonthAvailableDays = React.memo(({ month }: IProps) => {
  const availableDays = getMonthDays(month.date)

  return <div className="P-clinic-month-available-days">
    <h3>{month.name} &gt; <span className="G-text-gray-color">{Settings.translations.available_days}</span></h3>
    {availableDays.map((item, index) => <span key={index} className="P-day">
      {item.name}
    </span>)}
  </div>
});

export default MonthAvailableDays;