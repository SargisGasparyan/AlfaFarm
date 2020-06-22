import * as React from 'react';

import LoaderContent from 'components/loader-content';
import AuthController, { ILoginRequestModel } from 'platform/api/auth';
import { OSTypeEnum } from 'platform/constants/enums';
import PageLoader from 'components/page-loader';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';

interface IProps {
  onClose(): void;
  onError(value: string): void;
  onRestorePassword(): void;
};

interface IState {
  loading: boolean;
  passwordShown: boolean;
  form: ILoginRequestModel;
};

class SignIn extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    passwordShown: false,
    form: {
      osType: OSTypeEnum.Web,
      email: '',
      password: '',
    },
  };

  private togglePassword = () => this.safeSetState({ passwordShown: !this.state.passwordShown });
  private disabled = () => {
    const { form } = this.state;
    return !form.email || !form.password;
  }

  private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    !this.disabled() && this.safeSetState({ loading: true }, async () => {
      const result = await AuthController.Login(this.state.form);
      if (result.success) {
        Settings.token = result.data.token;
        if (result.data.bonusCount) sessionStorage.setItem('giftBonusCount', result.data.bonusCount.toString());
        else sessionStorage.removeItem('giftBonusCount');
        window.location.reload();
      } else {
        if (result.message === "Wrong password") {
          this.props.onError(Settings.translations.wrong_password);
        } 
        if (result.message === "Wrong email") {
          this.props.onError(Settings.translations.wrong_email);
        } 
        if (result.message === "Please check correctness of email or phone number") {
          this.props.onError(Settings.translations.please_check_correctness_of_email_or_phone_number);
        }
        this.safeSetState({ loading: false });
      }
    });
  }

  public render() {
    const { onRestorePassword } = this.props;
    const { form, loading, passwordShown } = this.state;

    return <>
      <form className="P-G-fields-form">
        <div className="P-G-field">
          <input
            name="email"
            type="email"
            value={form.email}
            placeholder={Settings.translations.email_or_phone}
            onChange={this.change}
          />
        </div>
        <div className="P-G-field">
          <input
            name="password"
            type={passwordShown ? 'text' : 'password'}
            value={form.password}
            placeholder={Settings.translations.password}
            onChange={this.change}
          />
          <i className={passwordShown ? 'P-login-eye icon-eye' : 'P-login-eye  icon-eye_01'} onClick={this.togglePassword} />
        </div>
        <a className="P-login-restore" onClick={onRestorePassword}>{Settings.translations.restore_password}</a>
        <LoaderContent
          loading={false}
          disabled={this.disabled()}
          onClick={this.submit}
          className="P-G-form-button"
        >
          {Settings.translations.log_in}
        </LoaderContent>
      </form>
      {loading && <PageLoader />}
    </>;
  }
}

export default SignIn;