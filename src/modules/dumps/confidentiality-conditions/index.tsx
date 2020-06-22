import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import ConfidentialityConditionsImage from 'assets/images/confidentiality_conditions.jpg';

import './style.scss';

@byRoute(ROUTES.CONFIDENTIALITY_CONDITIONS)
class ConfidentialityConditions extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="P-G-page P-confidentality-conditions-page">
        <h1 className="P-G-page-title">{Settings.translations.confidentiality_conditions}</h1>
        <div className="P-content">
          <div
            className="P-image"
            style={{ background: `url("${ConfidentialityConditionsImage}") center/cover`}}
          >{Settings.translations.confidentiality_conditions}</div>
          <div className="P-texts">
            {Settings.translations.confidentiality_conditions_text}
          </div>
        </div>
      </section>
    );
  }
};

export default ConfidentialityConditions;