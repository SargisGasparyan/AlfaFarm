import * as React from 'react';

import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';

import './style.scss';

const ForPartners = React.memo(() => (
  <section className="G-page P-home-for-partners">
    <h2 className="G-page-title">{Settings.translations.how_to_become_a_partner}</h2>
    <div className="P-content">
      <div className="P-image" />
      <p>«Ալֆա Ֆարմ» դեղագործական ընկերությունը հիմնադրվել է 1996 թ.-ին: Ներկայումս ընկերությունը զբաղեցնում է առաջատար դիրք Հայաստանի դեղագործական շուկայում և շուրջ 20 տարի հաջողությամբ զբաղվում է դեղամիջոցների ներկրմամբ, մեծածախ և մանրածախ առևտրով:<br /><br /> Ընկերության հիմնադիրներ են հանդիսանում հայաստանի դեղագործական ոլորտում բազմամյա փորձ ունեցող անձիք, որոնց մասնագիտական և կազմակերպչական ունակությունների շնորհիվ ընկերությունը բարձրորակ ծառայություններ է մատուցում հանրությանը, ինչպես նաև տարբեր ժամանակահատվածներում, որպես ընկերության բաժնետեր են հանդիսացել «Վերակառուցման և Զարգացման Եվրոպական Բանկը» (EBRD) և դեղագործական ոլորտի այլ խոշոր եվրոպական ներդրողներ:<br /><br /> Ընկերությունն իրականացնում է ուղղակի ներմուծումներ ավելի քան 100 համաշխարհային առաջատար արտադրողներից` այդ թվում Եվրոպայից, ԱՄՆ-ից, Ռուսաստանից, ԱՊՀ երկրներից, Հնդկաստանից եւ այլն, միաժամանակ համագործակցում է նաեւ տեղական արտադրողների հետ: Մեր գործընկերներն են հանդիսանում այնպիսի հայտնի ընկերություններ ինչպիսիք են` "Les Laboratories Servier”, "Sanofi-Aventis”, "Abbott”, "Berlin-Chemie AG”, "Novartis Consumer”, "Bayer Consumer”, "Hoffman-La Roche”, "Nycomed Austria”, "Pfizer” և այլն:</p>
    </div>
  </section>
));

export default ForPartners;