import * as React from 'react';

import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';

class PasswordChange extends HelperComponent<{}, {}> {

  public render() {

    return (
      <div className="P-change-password P-G-fields-form">
        <h2>{Settings.translations.change_password}</h2>
      </div>
    );
  };
};

export default PasswordChange;