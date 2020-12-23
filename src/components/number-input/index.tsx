import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';

import './style.scss'

interface IProps {
  int?: boolean;
  name?: string;
  type?: string;
  step?: string | number;
  value?: number | string;
  pattern?: string;
  className?: string;
  placeholder?: string;
  max?: number;
  onChange?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onFocus?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onClick?(e: React.SyntheticEvent<HTMLInputElement>): void;
};

class NumberInput extends HelperComponent<IProps, {}> {

  private onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { onChange, max } = this.props;
      e.currentTarget.value = max && +e.currentTarget.value > max ? max.toString() : e.currentTarget.value;
      onChange && onChange(e);
    }
  }


  private get pattern() {
    const { int } = this.props;
    if (int) return '([0-9]*)';
    else return '((.*?)\s*(\d+(?:[/-]\d+)?)?$)';
  }

  public render() {
    const props = {...this.props};
    props.value = props.value ? props.value.toString() : '';
    delete props.onChange;
    delete props.pattern;
    delete props.int;
    return <input
      pattern={this.pattern}
      onChange={this.onChange}
      {...props}
    />;
  }
}

export default NumberInput;
