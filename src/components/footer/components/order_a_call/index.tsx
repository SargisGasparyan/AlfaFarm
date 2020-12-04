import * as React from 'react';

import Settings from 'platform/services/settings';
import Modal from 'components/modal';
import LoaderContent from 'components/loader-content';

import { countryCode } from 'platform/constants';
import SuccessModal from 'components/success-modal';

import './style.scss';

const OrderACall = React.memo(() => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const Content = () => success ? <SuccessModal
    text="Շնորհակալություն, զանգի հայտն ընդունված է։ Մեր օպերատորը շուտով կապ կհաստատի Ձեզ հետ։"
    onClose={() => { setOpen(false); setSuccess(false) }}
  /> : <Modal className="P-footer-order-a-call-modal" onClose={() => { setOpen(false); setSuccess(false) }}>
    <h3 className="G-main-color G-text-center">{Settings.translations.enter_your_phone_number}</h3>
    <form className="G-main-form">
      <div className="G-phone-input-wrapper G-main-form-field">
        <p className="G-input-country-code">+{countryCode}</p>
        <input
          className="G-main-input"
          maxLength={8}
          placeholder={Settings.translations.phone_number}
        />
      </div>
      <LoaderContent className="G-main-button" loading={false} onClick={() => setSuccess(true)}>{Settings.translations.order}</LoaderContent>
    </form>
  </Modal>;

  return <>
    <button
      onClick={() => setOpen(true)}
      className="P-footer-order-a-call-button G-main-button"
    >{Settings.translations.order_a_call}</button>

    {open ? <Content /> : null}
  </>;
});

export default OrderACall;