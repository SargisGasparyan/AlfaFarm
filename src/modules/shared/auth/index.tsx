import * as React from 'react';

import Modal from 'components/modal';
import SignIn from './components/signin';
import SignUp from './components/signup';
import SendCode from './components/send-code';
import Verify from './components/verify';
import { ModalContentEnum } from './constants/enums';
import { IAuthQueryData } from './constants/interfaces';
import NewPassword from './components/new-password';
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
  activeData: object;
}

class Auth extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    contentType: ModalContentEnum.SignIn,
    errorMessage: '',
    activeData: {},
  };
  
  public componentDidMount() {
    document.body.style.position = 'fixed'
  }
  
  public componentWillUnmount() {
    super.componentWillUnmount();
    document.body.style.position = 'unset'
  }
  
  private contentTypes = {
    [ModalContentEnum.SignIn]: () => <SignIn onTypeChange={this.onTypeChange} />,
    [ModalContentEnum.SendCode]: () => <SendCode onTypeChange={this.onTypeChange} activeData={this.state.activeData} />,
    [ModalContentEnum.Verify]: () => <Verify onTypeChange={this.onTypeChange} activeData={this.state.activeData} />,
    [ModalContentEnum.NewPassword]: () => <NewPassword onTypeChange={this.onTypeChange} />,
    [ModalContentEnum.SignUp]: () => <SignUp onTypeChange={this.onTypeChange} />,
  };

  private get closable() {
    const { contentType } = this.state;
    return contentType !== ModalContentEnum.Verify && contentType !== ModalContentEnum.NewPassword;
  }

  private onTypeChange = <ActiveData extends object>(contentType: ModalContentEnum, activeData?: ActiveData) => this.safeSetState({ contentType, activeData: activeData || {} });

  private onClose = () => {
    const { onClose } = this.props
    this.closable && onClose();
  }

  public render() {

    return (
      <Modal
        className="P-auth-modal"
        unclosable={!this.closable}
        onClose={this.onClose}
      >
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
