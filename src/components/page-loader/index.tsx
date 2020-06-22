import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState {
  show: boolean;
};

class PageLoader extends HelperPureComponent<{}, IState> {

  public state: IState = { show: false };

  private loadingTimeout: number;

  public componentDidMount() {
    this.loadingTimeout = window.setTimeout(() => this.safeSetState({ show: true }), 200);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    this.loadingTimeout && clearTimeout(this.loadingTimeout);
  }

  public render() {
    const { show } = this.state;
    
    return show ? (
      <div className="P-loader-wrapper">
        <div className="P-loader" />
      </div>
    ) : null;
  }
}

export default PageLoader;