import * as React from 'react';

import Settings from 'platform/services/settings';
import Modal from 'components/modal';
import LoaderContent from 'components/loader-content';

import { countryCode } from 'platform/constants';
import SuccessModal from 'components/success-modal';

import './style.scss';
import HelperComponent from 'platform/classes/helper-component';
interface IState {
  open: boolean;
  success: boolean;
  submitted: boolean;
  content: string;
}
class OrderACall extends HelperComponent<{}, IState> {
  public state: IState = {
    open: false,
    success: false,
    submitted: false,
    content: ''
  }

  public Content = () => {
    const { success, submitted, content } = this.state;
    return success ? <SuccessModal
      onClose={() => this.safeSetState({ isOpen: false, success: false })}
    ><h2>Շնորհակալություն, զանգի հայտն ընդունված է։ Մեր օպերատորը շուտով կապ կհաստատի Ձեզ հետ։</h2></SuccessModal> : <Modal className="P-footer-order-a-call-modal" onClose={() => this.safeSetState({ open: false, success: false })}>
        <h3 className="G-main-color G-text-center">{Settings.translations.enter_your_phone_number}</h3>
        <form className="G-main-form">
          <div className="G-phone-input-wrapper G-main-form-field">
            <p className="G-input-country-code">+{countryCode}</p>
            <input
              className={`G-main-input ${submitted && content.length && (content.length < 8 || !Number(content)) ? 'G-invalid-field' : ''}`}
              maxLength={8}
              placeholder={Settings.translations.phone_number}
              value={content}
              onChange={(e: React.SyntheticEvent<HTMLInputElement>) => { this.safeSetState({ submitted: false, content: e.currentTarget.value }) }}
            />
          </div>
          <LoaderContent className="G-main-button" loading={false} onClick={this.confirm}>{Settings.translations.order}</LoaderContent>
        </form>
      </Modal>
  };
  public confirm = (e: React.SyntheticEvent) => {
    e.preventDefault(); this.safeSetState({ submitted: true }, () => {
    console.log(this.state);

      const { submitted, content } = this.state;
      if (submitted && content.length === 8 && Number(content)) {
        this.safeSetState({ open: false });
        window.location.reload();
      }
    })
  };
  public render() {
    const { open } = this.state;
    return <>
      <button
        onClick={() => this.safeSetState({ submitted: false, open: true })}
        className="P-footer-order-a-call-button G-main-button"
      >{Settings.translations.order_a_call}</button>
      {open ? <this.Content /> : null}
    </>;
  }

}

export default OrderACall;