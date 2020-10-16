import * as React from 'react';
import * as DateTime from 'react-datetime';

import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { countryCode } from 'platform/constants';
import { IUserModifyRequestModel } from 'platform/api/user/models/request';
import Storage from 'platform/services/storage';
import { validateForm } from './services/helper';
import UserController from 'platform/api/user';
import { GenderEnum } from 'platform/api/user/constants/enums/gender';
import Select from 'components/select';
import { GenderDropdown } from 'platform/constants/dropdowns';
import { IDropdownOption } from 'platform/constants/interfaces';
import { formatDate } from 'platform/services/helper';
import { Moment } from 'moment';

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
      firstName: Storage.profile.firstName,
      lastName: Storage.profile.lastName,
      email: Storage.profile.email,
      gender: Storage.profile.gender,
      dateOfBirth: Storage.profile.dateOfBirth,
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

  private changeGender = (chosen: IDropdownOption<GenderEnum>) => {
    const { form } = this.state;
    form.gender = chosen.value;
    this.safeSetState({ form, edited: true });
  }

  private changeDateOfBirth = (chosen: Moment) => {
    const { form } = this.state;
    form.dateOfBirth = chosen.toISOString();
    this.safeSetState({ form, edited: true });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const { form } = this.state;
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
          <p className="G-input-top-label">{Settings.translations.first_name}</p>
          <input
            name="firstName"
            value={form.firstName}
            className={`G-main-input ${this.formValidation.errors.firstName ? 'G-invalid-field' : ''}`}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.last_name}</p>
          <input
            name="lastName"
            value={form.lastName}
            className={`G-main-input ${this.formValidation.errors.lastName ? 'G-invalid-field' : ''}`}
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
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.gender}</p>
          <Select<GenderEnum>
            options={GenderDropdown()}
            value={form.gender}
            className={`G-main-select`}
            onChange={this.changeGender}
          />
        </div>
        <div className="G-main-form-field">
          <p className="G-input-top-label">{Settings.translations.date_of_birth}</p>
          <DateTime
            onChange={this.changeDateOfBirth}
            closeOnSelect={true}
            inputProps={{
              value: form.dateOfBirth ? formatDate(form.dateOfBirth, false) : '',
              readOnly: true,
              className: 'G-main-input',
            }}
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