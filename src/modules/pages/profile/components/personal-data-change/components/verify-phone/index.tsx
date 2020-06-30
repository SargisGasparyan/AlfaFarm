import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import { countryCode } from 'platform/constants';
import UserController, { IUserVerifyPhoneRequestModal } from 'platform/api/user';
import LoaderContent from 'components/loader-content';
import Storage from 'platform/services/storage';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  phone: string;
  onClose(): void;
};

interface IState {
  form: IUserVerifyPhoneRequestModal;
  submitLoading: boolean;
  resendLoading: boolean;
};

class VerifyPhone extends HelperComponent<IProps, IState> {

  public state = {
    form: {
      phoneNumber: '',
      code: '',
    },
    submitLoading: false,
    resendLoading: false,
  };

  private changeCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { form } = this.state;
      form.code = e.currentTarget.value;
      this.safeSetState({ form });
    }
  }

  private submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.safeSetState({ submitLoading: true }, async () => {
      const { form } = this.state;
      form.phoneNumber = `${countryCode}${this.props.phone}`;
      const result = await UserController.VerifyPhone(form);
      const alertify = await import('alertifyjs');

      if (result.success) {
        this.props.onClose();
        Storage.profile.phoneNumber = `${countryCode}${this.props.phone}`;
        alertify.success(Settings.translations.phone_verify_success);
      } else if (!result.success) this.safeSetState({ submitLoading: false });
    });
  }

  private sendAgain = async () => this.safeSetState({ resendLoading: true }, async () => {
    const alertify = await import('alertifyjs');
    const resendForm = { phoneNumber: `${countryCode}${this.props.phone}` };
    const result = await UserController.EditPhone(resendForm);
    if (result.success) alertify.success(Settings.translations.phone_code_send_success);
    this.safeSetState({ resendLoading: false });
  });

  public render() {
    const { form, submitLoading, resendLoading } = this.state;
    const { onClose, phone } = this.props;

    return (
      <Modal onClose={onClose} className="P-verify-phone-modal">
        <h2>{Settings.translations.verification}</h2>
        <p>{Settings.translations.verification_text} +{countryCode}{phone}</p>
        <form className="G-fields-form">
          <div className="G-field">
            <input
              value={form.code}
              pattern="[0-9]{1,4}"
              onChange={this.changeCode}
            />
          </div>
          <LoaderContent
            loading={submitLoading}
            onClick={this.submit}
            disabled={form.code.length < 4}
            className="G-form-button"
          >
            {Settings.translations.ok}
          </LoaderContent>
          <LoaderContent
            type="button"
            loading={resendLoading}
            onClick={this.sendAgain}
            className="G-form-button G-form-button-transparent"
          >
            {!resendLoading && Settings.translations.send_again}
          </LoaderContent>
        </form>
      </Modal>
    );
  }
}

export default VerifyPhone;