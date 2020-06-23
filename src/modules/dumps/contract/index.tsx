import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import ContractImage from 'assets/images/contract.jpg';

import './style.scss';


@byRoute(ROUTES.CONTRACT)
class Contract extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-contract-page">
        <h1 className="G-page-title">{Settings.translations.contract}</h1>
        <div className="P-content">
          <div
            className="P-image"
            style={{ background: `url("${ContractImage}") center/cover`}}
          >{Settings.translations.contract}</div>
          <div className="P-texts">
            {Settings.translations.contract_text}
          </div>
        </div>
      </section>
    );
  }
};

export default Contract;