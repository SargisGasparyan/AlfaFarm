import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import Options from './components/options';

import './style.scss';

@byRoute([ROUTES.CLINIC])
class Clinic extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="P-clinic-page">
        <Options />
      </section>
    );
  }
}

export default Clinic;