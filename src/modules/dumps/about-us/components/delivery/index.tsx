import * as React from 'react';
import Settings from 'platform/services/settings';
import AboutUsImage from 'assets/images/about_us.jpg';

const Delivery = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${AboutUsImage}") center/cover`}}
  >{Settings.translations.delivery}</div>
  <div className="P-about-texts">{Settings.translations.delivery_text}</div>
</>);

export default Delivery;