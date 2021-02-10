import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

@byRoute(ROUTES.HOW_TO_ORDER_ONLINE)
class HowToUseApp extends HelperPureComponent<{}, {}> {

  private iframeProps = {
    frameBorder: 0,
    allowfullscreen: "allowfullscreen",
    mozallowfullscreen: "mozallowfullscreen",
    msallowfullscreen: "msallowfullscreen",
    oallowfullscreen: "oallowfullscreen",
    webkitallowfullscreen: "webkitallowfullscreen",
  }

  public render() {

    return (
      <section className="G-page P-how-to-use-page">
        <h1 className="G-page-title">{Settings.translations.how_to_order_online}</h1>

        <iframe
          src="https://www.youtube.com/embed/d6x-3HjlfLk"
          className="P-big-video"
          {...this.iframeProps}
        />

        <div className="P-list">
          <iframe
            src="https://www.youtube.com/embed/a-EVxNQwp4g"
            className="P-item"
            {...this.iframeProps}
          />

          <iframe
            src="https://www.youtube.com/embed/VymiLo2jLqM"
            className="P-item"
            {...this.iframeProps}
          />

          <iframe
            src="https://www.youtube.com/embed/a-EVxNQwp4g"
            className="P-item"
            {...this.iframeProps}
          />
          
          <iframe
            src="https://www.youtube.com/embed/VymiLo2jLqM"
            className="P-item"
            {...this.iframeProps}
          />
        </div>
      </section>
    );
  }
};

export default HowToUseApp;