import * as React from 'react';
import Settings from 'platform/services/settings';
import AboutUsImage from 'assets/images/about_us.jpg';

const Adventages = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${AboutUsImage}") center/cover`}}
  >{Settings.translations.the_advantages_of_cooperation}</div>
  <div className="P-about-texts">{Settings.translations.adventages_text}</div>
</>);

export default Adventages;