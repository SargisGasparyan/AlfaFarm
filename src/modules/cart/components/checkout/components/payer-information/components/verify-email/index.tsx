import * as React from 'react';

import OrderController, { IOrderEmailVerifyRequestModel, IOrderPhoneNumberVerifyRequestModel } from 'platform/api/order';
import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  phoneNumber: string;
  onClose(code?: string): void;
};

interface IState {
  form: IOrderPhoneNumberVerifyRequestModel;
  submitLoading: boolean;
};

class VerifyEmail extends HelperComponent<IProps, IState> {

  public state: IState = {
    submitLoading: false,
    form: {
      phoneNumber: '',
      code: '',
    },
  };

  private changeCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { form } = this.state;
      form.code = e.currentTarget.value;
      this.safeSetState({ form });
    }
  }

  private submit = () => {
    const { phoneNumber } = this.props;
    const { form } = this.state;
    form.phoneNumber = phoneNumber;
    this.safeSetState({ submitLoading: true }, async () => {
      const result = await OrderController.PhoneNumberVerify(form);
      if (result.data) this.props.onClose(form.code);
      else this.safeSetState({ submitLoading: false });
    });
  }

  private onClose = () => this.props.onClose();

  public render() {
    const { phoneNumber: phoneNumber } = this.props;
    const { form, submitLoading } = this.state;

    return (
      <Modal onClose={this.onClose} className="P-checkout-verify-email-modal">
        <h2>{Settings.translations.verification}</h2>
        <p>{Settings.translations.verification_text} {phoneNumber}</p>
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
        </form>
      </Modal>
    );
  }
}

export default VerifyEmail;