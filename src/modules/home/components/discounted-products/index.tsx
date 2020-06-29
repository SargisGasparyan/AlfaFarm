import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ListItem from './components/list-item';
import ROUTES from 'platform/constants/routes';

import './style.scss';

class DiscountedProducts extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-home-discounted-products">
        <h2 className="G-page-title">{Settings.translations.discounted_products}</h2>

        <div className="P-list-wrapper">
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
        </div>

        <Link
          to={ROUTES.PRODUCTS.LIST}
          className="G-main-ghost-button G-auto-margin-left G-auto-margin-right"
        >{Settings.translations.show_all}</Link>
      </section>
    );
  }
};

export default DiscountedProducts;