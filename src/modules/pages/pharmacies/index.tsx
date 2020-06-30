import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import SearchOptions from './components/search-options';
import SearchResults from './components/search-results';

import './style.scss';

@byRoute([ROUTES.PHARMACIES])
class Pharmacies extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="P-pharmacies-page">
        <SearchOptions />
        <SearchResults />
      </section>
    );
  }
}

export default Pharmacies;