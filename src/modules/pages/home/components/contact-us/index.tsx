import * as React from 'react';

import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import Form from './components/form';
import AboutDelivery from './components/about-delivery';
import AboutBonusCard from './components/about-bonus-card';
import AboutMobileApp from './components/about-mobile-app';

import './style.scss';

const ContactUs = React.memo(() => (
  <section className="G-page P-home-contact-us">
    <ShadowText className="G-text-center">{Settings.translations.contact_us}</ShadowText>
    <Form />

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12194.10639610508!2d44.49654998689733!3d40.17509277030124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd0de1c97db3%3A0xb76b16c4777ba742!2sAlfa%20Pharm!5e0!3m2!1sen!2s!4v1594123006844!5m2!1sen!2s"
      tabIndex={0}
      frameBorder={0}
      className="P-maps"
      allowFullScreen={true}
      aria-hidden={false}
    />

    <div className="P-bottom">
      <AboutDelivery />
      <AboutBonusCard />
      <AboutMobileApp />
    </div>
  </section>
));

export default ContactUs;