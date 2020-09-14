import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import FirstPart from './components/first-part';
import SecondPart from './components/second-part';
import Options from '../../components/options';
import { onlyForUsers } from 'platform/guards/routes';

import './style.scss';

@byRoute(ROUTES.CLINIC.ABOUT_US, [onlyForUsers])
class AboutUs extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-clinic-about-us-page">
        <Options />

        <div id="clinic-page-start" className="G-page P-content">
          <FirstPart />
          <SecondPart />
        </div>
      </section>
    );
  }
};

export default AboutUs;