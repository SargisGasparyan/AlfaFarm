import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';

class ContactUs extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-home-contact-us">
        <ShadowText className="G-text-center">{Settings.translations.contact_us}</ShadowText>
      </section>
    );
  }
};

export default ContactUs;