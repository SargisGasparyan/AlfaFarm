import * as React from 'react';

import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { countryCode } from 'platform/constants';

class SignUp extends HelperComponent<{}, {}> {

  public render() {

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.sign_up}</h3>
      <form className="G-main-form">
        <div className="G-phone-input-wrapper">
          <p className="G-input-country-code">+{countryCode}</p>
          <input
            placeholder={Settings.translations.phone_number}
            className="G-main-input"
          />
        </div>
        <LoaderContent className="G-main-button" loading={false}>{Settings.translations.next}</LoaderContent>
      </form>
    </>;
  }
}

export default SignUp;
