import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import ExchangeReturnImage from 'assets/images/exchange_return.jpg';

import './style.scss';

@byRoute(ROUTES.EXCHANGE_RETURN)
class ExchangeReturn extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="P-G-page P-exchange-return-page">
        <h1 className="P-G-page-title">{Settings.translations.products_exchange_and_return}</h1>
        <div className="P-content">
          <div
            className="P-image"
            style={{ background: `url("${ExchangeReturnImage}") center/cover`}}
          >{Settings.translations.products_exchange_and_return}</div>
          <div className="P-texts">
            {Settings.translations.exchange_return_text}
          </div>
        </div>
      </section>
    );
  }
};

export default ExchangeReturn;