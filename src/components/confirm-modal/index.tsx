import * as React from 'react';

import Modal from '../modal';
import LoaderContent from '../loader-content';
import Settings from 'platform/services/settings';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';

interface IProps {
  text?: string;
  title?: string;
  onClose?(): void;
  onConfirm?(): void;
};

const ConfirmModal = React.memo(({ text, title, onClose, onConfirm }: IProps) => {
  const [loading, setLoading] = React.useState(false);

  const confirm = () => {
    onConfirm && onConfirm();
    setLoading(true);
    window.dispatchEvent(new Event(DispatcherChannels.UserConfirmed));
  }

  const close = () => {
    onClose && onClose();
    window.dispatchEvent(new Event(DispatcherChannels.UserCanceled));
  }

  return (
    <Modal onClose={close} className="P-confirm-modal">
      <div className="G-fields-form">
        <h2>{title || Settings.translations.are_you_sure}</h2>
        <p>{text || Settings.translations.confirm_description}</p>
        <div className="G-flex">
        <span onClick={close}>{Settings.translations.no}</span>
        <LoaderContent loading={loading} onClick={confirm} className="G-form-button">{Settings.translations.yes}</LoaderContent>
        </div>
      </div>
    </Modal>
  );
});

export default ConfirmModal;