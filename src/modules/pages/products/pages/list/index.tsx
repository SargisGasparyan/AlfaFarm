import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import { Shared } from 'modules';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import './style.scss';

@byRoute([ROUTES.PRODUCTS.LIST])
class List extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-products-list-page">
        <div className="P-list-wrapper">
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
          <Shared.Products.ListItem data={{}} />
        </div>
      </section>
    );
  }
};

export default List;