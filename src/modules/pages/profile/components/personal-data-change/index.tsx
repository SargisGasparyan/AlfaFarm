import * as React from 'react';

import { countryCode } from 'platform/constants';
import Settings from 'platform/services/settings';
import Storage from 'platform/services/storage';
import LoaderContent from 'components/loader-content';
import { phoneFieldPattern, isValidPhone, isValidEmail } from 'platform/services/validator';
import UserController, { IUserEditRequestModal, IUserEditPhoneRequestModal } from 'platform/api/user';
import VerifyPhone from './components/verify-phone';
import HelperComponent from 'platform/classes/helper-component';

interface IState {
  form: IUserEditRequestModal;
  phoneForm: IUserEditPhoneRequestModal;
  submited: boolean;
  verifyOpen: boolean;
  submitLoading: boolean;
};

class PersonalDataChange extends HelperComponent<{}, IState> {

  public state: IState = {
    form: {
      firstName: '',
      lastName: '',
      email: ''
    },
    phoneForm: {
      phoneNumber: '',
    },
    submited: false,
    verifyOpen: false,
    submitLoading: false,
  };

  public componentDidMount() {
    
      Storage.fetchDefault().then( ()=> {
        const { firstName, lastName, phoneNumber, email } = Storage.profile;
        
        this.safeSetState({
          form: {
            firstName,
            lastName,
            email,
          },
          phoneForm: {
            phoneNumber: phoneNumber ? phoneNumber.replace(countryCode, '') : '',
          },
        });
      })
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private changePhoneField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { phoneForm } = this.state;
      phoneForm.phoneNumber = e.currentTarget.value;
      this.safeSetState({ phoneForm });
    }
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (!submited) this.safeSetState({ submited: true }, this.checkForSubmit);
    else this.checkForSubmit();
  }

  private checkForSubmit = async () => {
    const { form } = this.state;
    const phoneForm = {...this.state.phoneForm};
    const alertify = await import('alertifyjs');
    phoneForm.phoneNumber = phoneForm.phoneNumber ? `${countryCode}${phoneForm.phoneNumber}` : '';

    const phoneNumberValid = !phoneForm.phoneNumber || isValidPhone(phoneForm.phoneNumber);
    const formChanged = form.firstName !== Storage.profile.firstName || form.lastName !== Storage.profile.lastName;
    const phoneFormChanged = phoneForm.phoneNumber !== Storage.profile.phoneNumber;

    if ((formChanged || phoneFormChanged) &&
        form.firstName.length > 1 && form.lastName.length > 1 &&
        phoneNumberValid) this.safeSetState({ submitLoading: true }, async () => {
      if (formChanged) {
        
        const result = await UserController.Edit(form);
        if (result.success) {
          Storage.profile.firstName = form.firstName;
          Storage.profile.lastName = form.lastName;
          alertify.success(Settings.translations.personal_data_success);
        }
      }

      if (phoneFormChanged) {
        const result = await UserController.EditPhone(phoneForm);
        if (result.success && phoneForm.phoneNumber) {
          alertify.success(Settings.translations.phone_code_send_success);
          this.safeSetState({ verifyOpen: true });
        }
      }
      this.safeSetState({ submitLoading: false });
    });
  };

  private closeVerify = () => this.safeSetState({ verifyOpen: false });

  public render() {
    const { form, phoneForm, submited, submitLoading, verifyOpen } = this.state;

    return (
      <form className="P-personal-data G-fields-form">
        <h2>{Settings.translations.personal_data}</h2>
        <div className="G-half-field-wrap">
          <h4>{Settings.translations.name}</h4>
          <div className={`G-field ${submited && form.firstName.length < 2 ? 'G-invalid-field' : ''}`}>
            <input
              name="firstName"
              value={form.firstName}
              onChange={this.changeField}
            />
          </div>
        </div>
        <div className="G-half-field-wrap">
          <h4>{Settings.translations.surname}</h4>
          <div className={`G-field ${submited && form.lastName.length < 2 ? 'G-invalid-field' : ''}`}>
            <input
              name="lastName"
              value={form.lastName}
              onChange={this.changeField}
            />
          </div>
        </div>
        <div className="G-half-field-wrap">
          <h4>{Settings.translations.phone_number}</h4>
          <div className={`G-field ${submited && phoneForm.phoneNumber && !isValidPhone(`${countryCode}${phoneForm.phoneNumber}`) ? 'G-invalid-field' : ''}`}>
           <p>+{countryCode}</p>
            <input
              value={phoneForm.phoneNumber}
              pattern={phoneFieldPattern}
              onChange={this.changePhoneField}
            />
          </div>
        </div>

        <div className="G-half-field-wrap">
          <h4>{Settings.translations.email}</h4>
          <div className={`G-field ${submited && !isValidEmail(form.email)} ? 'G-invalid-field' : ''}`}>
            <input
              name="email"
              value={form.email}
              onChange={this.changeField}
            />
          </div>
        </div>

        <div className="P-submit">
          <LoaderContent
            onClick={this.submit}
            loading={submitLoading}
            className="G-form-button"
          >
            {Settings.translations.save_changes}
          </LoaderContent>
        </div>

        {verifyOpen && phoneForm.phoneNumber && <VerifyPhone phone={phoneForm.phoneNumber} onClose={this.closeVerify} />}
      </form>
    );
  };
};

export default PersonalDataChange;
