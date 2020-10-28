import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';

import './style.scss';

@byRoute(ROUTES.VACANCIES)
class Vacancies extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-vacancies-page">
        <ShadowText className="G-page-title">{Settings.translations.vacancies}</ShadowText>
        <ListItem title="Դեղագետ" description="Դեղագործական ընկերությունը աշխատանքի է հրավիրում դեղագործների կամ դեղագետի դեղատանն աշխատելու համար: Հետաքրքրված անձիք կարող են իրենց ինքնակենսագրականը` Cv-ն ուղարկել example.example@gmail.com Էլեկտրոնային հասցեով` Թեմա դաշտում նշելով Դեղագործ, դեղագետ" />
        <ListItem title="Դեղագետ" description="Դեղագործական ընկերությունը աշխատանքի է հրավիրում դեղագործների կամ դեղագետի դեղատանն աշխատելու համար: Հետաքրքրված անձիք կարող են իրենց ինքնակենսագրականը` Cv-ն ուղարկել example.example@gmail.com Էլեկտրոնային հասցեով` Թեմա դաշտում նշելով Դեղագործ, դեղագետ" />
        <ListItem title="Դեղագետ" description="Դեղագործական ընկերությունը աշխատանքի է հրավիրում դեղագործների կամ դեղագետի դեղատանն աշխատելու համար: Հետաքրքրված անձիք կարող են իրենց ինքնակենսագրականը` Cv-ն ուղարկել example.example@gmail.com Էլեկտրոնային հասցեով` Թեմա դաշտում նշելով Դեղագործ, դեղագետ" />
        <ListItem title="Դեղագետ" description="Դեղագործական ընկերությունը աշխատանքի է հրավիրում դեղագործների կամ դեղագետի դեղատանն աշխատելու համար: Հետաքրքրված անձիք կարող են իրենց ինքնակենսագրականը` Cv-ն ուղարկել example.example@gmail.com Էլեկտրոնային հասցեով` Թեմա դաշտում նշելով Դեղագործ, դեղագետ" />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12194.10639610508!2d44.49654998689733!3d40.17509277030124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd0de1c97db3%3A0xb76b16c4777ba742!2sAlfa%20Pharm!5e0!3m2!1sen!2s!4v1594123006844!5m2!1sen!2s"
          tabIndex={0}
          frameBorder={0}
          className="P-maps"
          allowFullScreen={true}
          aria-hidden={false}
        />
      </section>
    );
  }
};

export default Vacancies;