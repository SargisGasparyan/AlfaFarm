import * as React from 'react';

import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { countryCode } from 'platform/constants';
import { ISendCodeRequestModel } from 'platform/api/auth/models/request';
import { validateForm } from './services/helper';
import AuthController from 'platform/api/auth';
import { ModalContentEnum } from '../../constants/enums';


interface IProps {
  onTypeChange<ActiveData extends object>(type: ModalContentEnum, activeData: ActiveData): void;
  activeData?: object;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: ISendCodeRequestModel;
};

class SendCode extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      fromForgot: false,
      number: '',
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form })
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const alertify = await import('alertifyjs');
        const { onTypeChange } = this.props;
        const form = {...this.state.form};
        const activeData = this.props.activeData as { signUp: boolean, fromSocial: boolean } || null;
        const isSignUp = activeData ? activeData.signUp : false;
        form.number = `+${countryCode}${form.number}`;
        form.fromForgot = !isSignUp;

        const result = await AuthController.SendCode(form);
        
        if (result.data) {
          alertify.success(`${result.data}`);
          onTypeChange(ModalContentEnum.Verify, { form, fromSocial: activeData.fromSocial, signUp: activeData ? activeData.signUp : false });
        } else this.safeSetState({ submitLoading: false });
      });
    });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.phone_number}</h3>
      <form className="G-main-form">
        <div className="G-main-form-field G-phone-input-wrapper">
          <p className="G-input-country-code">+{countryCode}</p>
          <input
            name="number"
            value={form.number}
            placeholder={Settings.translations.phone_number}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.number ? 'G-invalid-field' : ''}`}
          />
        </div>
        <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.submit}
        >{Settings.translations.next}</LoaderContent>
      </form>
    </>;
  }
}

export default SendCode;
