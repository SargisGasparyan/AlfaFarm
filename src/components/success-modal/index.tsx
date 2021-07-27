import * as React from 'react';

import Modal from '../modal';
import LoaderContent from '../loader-content';
import Settings from 'platform/services/settings';

import './style.scss';
import { Link } from 'react-router-dom';

interface IProps {
  onClose(): void;
  children: string | React.ReactNode;
  link?: {
    path: string;
    name: string;
  };
};

const SuccessModal = React.memo(({ onClose, children, link }: IProps) => (
  <Modal onClose={onClose} className="P-success-modal">
    <i className="icon-Group-5535" />
    {children}
    {!!link && <Link to={link.path} className="G-main-button P-link-item G-full-width G-no-text-decoration G-text-center">{link.name}</Link>}
  </Modal>
));

export default SuccessModal;
