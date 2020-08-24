import * as React from 'react';
import * as moment from 'moment';

import TooltipTrigger, { TooltipArg } from 'react-popper-tooltip';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { getMonthDays, formatISOString } from 'platform/services/helper';
import Settings from 'platform/services/settings';
import { IClinicRegistrationBusyHourResponseModel } from 'platform/api/clinicRegistration/models/response';
import { getRegistrationTimeRanges } from '../../services/helper';
import DispatcherChannels from '../../constants/dispatcher-channels';

import './style.scss';

interface IProps {
  busyHours: IClinicRegistrationBusyHourResponseModel[];
  duration?: number;
  month: {
    date: Date;
    name: string;
  };
};

interface IState {
  activeDay?: Date;
  chosenDate?: Date;
};

class MonthAvailableDays extends HelperPureComponent<IProps, {}> {

  public state: IState = {};

  private availableDays = getMonthDays(this.props.month.date);

  private get availableTimes() {
    const { duration } = this.props;
    const { activeDay } = this.state;

    if (activeDay && duration) {
      const today = moment(activeDay).isSame(moment(), 'day');
      return getRegistrationTimeRanges(duration, today);
    } else return [];
  }

  public static getDerivedStateFromProps(nextProps: IProps) {
    if (!nextProps.duration) return { activeDay: undefined, chosenDate: undefined };
    return null;
  }

  public componentDidMount() {
    window.addEventListener(DispatcherChannels.ClinicTimeChoose, this.outsideTimeChoose);
  }

  public componentWillUnmount() {
    window.removeEventListener(DispatcherChannels.ClinicTimeChoose, this.outsideTimeChoose);
  }

  private outsideTimeChoose = ({ detail }: CustomEvent) => {
    const { month } = this.props;
    const monthNumber = month.date.getMonth();
    detail.getMonth() !== monthNumber && this.safeSetState({ chosenDate: undefined });
  }

  private isDisabled = (time: string) => {
    const { busyHours } = this.props;
    const { activeDay } = this.state;

    if (!activeDay) return true;

    const splited = time.split(':');
    const hours = +splited[0];
    const minutes = +splited[1];

    activeDay.setHours(hours);
    activeDay.setMinutes(minutes);

    return busyHours.some(item => {
      const start = new Date(formatISOString(item.start));
      const end = new Date(formatISOString(item.end));

      start.setSeconds(0);
      start.setMilliseconds(0);

      end.setSeconds(0);
      end.setMilliseconds(0);

      return activeDay > start && activeDay < end;
    });
  }

  private isActive = (time: string) => {
    const { chosenDate, activeDay } = this.state;

    if (!chosenDate) return false;

    const splited = time.split(':');
    const hours = +splited[0];
    const minutes = +splited[1];

    return (
      chosenDate.getHours() === hours &&
      chosenDate.getMinutes() === minutes &&
      this.isActiveDay(activeDay)
    );
  }

  private isActiveDay = (date?: Date) => {
    const { chosenDate } = this.state;

    if (!chosenDate || !date) return false;

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return chosenDate.getFullYear() === year && chosenDate.getMonth() === month && chosenDate.getDate() === day;
  }

  private onTooltipToggle = (shown: boolean, date: Date) => this.safeSetState({ activeDay: shown ? date : undefined })

  private chooseTime = (time: string) => {
    const { activeDay } = this.state;

    if (!this.isDisabled(time) && activeDay) {
      const splited = time.split(':');
      const hours = +splited[0];
      const minutes = +splited[1];

      activeDay.setHours(hours);
      activeDay.setMinutes(minutes);

      window.dispatchEvent(new CustomEvent(DispatcherChannels.ClinicTimeChoose, { detail: new Date(activeDay) }));
      this.safeSetState({ chosenDate: new Date(activeDay) });
    }
  }

  public render() {
    const { month, duration } = this.props;

    return (
      <div className="P-clinic-month-available-days">
        <h3>{month.name} &gt; <span className="G-text-gray-color">{Settings.translations.available_days}</span></h3>
        {this.availableDays.map((item, index) => duration ? <TooltipTrigger
          key={index}
          placement="bottom-start"
          tooltip={this.Tooltip}
          onVisibilityChange={shown => this.onTooltipToggle(shown, item.date)}
        >
          {({getTriggerProps, triggerRef}) => (
            <span
              {...getTriggerProps({
                ref: triggerRef,
                className: `P-day ${this.isActiveDay(item.date) ? 'P-active' : ''}`
              })}
            >
              {item.name}
            </span>
          )}
        </TooltipTrigger> : <span key={index} className="P-day">{item.name}</span>)}
      </div>
    );
  }

  private Tooltip = ({ tooltipRef, getTooltipProps }: TooltipArg) => {

    return (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'P-clinic-days-tooltip'
        })}
      >
        <h3>{Settings.translations.choose_time}</h3>

        {this.availableTimes.map(item => <span
          key={item}
          className={`P-time ${this.isDisabled(item) ? 'P-disabled' : ''} ${this.isActive(item) ? 'P-active' : ''}`}
          onClick={() => this.chooseTime(item)}
        >{item}</span>)}
      </div>
    );
  }
};

export default MonthAvailableDays;