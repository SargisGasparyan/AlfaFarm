import * as React from 'react';

import Settings from 'platform/services/settings';
import Modal from 'components/modal';
import LoaderContent from 'components/loader-content';

import './style.scss';
import { countryCode } from 'platform/constants';

const OrderACall = React.memo(() => {
  const [open, setOpen] = React.useState<boolean>(false);

  return <>
    <button
      onClick={() => setOpen(true)}
      className="P-footer-order-a-call-button G-main-button"
    >{Settings.translations.order_a_call}</button>

    {open && <Modal className="P-footer-order-a-call-modal" onClose={() => setOpen(false)}>
      <h3 className="G-main-color G-text-center">{Settings.translations.enter_your_phone_number}</h3>
      <form className="G-main-form">
        <div className="G-phone-input-wrapper">
          <p className="G-input-country-code">+{countryCode}</p>
          <input
            className="G-main-input"
            placeholder={Settings.translations.phone_number}
          />
        </div>
        <LoaderContent className="G-main-button" loading={false}>{Settings.translations.order}</LoaderContent>
      </form>
    </Modal>}
  </>;
});

export default OrderACall;