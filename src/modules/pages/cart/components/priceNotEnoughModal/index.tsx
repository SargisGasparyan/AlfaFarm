import * as React from 'react';

import Settings from 'platform/services/settings';
import Modal from 'components/modal';

import './style.scss';

interface IProps {
  onClose(): void;
};

export const PriceNotEnoughModal = React.memo(({ onClose }: IProps) => (
  <Modal onClose={onClose} className="P-cart-price-not-enough-modal">
    <div className="G-fields-form">
      <p>{Settings.translations.basket_at_least_2000}</p>
      <button onClick={onClose} className="G-form-button">{Settings.translations.ok}</button>
    </div>
  </Modal>
));