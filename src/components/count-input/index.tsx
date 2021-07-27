import * as React from 'react';

import NumberInput from '../number-input';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import './style.scss';

interface IProps {
  step: number;
  min: number | string;
  withPlus?: boolean;
  onlyPlusIfOne?: boolean;
  defaultValue?: number | string;
  value?: number | string;
  onChange(value: number, valid: boolean): void;
  deleteItem?: number | string;
};

interface IState {
  count: string | number;
  plused: boolean;
};

class CountInput extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    count: '0', // string cause it used inside input
    plused: false, // using inside case when will be displayed only plus
  };

  public componentDidMount() {
    const { value, defaultValue, min } = this.props;
    const intDefaultValue = Number(defaultValue || defaultValue === 0 ? defaultValue : value);
    this.safeSetState({ count: intDefaultValue || intDefaultValue === 0 ? intDefaultValue : min, plused: intDefaultValue > 0 });
  }

  private countInvalid = () => {
    const { min, step, withPlus } = this.props;
    const { count } = this.state;

    if (withPlus) return +count && +count < +min || (+count * 100) % (+step * 100);

    return +count < +min || (+count * 100) % (+step * 100);
  }

  private stepUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { count, plused } = this.state;
    const { step, value, onChange, onlyPlusIfOne } = this.props;

    if (onlyPlusIfOne && !plused) this.safeSetState({ plused: true, count: 1 });
    else {
      const stepUped = value ? +value + step : +count + step;
      this.safeSetState({ count: stepUped }, () => onChange(+this.state.count, !this.countInvalid()));
    }
  }

  private stepDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { count } = this.state;
    const { step, onChange, min, value } = this.props;
    const stepDowned = value ? +value - step : +count - step;
    this.safeSetState({ count: stepDowned >= min ? stepDowned : min }, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private changeCount = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    this.safeSetState({ count: !isNaN(+e.currentTarget.value) ? +e.currentTarget.value : 0 }, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private initCount = () => {
    const { count } = this.state;
    const { min, withPlus, onChange } = this.props;
    !count && withPlus && this.safeSetState({ count: +min }, () => onChange(+this.state.count, !this.countInvalid));
  }

  public render() {
    const { withPlus, onlyPlusIfOne, value } = this.props;
    const { plused } = this.state;
    const count = value || this.state.count;

    return (
      <div
        className={`P-count-input ${!count && withPlus ? 'P-count-input-plus' : ''}`}
        onClick={this.initCount}
      >
        {!count && withPlus ? <>&#43;</> : <>
          {(!onlyPlusIfOne || plused) && <>
            <span onClick={this.stepDown}>-</span>
            <NumberInput
              value={count.toString()}
              className={this.countInvalid() ? 'P-invalid' : ''}
              onChange={this.changeCount}
            />
          </>}
          <span onClick={this.stepUp}>+</span>
        </>}
      </div>
    );
  }
}
export default CountInput;
