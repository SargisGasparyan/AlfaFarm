import * as React from 'react';
import { NavLink} from 'react-router-dom';

import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';

const navLinkProps = {
  className: 'P-wholesale-link',
  activeClassName: 'P-active',
  exact: true,
};

const WholesaleContent = React.memo(() => <>
  <a
    href={Settings.webURL + ROUTES.PRODUCTS.MAIN}
    className="P-wholesale-link"
  >{Settings.translations.online_sales}</a>

  <NavLink {...navLinkProps} to={ROUTES.SERVICES}>{Settings.translations.services}</NavLink>
  <NavLink {...navLinkProps} to={ROUTES.WHOLESALE_NEWS}>{Settings.translations.news}</NavLink>
  <NavLink {...navLinkProps} to={ROUTES.WHOLESALE_PROMOTIONS}>{Settings.translations.wholesale_promotions}</NavLink>
</>);

export default WholesaleContent;
