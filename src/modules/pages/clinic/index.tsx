import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import Options from './components/options';
import PriceList from './pages/price-list';
import AboutUs from './pages/about-us';

import './style.scss';

@byRoute([ROUTES.CLINIC.MAIN])
class Clinic extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-clinic-page">
        <Options />
      </section>
    );
  }
}

export default { Clinic, PriceList, AboutUs };