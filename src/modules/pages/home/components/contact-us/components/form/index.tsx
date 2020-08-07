import * as React from 'react';

import HelperComponent from "platform/classes/helper-component";
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';

class Form extends HelperComponent<{}, {}> {

  public render() {

    return (
      <form className="G-main-form G-auto-margin-left G-auto-margin-right">
        <div className="G-main-form-field">
          <input
            placeholder={Settings.translations.name}
            className="G-main-input"
          />
        </div>
        <div className="G-main-form-field">
          <input
            placeholder={Settings.translations.email}
            className="G-main-input"
          />
        </div>
        <div className="G-main-form-field">
          <textarea
            placeholder={Settings.translations.message}
            className="G-main-textarea"
          />
        </div>
        <LoaderContent
          loading={false}
          className="G-main-button"
        >{Settings.translations.send}</LoaderContent>
      </form>
    );
  }
};

export default Form;