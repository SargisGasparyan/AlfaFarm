import * as React from 'react';
import SocialLogin from 'react-social-login';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { SocialProvider } from 'platform/api/auth/constants/enums';

import FacebookImage from 'assets/images/facebook.png';
import GoogleImage from 'assets/images/google.png';
import Settings from 'platform/services/settings';

import './style.scss';

interface IProps {
  appId: string | number;
  provider: string;
  type: SocialProvider;
  triggerLogin?(): void; // From @SocialLogin
  onLoginSuccess(data: object, type: SocialProvider): void;
  onLoginFailure(error?: object): void;
};

@SocialLogin
class SocialButton extends HelperPureComponent<IProps, {}> {

  private get text() {
    const { type } = this.props;

    const texts = {
      [SocialProvider.Facebook]: 'Facebook',
      [SocialProvider.Google]: 'Google',
    };

    return Settings.translations.continue_with(texts[type]);
  }

  public render() {
    const { triggerLogin } = this.props;
    const buttonProps = {
      ...this.props,
      type: undefined,
      onClick: triggerLogin,
      className: 'P-auth-social-button',
    };

    delete buttonProps.triggerLogin;

    return (
      <button {...buttonProps}>
        <this.Icon />
        {this.text}
      </button>
    );
  }

  private Icon = () => {
    const { type } = this.props;

    const images = {
      [SocialProvider.Facebook]: FacebookImage,
      [SocialProvider.Google]: GoogleImage,
    };

    return <img src={images[type]} alt="social icon" />;
  }
}

export default SocialButton;