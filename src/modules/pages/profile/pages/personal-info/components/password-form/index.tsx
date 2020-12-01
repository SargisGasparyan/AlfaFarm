import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { countryCode } from 'platform/constants';
import Storage from 'platform/services/storage';
import { validateForm, ChangePasswordForm } from './services/helper';
import UserController from 'platform/api/user';

interface IState {
  form: ChangePasswordForm;
  edited: boolean;
  submited: boolean;
  submitLoading: boolean;
};

class PasswordForm extends HelperComponent<{}, IState> {

  public state: IState = {
    edited: false,
    submited: false,
    submitLoading: false,
    form: {
      newPassword: '',
      currentPassword: '',
      confirmPassword: '',
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form, edited: true, submited: false });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      const alertify = await import('alertifyjs');
      if (this.formValidation.valid) {
        this.safeSetState({ submitLoading: true }, async () => {
          const form = {...this.state.form};
          const result = await UserController.ChangePassword(form);
          
          if (!!result.data) {
            alertify.success('Password was changed successfully');
            form.newPassword = '';
            form.currentPassword = '';
            form.confirmPassword = '';
            this.safeSetState({ form, submited: false });
          }
          this.safeSetState({ submitLoading: false });
        });
      } else alertify.error(`Passwords don’t match`);
    });
  }

  public render() {
    const { form, edited, submitLoading } = this.state;

    return (
      <form className="G-main-form P-form-block G-mr-20">
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.current_password}</p>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            className={`G-main-input ${this.formValidation.errors.currentPassword ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.new_password}</p>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            className={`G-main-input ${this.formValidation.errors.newPassword ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.confirm_new_password}</p>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            className={`G-main-input ${this.formValidation.errors.confirmPassword ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        {edited && <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.submit}
        >{Settings.translations.save}</LoaderContent>}
      </form>
    );
  }
}

export default PasswordForm;