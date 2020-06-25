import * as React from 'react';

import RequestModal from '../request-modal';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState {
  open: boolean;
};

class RequestButton extends HelperPureComponent<{}, IState> {

  public state: IState = { open: false };
  public toggleModal = () => this.safeSetState({ open: !this.state.open });

  public render() {
    const { open } = this.state;

    return <>
      <i className="P-request-button icon-Group-5505" onClick={this.toggleModal} />
      {open && <RequestModal onClose={this.toggleModal} />}
    </>;
  }
}

export default RequestButton