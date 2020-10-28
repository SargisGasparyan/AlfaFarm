import * as React from 'react';

import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { IVerifyRequestModel, ISendCodeRequestModel } from 'platform/api/auth/models/request';
import { validateForm } from './services/helper';
import AuthController from 'platform/api/auth';
import { ModalContentEnum } from '../../constants/enums';
import NumberInput from 'components/number-input';


interface IProps {
  onTypeChange(type: ModalContentEnum): void;
  activeData: object;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: IVerifyRequestModel;
};

class RestoreVerify extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      phoneNumber: '',
      code: 0,
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = +e.currentTarget.value;
    this.safeSetState({ form })
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const { onTypeChange } = this.props;
        const { form } = this.state;
        const activeData = this.props.activeData as { form: ISendCodeRequestModel, signUp: boolean, fromSocial: boolean };
        form.phoneNumber = activeData.form.phoneNumber;

        const result = await AuthController.Verify(form);
        if (result.data) {
          Settings.token = result.data.accessToken;
          activeData.fromSocial ? window.location.reload() : onTypeChange(activeData.signUp ? ModalContentEnum.SignUp : ModalContentEnum.NewPassword);
        } else this.safeSetState({ submitLoading: false });
      });
    });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.verification_text}</h3>
      <form className="G-main-form">
        <div className="G-main-form-field">
          <NumberInput
            int={true}
            name="code"
            value={form.code}
            placeholder={Settings.translations.code}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.code ? 'G-invalid-field' : ''}`}
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

export default RestoreVerify;
