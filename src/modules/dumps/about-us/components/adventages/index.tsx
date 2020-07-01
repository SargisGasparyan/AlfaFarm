import * as React from 'react';
import Settings from 'platform/services/settings';
import About1Image from 'assets/images/about_1.png';

const Adventages = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${About1Image}") center/cover`}}
  >{Settings.translations.the_advantages_of_cooperation}</div>
  <div className="P-about-texts">{Settings.translations.adventages_text}</div>
</>);

export default Adventages;