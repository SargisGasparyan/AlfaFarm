import * as React from 'react';

import Modal from 'components/modal';
import PageLoader from 'components/page-loader';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Restore from './components/restore';
import SignUpVerify from './components/signup-verify';
import RestoreVerify from './components/restore-verify';
import Settings from 'platform/services/settings';
import AuthController from 'platform/api/auth';
import { ISocialResponse } from './constants/interfaces';
import { OSTypeEnum } from 'platform/constants/enums';
import { SocialProviderEnum, ModalContentEnum, VerifyTypeEnum } from './constants/enums';
import { IAuthQueryData } from './constants/interfaces';
import HelperComponent from 'platform/classes/helper-component';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

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

class Login extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    contentType: ModalContentEnum.Login,
    errorMessage: '',
  };

  public componentDidMount() {
    
    const { data } = this.props;
    data && this.safeSetState({
      contentType: data.type === VerifyTypeEnum.SignUp ?
        ModalContentEnum.SignUpVerify :
        ModalContentEnum.RestoreVerify,
    });
  }

  
  private facebook = (authData: any) => this.safeSetState({ loading: true }, async () => {
    if(authData.status!=='unknown'){
      const result = await AuthController.Social({
        osType: OSTypeEnum.Web,
        provider: SocialProviderEnum.Facebook,
        token: authData._token.accessToken,
      });
  
      this.safeSetState({ loading: false }, () => {
        if (result.success) {
          Settings.token = result.data.token;
          localStorage.setItem('fb', 'done')
          window.routerHistory.push('/')
          window.location.reload();
        }
      });
    }else{
      this.safeSetState({loading:false})
    }
  
   
  });

  private google = (authData: ISocialResponse) => this.safeSetState({ loading: true }, async () => {
    const result = await AuthController.Social({
      osType: OSTypeEnum.Web,
      provider: SocialProviderEnum.Google,
      token: authData._token.idToken,
    });

    this.safeSetState({ loading: false }, () => {
      if (result.success) {
        Settings.token = result.data.token;
        if (result.data.bonusCount) sessionStorage.setItem('giftBonusCount', result.data.bonusCount.toString());
        else sessionStorage.removeItem('giftBonusCount');
        window.routerHistory.push('/');
        window.location.reload();
      }
    });
  });

  private responseGoogle = async (response: any) => {
    if(response.error){
      const alertify = await import('alertifyjs');
      const errorText = response.error.split('_').join(' ')
       alertify.error(errorText,2);
    }else{
      const result = await AuthController.Social({
        osType: OSTypeEnum.Web,
        provider: SocialProviderEnum.Google,
        token: response._token.idToken,
      });
  
      this.safeSetState({ loading: false }, () => {
        if (result.success) {
          Settings.token = result.data.token;
          if (result.data.bonusCount) sessionStorage.setItem('giftBonusCount', result.data.bonusCount.toString());
          else sessionStorage.removeItem('giftBonusCount');
          window.routerHistory.push('/')
          window.location.reload();
        }
      });
    }
}

  private changeToLogin = () => this.safeSetState({ contentType: ModalContentEnum.Login });
  private changeToSignUp = () => this.safeSetState({ contentType: ModalContentEnum.SignUp });
  private changeToRestore = () => this.safeSetState({ contentType: ModalContentEnum.Restore });

  private Header = () => {
    const { contentType } = this.state;

    switch (contentType) {
      case ModalContentEnum.Login: return <>
        <h2>{Settings.translations.log_in}</h2>
        <h4>{Settings.translations.not_a_member} <a onClick={this.changeToSignUp}>{Settings.translations.sign_up}</a></h4>
      </>;
      case ModalContentEnum.SignUp: return <>
        <h2>{Settings.translations.sign_up}</h2>
        <h4>{Settings.translations.already_a_member} <a onClick={this.changeToLogin}>{Settings.translations.log_in}</a></h4>
      </>;
      case ModalContentEnum.Restore: return <>
        <h2>{Settings.translations.restore_password}</h2>
        <h4>{Settings.translations.already_a_member} <a onClick={this.changeToLogin}>{Settings.translations.log_in}</a></h4>
      </>;
      case ModalContentEnum.SignUpVerify: return <>
        <h2>{Settings.translations.choose_password}</h2>
        <h4>{Settings.translations.already_a_member} <a onClick={this.changeToLogin}>{Settings.translations.log_in}</a></h4>
      </>;
      case ModalContentEnum.RestoreVerify: return <>
        <h2>{Settings.translations.choose_password}</h2>
        <h4>{Settings.translations.already_a_member} <a onClick={this.changeToLogin}>{Settings.translations.log_in}</a></h4>
      </>;
    }

    return null;
  };
  
  private onError = (value: string) => this.safeSetState({ errorMessage: value });

  private Content = () => {
    const { data, onClose } = this.props;
    const { contentType } = this.state;

    switch (contentType) {
      case ModalContentEnum.Login: return <SignIn onClose={onClose} onError={this.onError} onRestorePassword={this.changeToRestore} />;
      case ModalContentEnum.SignUp: return <SignUp onClose={onClose} onError={this.onError} />;
      case ModalContentEnum.Restore: return <Restore onClose={onClose} onError={this.onError} />;
      case ModalContentEnum.SignUpVerify: return data ? <SignUpVerify onClose={onClose} onError={this.onError} data={data} /> : <SignUp onClose={onClose} onError={this.onError} />;
      case ModalContentEnum.RestoreVerify: return data ? <RestoreVerify onClose={onClose} onError={this.onError} data={data} /> : <SignIn onClose={onClose} onError={this.onError} onRestorePassword={this.changeToRestore} />;
    }

    return null;
  };

  private loginFail = async (error: string) => {
    const alertify = await import('alertifyjs');
    error && alertify.error(error);
  };

  public render() {
    const { onClose } = this.props;
    const { loading, errorMessage } = this.state;

    return (
      <Modal className="P-login-modal" onClose={onClose}>
        <this.Header />
        {errorMessage && <p className="P-G-invalid-text">{errorMessage}</p>}
        <this.Content />
        <span className="P-social-login">
          {Settings.translations.social_login}
          <FacebookLogin
            appId='392096548151413'
            autoLoad={false}
            fields="name,email,picture"
            cssClass="P-social-button"
            icon={<i className="icon-fb" />}
            textButton=""
            callback={this.facebook}
          >
              <i className="icon-fb" />
          </FacebookLogin>
          <GoogleLogin
            clientId={Settings.googleId}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="P-social-button"
          >
           <i className="icon-google" />
          </GoogleLogin>
        </span>
        {loading && <PageLoader />}
      </Modal>
      
    );
  }
}

export default Login;
