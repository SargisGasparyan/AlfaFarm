import * as React from 'react';
import Settings from 'platform/services/settings';
import AboutUsImage from 'assets/images/about_us.jpg';

const AboutTheProject = React.memo(() => <>
  <div
    className="P-about-image"
    style={{ background: `url("${AboutUsImage}") center/cover`}}
  >{Settings.translations.about_the_project}</div>
  <div className="P-about-texts">
    <p>{Settings.translations.about_the_project_text}</p>
  </div>
</>);

export default AboutTheProject;