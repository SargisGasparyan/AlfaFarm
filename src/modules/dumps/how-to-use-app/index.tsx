import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

@byRoute(ROUTES.HOW_TO_USE_APP)
class HowToUseApp extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-how-to-use-page">
        <h1 className="G-page-title">{Settings.translations.how_to_use_app}</h1>

        <iframe
          src="https://www.youtube.com/embed/d6x-3HjlfLk"
          className="P-big-video"
          frameBorder={0}
        />

        <div className="P-list">
          <iframe
            src="https://www.youtube.com/embed/a-EVxNQwp4g"
            className="P-item"
            frameBorder={0}
          />
          <iframe
            src="https://www.youtube.com/embed/VymiLo2jLqM"
            className="P-item"
            frameBorder={0}
          />
          <iframe
            src="https://www.youtube.com/embed/a-EVxNQwp4g"
            className="P-item"
            frameBorder={0}
          />
          <iframe
            src="https://www.youtube.com/embed/VymiLo2jLqM"
            className="P-item"
            frameBorder={0}
          />
        </div>
      </section>
    );
  }
};

export default HowToUseApp;