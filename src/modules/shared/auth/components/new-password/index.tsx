import * as React from 'react';

import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { IRecoveryRequestModel } from 'platform/api/auth/models/request';
import { validateForm } from './services/helper';
import AuthController from 'platform/api/auth';
import { ModalContentEnum } from '../../constants/enums';

interface IProps {
  onTypeChange(type: ModalContentEnum): void;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: IRecoveryRequestModel;
};

class NewPassword extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      newPassword: '',
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
        const { form } = this.state;

        const result = await AuthController.Recovery(form);
        if (result.data) window.location.reload();
        else this.safeSetState({ submitLoading: false });
      });
    });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.choose_password}</h3>
      <form className="G-main-form">
        <div>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            placeholder={Settings.translations.password}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.newPassword ? 'G-invalid-field' : ''}`}
          />
        </div>
        <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.submit}
        >{Settings.translations.confirm}</LoaderContent>
      </form>
    </>;
  }
}

export default NewPassword;
