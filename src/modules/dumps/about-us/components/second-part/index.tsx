import * as React from 'react';

import './style.scss';
import Settings from "../../../../../platform/services/settings";

const SecondPart = React.memo(() => <div className="P-about-us-second-part">
  <div className="P-content">
    <span className="P-main-color-border" />
    <p>{Settings.translations.about_us_1}</p>
    <br/>
    <br/>
    <p>{Settings.translations.about_us_2}</p>
  </div>
  <div className="P-image" />
</div>);

export default SecondPart;
