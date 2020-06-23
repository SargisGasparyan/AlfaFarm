import * as React from 'react';
import * as DateTime from 'react-datetime';
import * as moment from 'moment';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  value?: string;
  prepareDaysCount: number;
  onClose(value?: string): void;
};

interface IState { value?: Date; };

class DatePicker extends HelperComponent<IProps, IState> {

  public state: IState = {};

  public componentDidMount() {
    const { value } = this.props;
    this.safeSetState({ value: value ? new Date(value) : new Date() });
  }

  private done = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { value } = this.state;
    if (value) {
      const iso = value.toISOString();
      this.props.onClose(iso);
    } else this.props.onClose();
  }

  private onDateChange = (value: moment.Moment) => {
    const date = value.toDate();
    this.safeSetState({ value: date });
  }

  private dateValidation = (date: moment.Moment) => {
    const { prepareDaysCount } = this.props;
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const days = prepareDaysCount * 86400000; //* 1000 * 60 * 60 * 24

    return date.valueOf() >= currentDate.getTime() + days;
  }

  private get doneDisabled() {
    const { value } = this.state;
    const { prepareDaysCount } = this.props;
    
    if (!value) return false;

    const chosenDate = moment(value);
    chosenDate.set({ second: 59 });
    const currentDate = moment();
    const days = prepareDaysCount * 86400000; //* 1000 * 60 * 60 * 24

    return chosenDate.valueOf() < currentDate.valueOf() + days;
  }

  private onClose = () => this.props.onClose();

  public render() {
    const { value } = this.state;

    return (
      <Modal className="P-checkout-date-modal" onClose={this.onClose}>
        <h2>{Settings.translations.delivery_date}</h2>
        <form className="G-fields-form">
          <DateTime
            input={false}
            value={value}
            isValidDate={this.dateValidation}
            onChange={this.onDateChange}
          />
          <button
            className="G-form-button"
            disabled={this.doneDisabled}
            onClick={this.done}
          >{Settings.translations.done}</button>
        </form>
      </Modal>
    );
  }
}

export default DatePicker;
