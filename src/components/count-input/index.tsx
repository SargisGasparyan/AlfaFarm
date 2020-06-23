import * as React from 'react';

import NumberInput from '../number-input';

import HelperComponent from 'platform/classes/helper-component';

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

class CountInput extends HelperComponent<IProps, IState> {

  public state: IState = { count: '0' };

  public componentDidMount() {
    const { value, defaultValue, min } = this.props;
    const intDefaultValue = Number(defaultValue || defaultValue === 0 ? defaultValue : value);
    this.safeSetState({ count: intDefaultValue || intDefaultValue === 0 ? intDefaultValue : min });
  }

  public componentWillReceiveProps() {
    const { value } = this.props;
    if (value || value === 0) {
      const intValue = Number(value);
      this.safeSetState({ count: intValue });
    }
  }

  private countInvalid = () => {
    const { min, step, withPlus } = this.props;
    const { count } = this.state;
    
    if (withPlus) return +count && +count < +min || (+count * 100) % (+step * 100);

    return +count < +min || (+count * 100) % (+step * 100);
  }

  private stepUp = () => {
    const { count } = this.state;
    const { step, onChange } = this.props;
    this.safeSetState({ count: +count + step }, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private stepDown = () => {
    const { count } = this.state;
    const { step, onChange } = this.props;
    const stepDowned = +count - step;
    if(stepDowned !== 0){
      this.safeSetState({ count: stepDowned > 0 ? stepDowned : 0 }, () => onChange(+this.state.count, !this.countInvalid()));
    }
  }

  private changeCount = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    // +e.currentTarget.value
      this.safeSetState({ count: +e.currentTarget.value}, () => onChange(+this.state.count, !this.countInvalid()));
  }

  private initCount = () => {
    const { count } = this.state;
    const { min, withPlus, onChange } = this.props;
    !count && withPlus && this.safeSetState({ count: +min }, () => onChange(+this.state.count, !this.countInvalid));  
  }

  public render() {
    const { count } = this.state;
    const { withPlus } = this.props;
    // const { deleteItem } = this.props;
    // if(count === 0) {
    //   window.dispatchEvent(new CustomEvent('deleteCard', { detail:  deleteItem }));
    // }
    
    return (
      <div
        className={`G-field P-count-input ${!count && withPlus ? 'P-count-input-plus' : ''} ${this.countInvalid() ? 'G-invalid-field' : ''}`}
        onClick={this.initCount}
      >
        {!count && withPlus ? <>&#43;</> : <>
          <NumberInput
            value={count.toString()}
            onChange={this.changeCount}
          />
          <i className="icon-top" onClick={this.stepUp} />
          <i className="icon-down" onClick={this.stepDown} />
        </>}
      </div>
    );
  }
}

export default CountInput;