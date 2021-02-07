import * as React  from 'react';
import LaddaButton from 'react-ladda';

import HelperPureComponent from 'platform/classes/helper-pure-component';

interface IProps {
  type?: string;
  className: string;
  color?: string;
  disabled: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  imageContent: boolean;
  style?: object;
  onClick?(e: React.SyntheticEvent<HTMLElement>): void;
};

interface IState {
  loading: boolean;
};

class LoaderContent extends HelperPureComponent<IProps, IState> {

  public static defaultProps = {
    type: null,
    className: '',
    disabled: false,
    children: null,
    loading: false,
    imageContent: false,
  };
  
  public state: IState = {
    loading: false,
  }

  private loadingTimeout: NodeJS.Timer;

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.loading !== this.state.loading && nextProps.loading) {
      this.loadingTimeout = setTimeout(() => this.safeSetState({ loading: true }), 500);
    } else if(nextProps.loading !== this.state.loading && this.state.loading) {
      clearTimeout(this.loadingTimeout);
      this.safeSetState({ loading: false });
    }
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this.loadingTimeout);
  }

  public render() {
    const { children, className, imageContent, color } = this.props;
    const filteredProps = {...this.props};
    delete filteredProps.imageContent;
    delete filteredProps.className;
    !filteredProps.type && delete filteredProps.type;
    filteredProps.className = `${className}${imageContent ? ' ladda-image' : ''}`

    return <LaddaButton
      data-spinner-size={30}
      data-spinner-lines={40}
      data-spinner-color={ color || '#FFF'}
      {...filteredProps}
    >{children}</LaddaButton>;
  };
};


export default LoaderContent;