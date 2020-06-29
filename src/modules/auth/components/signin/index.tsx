import * as React from 'react';

import AuthController, { ILoginRequestModel } from 'platform/api/auth';
import { OSTypeEnum } from 'platform/constants/enums';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { countryCode } from 'platform/constants';
import LoaderContent from 'components/loader-content';
import { ModalContentEnum } from 'modules/auth/constants/enums';

interface IProps {
  onTypeChange(type: ModalContentEnum): void;
};

class SignIn extends HelperComponent<IProps, {}> {

  private restorePassword = () => {
    const { onTypeChange } = this.props;
    onTypeChange(ModalContentEnum.Restore);
  }

  private signUp = () => {
    const { onTypeChange } = this.props;
    onTypeChange(ModalContentEnum.SignUp);
  }

  public render() {

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.log_in}</h3>
      <form className="G-main-form">
        <div className="G-phone-input-wrapper">
          <p className="G-input-country-code">+{countryCode}</p>
          <input
            placeholder={Settings.translations.phone_number}
            className="G-main-input"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder={Settings.translations.password}
            className="G-main-input"
          />
        </div>
        <LoaderContent className="G-main-button" loading={false}>{Settings.translations.log_in}</LoaderContent>
      </form>
      
      <span className="P-sign-in-restore-password" onClick={this.restorePassword}>{Settings.translations.restore_password}</span>

      <span className="P-sign-in-register-text">{Settings.translations.not_a_member}</span>
      <button className="G-main-ghost-button P-sign-in-register" onClick={this.signUp}>{Settings.translations.sign_up}</button>
    </>;
  }
}

export default SignIn;