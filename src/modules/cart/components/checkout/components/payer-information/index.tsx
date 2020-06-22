import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import { countryCode } from 'platform/constants';
import { isValidEmail, isValidNonCityPhone, phoneFieldPattern } from 'platform/services/validator';
import LoaderContent from 'components/loader-content';
import OrderController, { IOrderRequestModel } from 'platform/api/order';
import VerifyEmail from './components/verify-email';
import { IContactInfoModel } from 'platform/constants/interfaces';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  onClose(data?: IContactInfoModel): void;
  value: IOrderRequestModel;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  verifyOpen: boolean;
  form: IContactInfoModel;
};

class PayerInformation extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    verifyOpen: false,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  };

  public componentDidMount() {
    
    const { value } = this.props;
    const { form } = this.state;

    if (value.guestName) form.firstName = value.guestName;
    if (value.guestPhoneNumber) form.phoneNumber = value.guestPhoneNumber.substr(countryCode.length);
    if (value.email) form.email = value.email;

    this.safeSetState({ form });
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { form } = this.state;
      form[e.currentTarget.name] = e.currentTarget.value;
      this.safeSetState({ form });
    }
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (!submited) this.safeSetState({ submited: true }, this.checkForSend);
    else this.checkForSend();
  }

  private checkForSend = () => {
    const { value } = this.props;
    const { form } = this.state;

    if (isValidNonCityPhone( `${countryCode}${form.phoneNumber}`) &&
      form.firstName.length > 1
    ) this.safeSetState({ submitLoading: true }, async () => {
      if (value.phoneNumber !== form.phoneNumber) {
        const result = await OrderController.PhoneNumber(
          {
             phoneNumber: '374' + form.phoneNumber,
             email: form.email
          });

        if (result.success) this.safeSetState({ verifyOpen: true });
        else this.safeSetState({ submitLoading: false });  
      } else this.props.onClose({
        ...form,
        phoneNumber: `${countryCode}${form.phoneNumber}`,
      });
    });
  }

  private onClose = () => this.props.onClose();

  private onVerifyClose = (code?: string) => {
    if (code) {
      const { form } = this.state;

      this.props.onClose({
        ...form,
        phoneNumber: `${countryCode}${form.phoneNumber}`,
        code,
      });
    } else this.props.onClose();
  }

  public render() {
    const { submited, submitLoading, verifyOpen, form } = this.state;

    return !verifyOpen ? (
      <Modal onClose={this.onClose} className="P-payer-information-modal">
        <h2>{Settings.translations.add_your_information}</h2>
        <form className="P-G-fields-form">
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.name}</h4>
            <div className={`P-G-field ${submited && form.firstName.length < 2 ? 'P-G-invalid-field' : ''}`}>
              <input
                name="firstName"
                value={form.firstName}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.email}</h4>
            <div className={`P-G-field`}>
              <input
                name="email"
                value={form.email}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.phone_number}</h4>
            <div className={`P-G-field ${submited && !isValidNonCityPhone(`${countryCode}${form.phoneNumber}`) ? 'P-G-invalid-field' : ''}`}>
              <p>+{countryCode}</p>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                pattern={phoneFieldPattern}
                onChange={this.changeField}
              />
            </div>
          </div>
          <LoaderContent
            loading={submitLoading}
            className="P-G-form-button"
            onClick={this.submit}
          >
            {Settings.translations.send}
          </LoaderContent>
        </form>
      </Modal>
    ) : <VerifyEmail phoneNumber={'374' + form.phoneNumber} onClose={this.onVerifyClose} />;
  }
};

export default PayerInformation;