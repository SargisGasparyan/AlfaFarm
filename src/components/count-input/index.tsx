import * as React from 'react';

import NumberInput from '../number-input';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';


interface IProps {
  step: number;
  min: number | string;
  withPlus?: boolean;
  defaultValue?: number | string;
  value?: number | string;
  onChange(value: number, valid: boolean): void;
  deleteItem?: number | string; 
};

interface IState {
  count: string | number;
};

class CountInput extends HelperPureComponent<IProps, IState> {

  public state: IState = { count: '0' };

  public componentDidMount() {
    const { value, defaultValue, min } = this.props;
    const intDefaultValue = Number(defaultValue || defaultValue === 0 ? defaultValue : value);
    this.safeSetState({ count: intDefaultValue || intDefaultValue === 0 ? intDefaultValue : min });
  }

  private countInvalid = () => {
    const { min, step, withPlus } = this.props;
    const { count } = this.state;
    
    if (withPlus) return +count && +count < +min || (+count * 100) % (+step * 100);

    return +count < +min || (+count * 100) % (+step * 100);
  }

  private stepUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { count } = this.state;
    const { step, onChange } = this.props;
    this.safeSetState({ count: +count + step }, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private stepDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { count } = this.state;
    const { step, onChange, min } = this.props;
    const stepDowned = +count - step;
    this.safeSetState({ count: stepDowned >= min ? stepDowned : min }, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private changeCount = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    this.safeSetState({ count: +e.currentTarget.value }, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private initCount = () => {
    const { count } = this.state;
    const { min, withPlus, onChange } = this.props;
    !count && withPlus && this.safeSetState({ count: +min }, () => onChange(+this.state.count, !this.countInvalid));  
  }

  public render() {
    const { withPlus, value } = this.props;
    const count = value || this.state.count;

    return (
      <div
        className={`P-count-input ${!count && withPlus ? 'P-count-input-plus' : ''} ${this.countInvalid() ? 'G-invalid-field' : ''}`}
        onClick={this.initCount}
      >
        {!count && withPlus ? <>&#43;</> : <>
          <span onClick={this.stepDown}>-</span>
          <NumberInput
            value={count.toString()}
            onChange={this.changeCount}
          />
          <span onClick={this.stepUp}>+</span>
        </>}
      </div>
    );
  }
}

export default CountInput;