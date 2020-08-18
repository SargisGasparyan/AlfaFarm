import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import { ISavedBasketListResponseModel } from 'platform/api/basket/models/response';
import BasketController from 'platform/api/basket';
import ROUTES from 'platform/constants/routes';

import './style.scss';

const SavedBaskets = React.memo(() => {
  const [data, setData] = React.useState<ISavedBasketListResponseModel[] | null>(null);

  React.useEffect(() => {
    BasketController.GetSavedList().then(result => {
      setData(result.data);
      console.log(data);
    })
  }, []);

  return data && data.length ? <>
    <h2 className="G-main-color G-mb-30">{Settings.translations.saved_carts}</h2>
    <div className="P-order-saved-baskets">
      {data.map((item, index) => <Link
        key={item.id}
        to={ROUTES.PROFILE.ORDERS.SAVED_BASKET_ITEMS.replace(':id', item.id)}
        className="P-list-item"
      >
        <span className="P-index">{index + 1}</span>
        {Settings.translations.cart}
      </Link>)}
    </div>
  </> : null;
});

export default SavedBaskets;