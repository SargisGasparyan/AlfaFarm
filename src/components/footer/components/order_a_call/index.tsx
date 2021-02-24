import * as React from 'react';

import Settings from 'platform/services/settings';
import Modal from 'components/modal';
import LoaderContent from 'components/loader-content';

import { countryCode } from 'platform/constants';
import SuccessModal from 'components/success-modal';
import HelperComponent from 'platform/classes/helper-component';
import { ICallRequestCreateRequestModel } from 'platform/api/callRequest/models/request';
import { validateForm } from './services/helper';

import './style.scss';
import CallRequestController from 'platform/api/callRequest';

interface IState {
  open: boolean;
  success: boolean;
  submited: boolean;
  submitLoading: boolean;
  form: ICallRequestCreateRequestModel;
}

class OrderACall extends HelperComponent<{}, IState> {
  public state: IState = {
    open: false,
    success: false,
    submited: false,
    submitLoading: false,
    form: {
      phoneNumber: '',
    }
  }

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private closeModal = () => { 
    const { form } = this.state;
    form.phoneNumber = '';
    this.safeSetState({ form, open: false, success: false });
  }

  private changePhone = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.phoneNumber = e.currentTarget.value;
    this.safeSetState({ form });
  }

  public Content = () => {
    const { success, submited, submitLoading, form } = this.state;

    return success ? <SuccessModal onClose={this.closeModal}>
      <h2>{Settings.translations.order_a_call_success}</h2>
    </SuccessModal> : <Modal className="P-footer-order-a-call-modal" onClose={this.closeModal}>
        <h3 className="G-main-color G-text-center">{Settings.translations.enter_your_phone_number}</h3>
        <form className="G-main-form">
          <div className="G-phone-input-wrapper G-main-form-field">
            <p className="G-input-country-code">+{countryCode}</p>
            <input
              className={`G-main-input ${submited && this.formValidation.errors.phoneNumber ? 'G-invalid-field' : ''}`}
              maxLength={8}
              placeholder={Settings.translations.phone_number}
              value={form.phoneNumber}
              onChange={this.changePhone}
            />
          </div>
          <LoaderContent
            className="G-main-button"
            loading={submitLoading}
            onClick={this.confirm}
          >{Settings.translations.order}</LoaderContent>
        </form>
      </Modal>
  };

  public confirm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, () => {
      const { form } = this.state;
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const result = await CallRequestController.Create(form);
        this.safeSetState({ submitLoading: false, success: result.success });
      });
    })
  };

  public render() {
    const { open } = this.state;

    return <>
      <button
        onClick={() => this.safeSetState({ submited: false, open: true })}
        className="P-footer-order-a-call-button G-main-button"
      >{Settings.translations.order_a_call}</button>
      {open ? <this.Content /> : null}
    </>;
  }

}

export default OrderACall;