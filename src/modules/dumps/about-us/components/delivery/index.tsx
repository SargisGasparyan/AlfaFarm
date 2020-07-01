import * as React from 'react';
import Settings from 'platform/services/settings';
import About1Image from 'assets/images/about_1.png';

const Delivery = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${About1Image}") center/cover`}}
  >{Settings.translations.delivery}</div>
  <div className="P-about-texts">{Settings.translations.delivery_text}</div>
</>);

export default Delivery;