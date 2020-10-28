import * as React       from 'react';
import { createPortal } from 'react-dom';

import ClickOutside from '../click-outside';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClose?(): void;
  withoutPortal?: boolean;
};

interface IState {
  closed: boolean;
};

class Modal extends HelperPureComponent<IProps, IState> {

  public static defaultProps = {
    children: null,
    className: '',
  }

  public state: IState = {
    closed: false,
  }

  public componentDidMount() {
    // document.body.style.overflowY = 'hidden';
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    // document.body.style.overflowY = 'initial';
  }

  private close = (e: MouseEvent | React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    const { onClose } = this.props;
    onClose && onClose();
  }

  private Content = () => {
    const { children, className } = this.props;

    return (
      <div className={`P-modal-wrapper ${className || ''}`}>
        <ClickOutside onClickOutside={this.close}>
          <div className="P-modal-content">
            <i className="P-close icon-Group-5032" onClick={this.close} />
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