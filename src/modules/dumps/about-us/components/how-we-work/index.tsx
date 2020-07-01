import * as React from 'react';
import Settings from 'platform/services/settings';
import About1Image from 'assets/images/about_1.png';

const HowWeWork = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${About1Image}") center/cover`}}
  >{Settings.translations.how_we_work}</div>
  <div className="P-about-texts">{Settings.translations.how_we_work_text}</div>
</>);

export default HowWeWork;