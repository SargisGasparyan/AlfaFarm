import * as React from 'react';

import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';
import './style.scss';

const FirstPart = React.memo(() => <div className="P-clinic-about-us-first-part P-clinic-about-us-tablet">
  <div className="P-image" />
  <div className="P-content">
    <ShadowText>{Settings.translations.about_us}</ShadowText>
    <p className="G-text-bold">Էքսպրես-կլինիկա, որը համալրված է՝</p>
    <ul>
      <li>թերապեւտիկ բաժանմունքով, որտեղ փորձառու մասնագետներըպատրաստ են տրամադրել մասնագիտական խորհրդատվությունհամապատասխան բուժզննումն  անցնելու եւ բուժօգնությունստանալու վերաբերյալ,</li>
      <li>մաշկաբանի կաբինետով՝ անհրաժեշտ ախտորոշիչ եւ բուժականծառայությունների մատուցմամբ,</li>
      <li>ախտորոշիչ լաբորատորիայով, որն անցկացնում է ավելի քան 2000տեսակի լաբորատոր հետազոտություններ</li>
    </ul>
    <br/>
    <p>Կլինիկան մատուցում է բարձրորակ սպասարկում, իսկ հաճախորդներիընդունումը կատարվում է շատ օպերատիվ։</p>
    <br/>
    <p>Հերթագրվելու համար կարող եք զանգահարել 060 700 500 հեռախոսահամարով (ներքին՝ 300) կամ հաղորդագրություն գրելով Ալֆա-Ֆարմի Facebook-յան պաշտոնական էջին:</p>
  </div>
</div>);

export default FirstPart;
