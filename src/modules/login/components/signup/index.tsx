import * as React from 'react';
import CheckBox from 'rc-checkbox';

import LoaderContent from 'components/loader-content';
import AuthController, { ISendEmailRequestModel, IVerifyPhoneModel, IRegisterRequestModel } from 'platform/api/auth';
import { OSTypeEnum } from 'platform/constants/enums';
import PageLoader from 'components/page-loader';
import { isValidEmail, onlyNumbersWithoutCode } from 'platform/services/validator';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';

interface IProps {
  onClose(): void;
  onError(value: string): void;
};

interface IState {
  loading: boolean;
  isConfirmed: boolean;
  form: ISendEmailRequestModel;
  wrongValues: string;
  isPhone: boolean;
  isEmail: boolean;
  pass : IRegisterRequestModel;
  phoneVerification: boolean;
  verify: IVerifyPhoneModel;
  createPassword: boolean;
  createPasswords: IVerifyPhoneModel
};

class SignUp extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    isConfirmed: false,
    wrongValues: '',
    form: {
      osType: OSTypeEnum.Web,
      email: '',
    },
    isEmail: false,
    isPhone: false,
    phoneVerification: false,
    verify: {
      code: '',
      email: ''
    },
    createPassword: false,
    pass: {
      language: Settings.language,
      osType: OSTypeEnum.Web,
      email: '',
      code: '',
      password: '',
    },
    createPasswords: {
      code: '',
      email: ''
    }
  };

  private disabled = () => {
    const { form, isConfirmed } = this.state;
    return !isValidEmail(form.email) && !onlyNumbersWithoutCode(form.email || '') || !isConfirmed;
  }
  private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;

    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private verificationCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {verify} = this.state;
    verify[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({verify})
  }
  
  private passwordRow = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {createPasswords} = this.state;
    createPasswords[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({createPasswords})
  }

  private rePasswordRow = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {createPasswords} = this.state;
    createPasswords[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({createPasswords})
  }

  private submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { form } = this.state;
    const alertify = await import('alertifyjs');
    const isnum = /^\+|\d+$/.test(form.email);
    if (isnum) {
      const result = await AuthController.SendEmail(form);
      if (result.success) {
        this.safeSetState({
          phoneVerification: true
        })
      } else {this.props.onError(result.message);}
    } else {
      !this.disabled() && this.safeSetState({ loading: true }, async () => {

        const result = await AuthController.SendEmail(form);
        if (result.success) {
          alertify.success(Settings.translations.email_send_success);
          this.props.onClose();
        } else this.props.onError(result.message);

        this.safeSetState({ loading: false });
      });
    }
  }

  private completeSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { pass, verify, createPasswords} = this.state;
    const alertify = await import('alertifyjs');
    if(createPasswords.email !== createPasswords.code) {
      alertify.error(Settings.translations.passwords_do_not_match);
    } else {
      pass.password = createPasswords.code
      pass.email = verify.email;
      pass.code = verify.code;
      this.safeSetState({ pass });
      const result = await AuthController.Register(pass);
      if(result.success) {
        alertify.success(result.message);
        this.props.onClose();
        window.routerHistory.push('/HOME')
      } else {
        alertify.error(result.message);
      }
    }
  }
  

  private submitVerification = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {verify, form} = this.state;
    const alertify = await import('alertifyjs');
    verify.email = form.email;
    this.safeSetState({ verify })
    const res = await AuthController.Verify(verify);
    if(res.data) {
      this.safeSetState({
        createPassword: true, 
        phoneVerification: false
      })
      alertify.success(res.message);
    } else {
      alertify.error(res.message);
    }
  }

  private toggleConfirm = () => {
    const { isConfirmed } = this.state;
    this.safeSetState({ isConfirmed: !isConfirmed });
  }

  public render() {
    const { loading, form, phoneVerification, createPassword, createPasswords } = this.state;

    return <>
      <form className="P-G-fields-form">
        {phoneVerification ?
          <>
            <div className="P-G-field">
              <input
                name="code"
                type="text"
                value={this.state.verify.code}
                maxLength={4}
                placeholder={Settings.translations.verificationCode}
                onChange={this.verificationCode}

              />
            </div>
            <button
              onClick={this.submitVerification}
              className="P-G-form-button"
            >
              {Settings.translations.next}
            </button>
          </>
          : createPassword ? 
            <>
             <div className="P-G-field">
               <input
                 name="code"
                 type="password"
                 value={createPasswords.code}
                 placeholder={Settings.translations.password}
                 onChange={this.passwordRow}
 
               />
             </div>
             <div className="P-G-field">
               <input
                 name="email"
                 type="password"
                 value={createPasswords.email}
                 placeholder={Settings.translations.confirm_password}
                 onChange={this.rePasswordRow}
 
               />
             </div>
             <LoaderContent
              loading={false}
              disabled={this.disabled()}
              onClick={this.completeSignUp}
              className="P-G-form-button"
            >
              {Settings.translations.next}
            </LoaderContent>
            </>
          :<>
            <div className="P-G-field">
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder={Settings.translations.email_or_phone}
                onChange={this.change}
              />
            </div>
            <label className="P-G-form-checkbox">
              <CheckBox onChange={this.toggleConfirm} />
              <h3>{Settings.translations.sign_up_confirm}</h3>
            </label>
            <LoaderContent
              loading={false}
              disabled={this.disabled()}
              onClick={this.submit}
              className="P-G-form-button"
            >
              {Settings.translations.next}
            </LoaderContent>
          </>


        }
      </form>
      {loading && <PageLoader />}
    </>;
  }
}

export default SignUp;