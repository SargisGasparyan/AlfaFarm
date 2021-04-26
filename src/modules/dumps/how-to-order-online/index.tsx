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
        <h3>{Settings.translations.how_to_order_online_text}</h3>
        <ul>
          <li>{Settings.translations.how_to_order_online_text_li_1}</li>
          <li>{Settings.translations.how_to_order_online_text_li_2}</li>
          <li>{Settings.translations.how_to_order_online_text_li_3}</li>
          <li>{Settings.translations.how_to_order_online_text_li_4}</li>
          <li>{Settings.translations.how_to_order_online_text_li_5}</li>
        </ul>
        <br/>
        <h3>{Settings.translations.how_to_order_online_text_2}</h3>
        <ul>
          <li>{Settings.translations.how_to_order_online_text_2_li_1}</li>
          <li>{Settings.translations.how_to_order_online_text_2_li_2}</li>
          <li>{Settings.translations.how_to_order_online_text_2_li_3}</li>
          <li>{Settings.translations.how_to_order_online_text_2_li_4}</li>
        </ul>
        <br/>
        <h3>{Settings.translations.how_to_order_online_text_3}</h3>
        <ul>
          <li>{Settings.translations.how_to_order_online_text_3_li_1}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_2}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_3}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_4}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_5}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_6}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_7}</li>
          <li>{Settings.translations.how_to_order_online_text_3_li_8}</li>
        </ul>
      <br/>
        <h3>{Settings.translations.how_to_order_online_text_4}</h3>


      </section>
    );
  }
};

export default HowToUseApp;
