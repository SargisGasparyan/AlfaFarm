import * as React from 'react';

import Modal from 'components/modal';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Restore from './components/restore';
import { ModalContentEnum } from './constants/enums';
import { IAuthQueryData } from './constants/interfaces';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  data?: IAuthQueryData | null;
  onClose(): void;
}

interface IState {
  loading: boolean;
  contentType: ModalContentEnum;
  errorMessage: string;
}

class Auth extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    contentType: ModalContentEnum.SignIn,
    errorMessage: '',
  };

  private contentTypes = {
    [ModalContentEnum.SignIn]: () => <SignIn onTypeChange={this.onTypeChange} />,
    [ModalContentEnum.Restore]: () => <Restore />,
    [ModalContentEnum.SignUp]: () => <SignUp />,
  };

  private onTypeChange = (contentType: ModalContentEnum) => this.safeSetState({ contentType });

  public render() {
    const { onClose } = this.props;

    return (
      <Modal className="P-auth-modal" onClose={onClose}>
        <this.ActiveContent />
      </Modal>
    );
  }

  private get ActiveContent() {
    const { contentType } = this.state
    return this.contentTypes[contentType];
  }
}

export default Auth;
