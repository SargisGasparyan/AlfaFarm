import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import { Link } from 'react-router-dom';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';
import Settings from 'platform/services/settings';
import './style.scss';
import {onlyForUsers} from "../../../../../../../platform/guards/routes";
import SavedBasket from "../../components/saved-baskets";
import SavedBasketItems from "../saved-basket-items";

interface IState {
  data?: IBasketListResponseModel[];
};

@byPrivateRoute(ROUTES.PROFILE.FAVORITES.SAVED_BASKET, [onlyForUsers])
class SavedBaskets extends HelperComponent<IState, {}> {

  public render() {

    return (
        <Layout>
          <section className="P-profile-saved-carts">
            <h2 className="P-title G-mb-20 G-flex G-flex-justify-between">
              <p><Link to={ROUTES.PROFILE.FAVORITES.MAIN}>{Settings.translations.favorites}</Link></p>
              <p className="P-registrations-title">{Settings.translations.saved_carts}</p>
            </h2>
            <SavedBasket/>
          </section>
        </Layout>
    );
  }
}

export default { SavedBaskets, SavedBasket };
