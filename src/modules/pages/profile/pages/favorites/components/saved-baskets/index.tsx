import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import { ISavedBasketListResponseModel } from 'platform/api/basket/models/response';
import BasketController from 'platform/api/basket';
import ROUTES from 'platform/constants/routes';

import './style.scss';

const SavedBasket = React.memo(() => {
  const [data, setData] = React.useState<ISavedBasketListResponseModel[] | null>(null);

  React.useEffect(() => {
    BasketController.GetSavedList().then(result => setData(result.data))
  }, []);

  return data && data.length ? <>
    <div className="P-favorites-saved-baskets G-flex-justify-between">
      {data.map((item, index) => <Link
        key={item.id}
        to={ROUTES.PROFILE.FAVORITES.SAVED_BASKET_ITEMS.replace(':id', item.id)}
        className="P-list-item"
      >
        <span className="P-index">{index + 1}</span>
        {Settings.translations.saved_basket}
        <i className="icon-Group-5503 G-fs-26" />
      </Link>)}
    </div>
  </> : null;
});

export default SavedBasket;
