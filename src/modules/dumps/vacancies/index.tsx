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
      </section>
    );
  }
};

export default Vacancies;