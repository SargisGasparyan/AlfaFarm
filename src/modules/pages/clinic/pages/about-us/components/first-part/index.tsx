import * as React from 'react';

import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';
import './style.scss';

const FirstPart = React.memo(() => <div className="P-clinic-about-us-first-part P-clinic-about-us-tablet">
  <div className="P-image" />
  <div className="P-content">
    <ShadowText>{Settings.translations.about_us}</ShadowText>
    <p>«Ալֆա Ֆարմ» դեղագործական ընկերությունը հիմնադրվել է 1996 թ.-ին: Ներկայումս ընկերությունը զբաղեցնում է առաջատար դիրք Հայաստանի դեղագործական շուկայում և շուրջ 20 տարի հաջողությամբ զբաղվում է դեղամիջոցների ներկրմամբ, մեծածախ և մանրածախ առևտրով:<br /><br /> Ընկերության հիմնադիրներ են հանդիսանում հայաստանի դեղագործական ոլորտում բազմամյա փորձ ունեցող անձիք, որոնց մասնագիտական և կազմակերպչական ունակությունների շնորհիվ ընկերությունը բարձրորակ ծառայություններ է մատուցում հանրությանը, ինչպես նաև տարբեր ժամանակահատվածներում, որպես ընկերության բաժնետեր են հանդիսացել «Վերակառուցման և Զարգացման Եվրոպական Բանկը» (EBRD) և դեղագործական ոլորտի այլ խոշոր եվրոպական ներդրողներ:</p>
  </div>
</div>);

export default FirstPart;