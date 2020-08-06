import * as React from 'react';
import * as DateTime from 'react-datetime';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import BasketController from 'platform/api/basket';
import { IBasketListResponseModel } from 'platform/api/basket/models/response';

import './style.scss';
import LoaderContent from 'components/loader-content';

interface IState {
  data: IBasketListResponseModel[];
};

@byRoute(ROUTES.CHECKOUT)
class Checkout extends HelperComponent<{}, IState> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await BasketController.GetList();
    this.safeSetState({ data: result.data });
  }

  public render() {

    return (
      <section className="G-page P-checkout-page">
        <h1 className="G-page-title">{Settings.translations.fill_your_information}</h1>
        <form className="G-main-form">
          <div className="P-delivery-date">
            <h4 className="G-fs-normal">{Settings.translations.delivery_date}</h4>
            <div className="G-main-form-half-field">
              <DateTime
                input={true}
                inputProps={{ className: "G-main-input", placeholder: '00:00' }}
              />
            </div>
            <span>&#8213;</span>
            <div className="G-main-form-half-field">
              <DateTime
                input={true}
                inputProps={{ className: "G-main-input", placeholder: '00:00' }}
              />
            </div>
          </div>

          <LoaderContent
            className="G-main-button"
            loading={false}
            onClick={() => { /* */ }}
          >{Settings.translations.confirm}</LoaderContent>
        </form>
      </section>
    );
  }
};

export default Checkout;