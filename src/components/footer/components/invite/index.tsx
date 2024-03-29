import * as React from 'react';
import * as copy from 'copy-to-clipboard';

import Settings from 'platform/services/settings';
import Modal from 'components/modal';
import BonusCardController from 'platform/api/bonusCard';

import './style.scss';

const Invite = React.memo(() => {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    BonusCardController.GetReferralLink().then(result => {
      result.data && result.success && setLink(result.data.link);
    });
  }, []);

  const copyLink = async () => {
    copy(link);
    const alertify = await import('alertifyjs');
    alertify.success(Settings.translations.copied_to_clipboard)
  }

  const Content = () => link ? <Modal className="P-footer-order-a-call-modal" onClose={() => setOpen(false)}>
    <h3 className="G-clr-main G-text-center">{Settings.translations.use_the_link}</h3>
    <div className="G-main-form">
      <div className="G-main-form-field">
        <input
          readOnly={true}
          defaultValue={link}
          className="G-main-input"
          placeholder={Settings.translations.phone_number}
        />
      </div>
      <button className="G-main-button" onClick={() => copyLink()}>{Settings.translations.copy}</button>
    </div>
  </Modal> : null;

  return <>
    <button
      onClick={() => setOpen(true)}
      className="P-footer-invite-button G-main-button"
    >{Settings.translations.invite}</button>

    {open ? <Content /> : null}
  </>;
});

export default Invite;
