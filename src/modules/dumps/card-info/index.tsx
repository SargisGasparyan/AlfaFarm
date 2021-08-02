import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import Settings from 'platform/services/settings';
import { IStaticResponseModel } from 'platform/api/static/models/response';
import StaticController from 'platform/api/static';

import './style.scss';
import ShadowText from "../../../components/shadow-text";

interface IState {
  data?: IStaticResponseModel;
}

@byRoute([ROUTES.CARD_INFO])
class CardInfo extends HelperPureComponent<{}, IState> {

  public state: IState = {};

  public async componentDidMount() {
    const result = await StaticController.GetBonusCard();
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-card-info-page">
        <h2 className="G-page-title">{Settings.translations.what_is_alfa_card.toUpperCase()}</h2>

        {/*{data && <div className="P-content" dangerouslySetInnerHTML={{ __html: data.content }} />}*/}
        <div className="P-content">
          <p>
            {Settings.translations.bonusayin_cragir}
          </p>
          <br/>
          <p>{Settings.translations.karoqeq__gnum_katarel}</p>
          <h3 className="G-text-bold G-text-center">{Settings.translations.alfa_bonusayin_ctagir}</h3>
          <br/>
          <p>{Settings.translations.alfa_text1}</p>
          <br/>
          <p>{Settings.translations.alfa_text2}</p>
          <ul>
            <li>{Settings.translations.point_1}</li>
            <li>{Settings.translations.point_2}</li>
            <li>{Settings.translations.point_3}</li>
            <li>{Settings.translations.point_4}</li>
            <li>{Settings.translations.point_5}</li>
          </ul>
          <br/>
          <p>{Settings.translations.barcr_miavorner}</p>
          <ul>
            <li>{Settings.translations.barcr_miavorner_1}</li>
            <li>
              {Settings.translations.barcr_miavorner_2}
              <br/>
              <span className="G-text-bold">Avene,Vichy, La Roche-Posay, Ducray, Bioderma, Bambo, Maternea, Mustela, Bebble, Canpol, Abena, Lavena, Abri, Swiss image, Himalaya, Avanta, Footness, Derma, Bioderma։</span>
            </li>
            <li>{Settings.translations.point_3}</li>
            <li>{Settings.translations.point_4}</li>
            <li>{Settings.translations.point_5}</li>
          </ul>
          <br/>
          <h3 className="G-text-bold">{Settings.translations.standart_kutakman_sandxak}</h3>
          <br/>
          <p>{Settings.translations.info_price_1}</p>
          <p>{Settings.translations.info_price_2}</p>
          <p>{Settings.translations.info_price_3}</p>
          <p>{Settings.translations.info_price_4}</p>
          <h3 className="G-text-bold">{Settings.translations.info_cart_1}</h3>
          <br/>
          <h3 className="G-text-bold G-text-center">{Settings.translations.info_cart_2}</h3>
          <br/>
          <p> {Settings.translations.info_cart_3}</p>
          <br/>
          <ul>
            <li>{Settings.translations.point_6}</li>
            <li>{Settings.translations.point_7}</li>
            <li>{Settings.translations.point_8}</li>
            <li>{Settings.translations.point_4}</li>
            <li>{Settings.translations.point_5}</li>
          </ul>
          <br/>
          <p>{Settings.translations.qartapan_info}</p>
          <br/>
          <ul>
            <li>{Settings.translations.info_point_1}</li>
            <li>
              {Settings.translations.info_point_2}
              <br/>
              <span className="G-text-bold">Avene,Vichy, La Roche-Posay, Ducray, Bioderma, Bambo, Maternea, Mustela, Bebble, Canpol, Abena, Lavena, Abri, Swiss image, Himalaya, Avanta, Footness, Derma, Bioderma։</span>
            </li>
          </ul>
          <br/>
          <h3 className="G-text-bold">{Settings.translations.standart_kutakman_sandxak}</h3>
          <br/>
          <p>{Settings.translations.info_price_1}</p>
          <p>{Settings.translations.info_price_2}</p>
          <p>{Settings.translations.info_price_3}</p>
          <p>{Settings.translations.info_price_4}</p>
          <br/>
          <h3 className="G-text-bold">{Settings.translations.info_cart_1}</h3>
        </div>
      </section>
    );
  }
}

export default CardInfo;
