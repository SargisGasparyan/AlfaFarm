import * as React from 'react';

import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { countryCode } from 'platform/constants';
import LoaderContent from 'components/loader-content';
import { ModalContentEnum } from '../../constants/enums';
import { ILoginRequestModel } from 'platform/api/auth/models/request';
import { validateForm } from './services/helper';
import AuthController from 'platform/api/auth';
import SocialButton from '../social-button';
import { SocialProvider } from 'platform/api/auth/constants/enums';
import enviroment from 'platform/services/enviroment';

interface IProps {
  onTypeChange<ActiveData extends object>(type: ModalContentEnum, activeData?: ActiveData): void;
};

interface IState {
  form: ILoginRequestModel;
  submited: boolean;
  submitLoading: boolean;
};

class SignIn extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      username: '',
      password: '',
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private restorePassword = () => {
    const { onTypeChange } = this.props;
    onTypeChange(ModalContentEnum.SendCode);
  }

  private signUp = () => {
    const { onTypeChange } = this.props;
    onTypeChange(ModalContentEnum.SendCode, { signUp: true });
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form })
  }

  private socialSuccess = async (data: { [key: string]: any }, type: SocialProvider) => {
    const tokens = {
      [SocialProvider.Facebook]: data._token.accessToken,
      [SocialProvider.Google]: data._token.idToken,
    };

    const body = {
      type,
      token: tokens[type],
    };

    const result = await AuthController.Social(body);
    if (result.success) {
      Settings.token = result.data.accessToken;
      result.data.isVerified ? window.location.reload() : this.props.onTypeChange(ModalContentEnum.SendCode, { fromSocial: true });
    }
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const form = {...this.state.form};
        form.username = `+${countryCode}${form.username}`;

        const result = await AuthController.Login(form);
        if (result.data) {
          Settings.token = result.data.accessToken;
          window.location.reload();
        } else this.safeSetState({ submitLoading: false });
      });
    });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.log_in}</h3>
      <form className="G-main-form">
        <div className="G-main-form-field G-phone-input-wrapper">
          <p className="G-input-country-code">+{countryCode}</p>
          <input
            name="username"
            value={form.username}
            placeholder={Settings.translations.phone_number}
            className={`G-main-input ${this.formValidation.errors.username ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <input
            name="password"
            type="password"
            value={form.password}
            placeholder={Settings.translations.password}
            className={`G-main-input ${this.formValidation.errors.password ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.submit}
        >{Settings.translations.log_in}</LoaderContent>
      </form>
      
      {!enviroment.WHOLESALE && <>
        <span className="P-sign-in-restore-password" onClick={this.restorePassword}>{Settings.translations.restore_password}</span>

        <SocialButton
          type={SocialProvider.Facebook}
          appId={Settings.facebookId}
          provider="facebook"
          onLoginSuccess={data => this.socialSuccess(data, SocialProvider.Facebook)}
          onLoginFailure={e => alert(e)}
        />

        <SocialButton
          type={SocialProvider.Google}
          appId={Settings.googleId}
          provider="google"
          onLoginSuccess={data => this.socialSuccess(data, SocialProvider.Google)}
          onLoginFailure={e => alert(e)}
        />

        <span className="P-sign-in-register-text">{Settings.translations.not_a_member}</span>
        <button className="G-main-ghost-button P-sign-in-register" onClick={this.signUp}>{Settings.translations.sign_up}</button>
      </>}
    </>;
  }
}

export default SignIn;