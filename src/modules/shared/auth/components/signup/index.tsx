import * as React from 'react';
import * as DateTime from 'react-datetime';

import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { RegisterForm, validateForm } from './services/helper';
import { ModalContentEnum } from '../../constants/enums';
import UserController from 'platform/api/user';
import Select from 'components/select';
import { GenderEnum } from 'platform/api/user/constants/enums/gender';
import { GenderDropdown } from 'platform/constants/dropdowns';
import { formatDate } from 'platform/services/helper';
import { Moment } from 'moment';
import { IDropdownOption } from 'platform/constants/interfaces';


interface IProps {
  onTypeChange(type: ModalContentEnum): void;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: RegisterForm;
};

class SignUp extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      firstName: '',
      lastName: '',
      password: '',
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
    this.safeSetState({ form })
  }

  private changeGender = (chosen: IDropdownOption<GenderEnum>) => {
    const { form } = this.state;
    form.gender = chosen.value;
    this.safeSetState({ form });
  }

  private changeDateOfBirth = (chosen: Moment) => {
    const { form } = this.state;
    form.dateOfBirth = chosen.toISOString();
    this.safeSetState({ form });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!!Settings.authToken) Settings.token = Settings.authToken;
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const { form } = this.state;
        if (Settings.referralCode) form.referralCode = Settings.referralCode;

        const result = await UserController.Register(form);
        if (result.data) {
          Settings.referralCode = '';
          window.location.reload();
        } else this.safeSetState({ submitLoading: false });
      });
    });
  }

  private isValidDate = (date: moment.Moment) => {
    const invalidDate = new Date();
    return !date.isSameOrAfter(invalidDate);
  }
  public render() {
    const { form, submitLoading } = this.state;

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.personal_data}</h3>
      <form className="G-main-form">
        <div className="G-main-form-field">
          <input
            name="firstName"
            value={form.firstName}
            placeholder={Settings.translations.first_name}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.firstName ? 'G-invalid-field' : ''}`}
          />
        </div>
        <div className="G-main-form-field">
          <input
            name="lastName"
            value={form.lastName}
            placeholder={Settings.translations.last_name}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.lastName ? 'G-invalid-field' : ''}`}
          />
        </div>
        <div className="G-main-form-field">
          <Select<GenderEnum>
            placeholder={Settings.translations.gender}
            options={GenderDropdown()}
            value={form.gender}
            className={`G-main-select ${this.formValidation.errors.gender ? 'G-invalid-select' : ''}`}
            onChange={this.changeGender}
          />
        </div>
        <div className="G-main-form-field">
          <DateTime
            onChange={this.changeDateOfBirth}
            timeFormat={false}
            isValidDate={this.isValidDate}
            closeOnSelect={true}
            inputProps={{
              value: form.dateOfBirth ? formatDate(form.dateOfBirth, false) : '',
              readOnly: true,
              className: `G-main-input ${this.formValidation.errors.dateOfBirth ? 'G-invalid-field' : ''}`,
              placeholder: Settings.translations.date_of_birth,
            }}
          />
        </div>
        <div className="G-main-form-field">
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder={Settings.translations.password}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.password ? 'G-invalid-field' : ''}`}
          />
        </div>
        <div className="G-main-form-field">
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            placeholder={Settings.translations.confirm_password}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.confirmPassword ? 'G-invalid-field' : ''}`}
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

export default SignUp;
