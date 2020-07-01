import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';

import ClinicImage from 'assets/images/clinic_background.png';

import './style.scss';

class Options extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <div className="G-page P-clinic-options" style={{ background: `url('${ClinicImage}') center/cover` }}>
        <ShadowText>{Settings.translations.clinic}</ShadowText>
        <button className="G-main-ghost-button">{Settings.translations.doctors}</button>
        <button className="G-main-ghost-button">{Settings.translations.laboratory}</button>
        <button className="G-main-ghost-button">{Settings.translations.price_list}</button>
        <button className="G-main-ghost-button">{Settings.translations.about_us}</button>
      </div>
    );
  };
};

export default Options;