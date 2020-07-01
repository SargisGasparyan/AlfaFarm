import * as React from 'react';

import Settings from 'platform/services/settings';
import { Shared } from 'modules';

import './style.scss';
import { Link } from 'react-router-dom';
import ROUTES from 'platform/constants/routes';

const Similar = React.memo(() => (
  <div className="P-product-details-similar">
    <h2 className="P-title">{Settings.translations.similar_products}</h2>
    <div className="P-list">
      <Shared.Products.ListItem data={{}} />
      <Shared.Products.ListItem data={{}} />
      <Shared.Products.ListItem data={{}} />
      <Shared.Products.ListItem data={{}} />
    </div>
    <Link
      to={ROUTES.PRODUCTS.LIST}
      className="G-main-ghost-button G-auto-margin-left G-auto-margin-right"
    >{Settings.translations.show_all}</Link>
  </div>
));

export default Similar;