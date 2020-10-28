import * as React from 'react';

import Modal from '../modal';
import LoaderContent from '../loader-content';
import Settings from 'platform/services/settings';

import './style.scss';

interface IProps {
  onClose(): void;
  text: string;
};

const SuccessModal = React.memo(({ onClose, text }: IProps) => (
  <Modal onClose={onClose} className="P-success-modal">
    <i className="icon-Group-5535" />
    <h2>{text}</h2>
  </Modal>
));

export default SuccessModal;