import HelperComponent from 'platform/classes/helper-component';
import * as React from 'react';
import './index.scss';
interface IState {
  isChecked: boolean;
}
interface IProps<T> {
  isChecked: boolean;
  value: T;
  callback: (data: T) => void;
}
class Radio<T extends number | string | HTMLAllCollection> extends HelperComponent<IProps<T>, IState> {
  public state: IState = {
    isChecked: false
  }
  public static getDerivedStateFromProps(nextProps: IProps<any>) {
    const { isChecked } = nextProps;
    return { isChecked };
  }
  public check = () => {
    const { callback, value } = this.props;
    const { isChecked } = this.state;
    this.safeSetState({ isChecked: !isChecked }, () => callback(value));
  };
  public render() {
    const { isChecked } = this.state;
    return <div className="P-radio-wrap">
      <div className={`P-radio-selector ${isChecked ? 'P-radio-selector_checked' : ''}`} onClick={this.check} />
      <div className="P-radio-content" onClick={this.check}>{this.props.children}</div>
    </div>
  }
}
 export default Radio;