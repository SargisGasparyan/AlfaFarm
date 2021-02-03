import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import { infinityScrollPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import { onlyForUsers } from 'platform/guards/routes';
import TenderController from 'platform/api/tender';
import { ITenderListResponseModel } from 'platform/api/tender/models/response';

import './style.scss';

@byRoute([ROUTES.CARD_INFO])
class CardInfo extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-card-info-page">
        <h2 className="G-page-title">{Settings.translations.card_info_title.toUpperCase()}</h2>

        <div className="P-content">
          {Settings.translations.card_info}
        </div>
      </section>
    );
  }
}

export default { CardInfo };