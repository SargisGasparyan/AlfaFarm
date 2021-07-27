import * as React       from 'react';
import { createPortal } from 'react-dom';

import ClickOutside from '../click-outside';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClose?(): void;
  unclosable?: boolean;
  withoutPortal?: boolean;
};

class Modal extends HelperComponent<IProps, {}> {
  public componentDidMount() {
    document.body.style.overflowY = 'hidden';
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    document.body.style.overflowY = 'initial';
  }

  private close = (e: MouseEvent | React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    const { onClose, unclosable } = this.props;
    onClose && !unclosable && onClose();
  }

  private Content = () => {
    const { children, unclosable, className } = this.props;

    return (
      <div className={`P-modal-wrapper ${className || ''}`}>
        <ClickOutside onClickOutside={this.close}>
          <div className="P-modal-content">
            {!unclosable && <i className="P-close icon-Group-5032" onClick={this.close} />}
            <div>{children}</div>
          </div>
        </ClickOutside>
      </div>
    );
  }

  public render() {
    const { withoutPortal } = this.props;
    return withoutPortal ? <this.Content /> : createPortal(
      <this.Content />,
      document.getElementById('P-modals') as Element,
    );
  }
}

export default Modal;
