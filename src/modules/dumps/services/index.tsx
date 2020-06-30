import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';

import './style.scss';

@byRoute(ROUTES.SERVICES)
class Services extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-services-page">
        <div className="P-header">
          <ShadowText>{Settings.translations.services}</ShadowText>
        </div>

        <div className="P-content">
          <p>{Settings.translations.services_text}</p>
          <div className="P-list-wrapper">
            <ListItem title="Մատակարարում ՀՀ ողջ տարածքով" description="«Ալֆա Ֆարմ» ընկերությունը իրականացնում է առաքում դեպի ՀՀ բոլոր մարզեր` մինիմումի հասցնելով պատվերի տրման և ապրանքի ստացման ժամանակահատվածը: Գրեթե բոլոր մարզերում իրականացվում է ամենօրյա մատակարարում, իսկ Երևանում` հնարավոր է օրական 2-3 անգամ:" />
            <ListItem title="Մատակարարում ՀՀ ողջ տարածքով" description="«Ալֆա Ֆարմ» ընկերությունը իրականացնում է առաքում դեպի ՀՀ բոլոր մարզեր` մինիմումի հասցնելով պատվերի տրման և ապրանքի ստացման ժամանակահատվածը: Գրեթե բոլոր մարզերում իրականացվում է ամենօրյա մատակարարում, իսկ Երևանում` հնարավոր է օրական 2-3 անգամ:" />
            <ListItem title="Մատակարարում ՀՀ ողջ տարածքով" description="«Ալֆա Ֆարմ» ընկերությունը իրականացնում է առաքում դեպի ՀՀ բոլոր մարզեր` մինիմումի հասցնելով պատվերի տրման և ապրանքի ստացման ժամանակահատվածը: Գրեթե բոլոր մարզերում իրականացվում է ամենօրյա մատակարարում, իսկ Երևանում` հնարավոր է օրական 2-3 անգամ:" />
            <ListItem title="Մատակարարում ՀՀ ողջ տարածքով" description="«Ալֆա Ֆարմ» ընկերությունը իրականացնում է առաքում դեպի ՀՀ բոլոր մարզեր` մինիմումի հասցնելով պատվերի տրման և ապրանքի ստացման ժամանակահատվածը: Գրեթե բոլոր մարզերում իրականացվում է ամենօրյա մատակարարում, իսկ Երևանում` հնարավոր է օրական 2-3 անգամ:" />
            <ListItem title="Մատակարարում ՀՀ ողջ տարածքով" description="«Ալֆա Ֆարմ» ընկերությունը իրականացնում է առաքում դեպի ՀՀ բոլոր մարզեր` մինիմումի հասցնելով պատվերի տրման և ապրանքի ստացման ժամանակահատվածը: Գրեթե բոլոր մարզերում իրականացվում է ամենօրյա մատակարարում, իսկ Երևանում` հնարավոր է օրական 2-3 անգամ:" />
          </div>
        </div>
      </section>
    );
  }
};

export default Services;