import * as React from 'react';

import { byRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import HelperComponent from 'platform/classes/helper-component';
import './style.scss';

@byRoute(ROUTES.PRODUCTS.LIST)
class List extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-products-list-page">
        {/* */ }
      </section>
    );
  }
};

export default List;
