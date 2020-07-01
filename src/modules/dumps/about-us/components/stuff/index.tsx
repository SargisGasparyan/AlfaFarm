import * as React from 'react';

import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';

import './style.scss';

const Stuff = React.memo(() => <div className="P-about-us-stuff">
  <ShadowText>{Settings.translations.stuff}</ShadowText>
  <p>Մեր ընկերության աշխատակազմը բաղկացած է ավելի քան 800 աշխատակիցներից, որոնց թվում են ընկերության ուսուցման կենտրոնում շարունակական կրթություն ստացող բարձրակարգ դեղագետները, լոգիստիկայի մասնագետները, վաճառքի մենեջերները և ղեկավար անձնակազմը: Մեր ամենօրյա աշխատանքի նպատակն է աջակցել տարբեր հիվանդությունների դեմ արդյունավետ պայքարին, օգնել մայրերին ճիշտ կերակրել իրենց երեխաներին, առաջարկել բարձրորակ կոսմետիկա և օպտիկա:</p>

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97583.88432369805!2d44.418527387344774!3d40.15350050870056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da526a!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1593078450542!5m2!1sen!2s"
    tabIndex={0}
    frameBorder={0}
    className="P-maps"
    allowFullScreen={true}
    aria-hidden={false}
  />
</div>);

export default Stuff;