import * as React from 'react';
import Settings from 'platform/services/settings';
import AboutUsImage from 'assets/images/about_us.jpg';

const HowWeWork = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${AboutUsImage}") center/cover`}}
  >{Settings.translations.how_we_work}</div>
  <div className="P-about-texts">{Settings.translations.how_we_work_text}</div>
</>);

export default HowWeWork;