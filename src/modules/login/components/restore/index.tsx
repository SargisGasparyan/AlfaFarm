import * as React from 'react';

import LoaderContent from 'components/loader-content';
import AuthController, { ISendEmailRequestModel } from 'platform/api/auth';
import { OSTypeEnum } from 'platform/constants/enums';
import PageLoader from 'components/page-loader';
import { isValidEmail, onlyNumbersWithoutCode } from 'platform/services/validator';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import ROUTES from 'platform/constants/routes';


interface IProps {
  onClose(): void;
  onError(value: string): void;
};

interface IState {
  loading: boolean;
  form: ISendEmailRequestModel;
  mobileRestore: boolean,
  code: string,
  passwordChangeModal: boolean;
  passwordForm: {
    password: string,
    confirm: string,
  }
};

class Restore extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    form: {
      osType: OSTypeEnum.Web,
      email: '',
    },
    mobileRestore: false,
    code: '',
    passwordChangeModal: false,
    passwordForm: {
      password: '',
      confirm: ''
    }
  };

  private disabled = () => {
    const { form } = this.state;

    return !isValidEmail(form.email) && !onlyNumbersWithoutCode(form.email || '');
  }
  private savePassword = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { passwordForm } = this.state;
    passwordForm[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ passwordForm });
  }
  private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }
  private confirmCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await AuthController.ForgotVerify({ email: this.state.form.email, code: this.state.code });
    if (result && result.success) {
      this.safeSetState({ passwordChangeModal: true });
    }
  }
  private confirmPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { form, passwordForm } = this.state;
    const alertify = await import('alertifyjs');
    if(passwordForm.password === passwordForm.confirm) {
    const body = {
      osType: form.osType,
      email: form.email,
      password: passwordForm.password,
      code: this.state.code,
    }
    const result = await AuthController.ForgotRestore(body);
    if(result && result.success) {
      window.routerHistory.push(ROUTES.HOME.MAIN);
      window.location.reload();
    } 
  } else {
    alertify.console.error(Settings.translations.wrong_password);
  }
  }
  private submit = async (e: React.SyntheticEvent) => {
    const { form } = this.state;
    e.preventDefault();
    if (+form.email) {
      this.safeSetState({ mobileRestore: true });
    }
    const alertify = await import('alertifyjs');

    !this.disabled() && this.safeSetState({ loading: true }, async () => {
      const result = await AuthController.ForgotSendEmail(this.state.form);
      if (result.success) {
        if (!this.state.mobileRestore) {
          alertify.success(Settings.translations.email_send_success);
          this.props.onClose();
        } else {
          alertify.success(Settings.translations.phone_code_send_success);
        }
      } else this.props.onError(result.message);

      this.safeSetState({ loading: false });
    });
  }

  public render() {
    const { loading, form, mobileRestore, passwordChangeModal, passwordForm } = this.state;

    return <>
      {!mobileRestore ? <>
        <form className="G-fields-form">
          <div className="G-field">
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder={Settings.translations.email_or_phone}
              onChange={this.change}
            />
          </div>
          <LoaderContent
            loading={false}
            disabled={this.disabled()}
            onClick={this.submit}
            className="G-form-button"
          >
            {Settings.translations.next}
          </LoaderContent>
        </form>
        {loading && <PageLoader />}
      </> :
        passwordChangeModal ?
          <>
            <form className="G-fields-form">
              <div className="G-field">
                <input
                  name="password"
                  type="password"
                  value={passwordForm.password}
                  placeholder={Settings.translations.password}
                  onChange={this.savePassword}
                />
              </div>
              <div className="G-field">
                <input
                  name="confirm"
                  type="password"
                  value={passwordForm.confirm}
                  placeholder={Settings.translations.confirm_password}
                  onChange={this.savePassword}
                />
              </div>
              <LoaderContent
                loading={false}
                disabled={this.disabled()}
                onClick={this.confirmPassword}
                className="G-form-button"
              >
                {Settings.translations.next}
              </LoaderContent>
            </form>
          </>
          :
          <>
            <form className="G-fields-form">
              <div className="G-field">
                <input
                  name="code"
                  type="text"
                  value={this.state.code}
                  placeholder={Settings.translations.verificationCode}
                  onChange={(e) => this.safeSetState({ code: e.target.value })}
                />
              </div>
              <LoaderContent
                loading={false}
                disabled={this.disabled()}
                onClick={this.confirmCode}
                className="G-form-button"
              >
                {Settings.translations.next}
              </LoaderContent>
            </form>
          </>
      }
    </>;
  }
}

export default Restore;
