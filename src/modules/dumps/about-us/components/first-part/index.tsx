import * as React from 'react';

import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';

import './style.scss';

const FirstPart = React.memo(() => <div className="P-about-us-first-part">
  <div className="P-image" />
  <div className="P-content">
    <ShadowText>{Settings.translations.about_us}</ShadowText>
    <p> {Settings.translations.about_us_first_1}<br /><br /> 
        {Settings.translations.about_us_first_2}<br /><br />
        {Settings.translations.about_us_first_3}</p>
  </div>
</div>);

export default FirstPart;