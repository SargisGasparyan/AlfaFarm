import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import Modal from 'components/modal';

import './style.scss';
import Settings from 'platform/services/settings';

interface IProps {
  onClose(): void;
};

class SpecialProductHelp extends HelperPureComponent<IProps, {}> {
  public render() {
    const { onClose } = this.props;

    return (
      <Modal onClose={() => onClose()} className="P-special-product-help-modal">
        <div className="P-special-product-help-content">
          {Settings.translations.special_products_help}
        </div>
      </Modal>
    );
  }
}

export default SpecialProductHelp;