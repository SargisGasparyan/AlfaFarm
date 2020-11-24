import * as React from 'react';

import Modal from '../modal';
import LoaderContent from '../loader-content';
import Settings from 'platform/services/settings';

import './style.scss';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

interface IProps {
  onClose?(): void;
  onConfirm?(): void;
};

const ConfirmModal = React.memo(({ onClose, onConfirm }: IProps) => {
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
        <h2>{Settings.translations.are_you_sure}</h2>
        <p>{Settings.translations.confirm_description}</p>
        <LoaderContent loading={loading} onClick={confirm} className="G-form-button">{Settings.translations.confirm}</LoaderContent>
      </div>
    </Modal>
  );
});

export default ConfirmModal;