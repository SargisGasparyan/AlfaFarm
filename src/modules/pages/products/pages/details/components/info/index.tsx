import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import CountInput from 'components/count-input';
import Settings from 'platform/services/settings';

import './style.scss';

class Info extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <div className="P-product-details-info">
        <h2 className="P-name">
          Ավեն արևապաշտպան կրեմ
          <span className="G-orange-color G-auto-margin-left">29,400 AMD</span>
        </h2>
        <h3 className="P-unit">10 մլ</h3>
        <h3>{Settings.translations.description}</h3>
        <p className="P-description">Գնելուց առաջ կարդացեք նախազգուշացումները: Հետևեք օգտագործման հրահանգներին: Տե՛ս նախազգուշացումները։ Արևապաշտպան միջոցները արևի պաշտպանության միայն մեկ մասն են: Խուսափեք արևի երկարատև ազդեցությունից: Արևից արդյունավետ պաշտպանության համար անհրաժեշտ է կրեմի հաճախակի օգտագործումը։ Արեւի տակ աշխատելիս անհրաժեշտ է կրել պաշտպանիչ հագուստ, գլխարկ և ակնոց։</p>
        <div className="P-cart-actions">
          <CountInput step={1} min={1} onChange={() => { /* */ }} />
          <button className="G-main-button">{Settings.translations.add_to_cart}</button>
        </div>
      </div>
    );
  };
};

export default Info;