import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import RequestController, { RequestSendTypeEnum } from 'platform/api/request';
import { countryCode } from 'platform/constants';
import { isValidEmail, isValidNonCityPhone, phoneFieldPattern } from 'platform/services/validator';
import LoaderContent from 'components/loader-content';
import Storage from 'platform/services/storage';
import { IContactInfoModel } from 'platform/constants/interfaces';
import HelperComponent from 'platform/classes/helper-component';
import './style.scss';

interface IProps {
  onClose(endRequest?: boolean): void;
  ids: string[];
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: IContactInfoModel;
};

class ProductRequestContact extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  };

  public componentDidMount() {
    
    if (Storage.profile) {
      const { firstName, lastName, phoneNumber, email } = Storage.profile;
      this.safeSetState({ form: {
        type: RequestSendTypeEnum.Form,
        firstName,
        lastName,
        phoneNumber: phoneNumber ? phoneNumber.replace(countryCode, '') : '',
        email,
      }});
    }
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

  private checkForSend = async () => {
    const form = { ...this.state.form };
    const alertify = await import('alertifyjs');
    form.phoneNumber = `${countryCode}${form.phoneNumber}`;

    if (!Settings.token) form.idList = this.props.ids;
    // if (Settings.token) form.type = RequestSendTypeEnum.OnlyFiles;

    if (isValidEmail(form.email) &&
        isValidNonCityPhone(form.phoneNumber) &&
        form.firstName.length > 1 && form.lastName.length > 1) {
        this.safeSetState({ submitLoading: true }, async () => {
          const result = await RequestController.Send(form);
          if (result.success) {
            alertify.success(Settings.translations.request_success);
            this.props.onClose(true);
          } else this.safeSetState({ submitLoading: false });
        });
    }
  }

  public render() {
    const { submited, submitLoading, form } = this.state;
    const { onClose } = this.props;

    return (
      <Modal onClose={onClose} className="P-request-contact-modal">
        <h2>{Settings.translations.add_your_information}</h2>
        <form className="G-fields-form">
          <div className="G-field-wrap">
            <h4>{Settings.translations.name}</h4>
            <div className={`G-field ${submited && form.firstName.length < 2 ? 'G-invalid-field' : ''}`}>
              <input
                name="firstName"
                value={form.firstName}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="G-field-wrap">
            <h4>{Settings.translations.surname}</h4>
            <div className={`G-field ${submited && form.lastName.length < 2 ? 'G-invalid-field' : ''}`}>
              <input
                name="lastName"
                value={form.lastName}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="G-field-wrap">
            <h4>{Settings.translations.email}</h4>
            <div className={`G-field ${submited && !isValidEmail(form.email) ? 'G-invalid-field' : ''}`}>
              <input
                name="email"
                value={form.email}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="G-field-wrap">
            <h4>{Settings.translations.phone_number}</h4>
            <div className={`G-field ${submited && !isValidNonCityPhone(`${countryCode}${form.phoneNumber}`) ? 'G-invalid-field' : ''}`}>
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
            className="G-form-button"
            onClick={this.submit}
          >
            {Settings.translations.send}
          </LoaderContent>
        </form>
      </Modal>
    );
  }
};

export default ProductRequestContact;