import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { countryCode } from 'platform/constants';
import { IUserModifyRequestModel } from 'platform/api/user/models/request';
import Storage from 'platform/services/storage';
import { validateForm } from './services/helper';
import UserController from 'platform/api/user';

interface IState {
  form: IUserModifyRequestModel;
  edited: boolean;
  submited: boolean;
  submitLoading: boolean;
};

class DetailsForm extends HelperComponent<{}, IState> {

  public state: IState = {
    edited: false,
    submited: false,
    submitLoading: false,
    form: {
      fullName: Storage.profile.fullName,
      email: Storage.profile.email,
      phoneNumber: Storage.profile.phoneNumber.substring(`+${countryCode}`.length),
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form, edited: true });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const form = {...this.state.form};
        form.phoneNumber = `+${countryCode}${form.phoneNumber}`;

        const result = await UserController.Update(form);
        
        if (result.data) window.location.reload();
        else this.safeSetState({ submitLoading: false });
      });
    });
  }

  public render() {
    const { form, edited, submitLoading } = this.state;

    return (
      <form className="G-main-form P-form-block G-mr-20">
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.full_name}</p>
          <input
            name="fullName"
            value={form.fullName}
            className={`G-main-input ${this.formValidation.errors.fullName ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.email}</p>
          <input
            name="email"
            value={form.email}
            className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field G-phone-input-wrapper">
          <p className="G-input-top-label">{Settings.translations.phone_number}</p>
          <p className="G-input-country-code">+{countryCode}</p>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            className={`G-main-input ${this.formValidation.errors.phoneNumber ? 'G-invalid-field' : ''}`}
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

export default DetailsForm;