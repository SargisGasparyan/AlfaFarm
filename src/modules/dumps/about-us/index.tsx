import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import FirstPart from './components/first-part';
import SecondPart from './components/second-part';
import Stuff from './components/stuff';

import CardiogramImage from 'assets/images/cardiogram.png';

import './style.scss';
@byRoute(ROUTES.ABOUT_US)
class AboutUs extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-about-us-page">
        <FirstPart />
        <SecondPart />

        <div className="P-cardiogram">
          <img src={CardiogramImage} />
        </div>

        <Stuff />
      </section>
    );
  }
};

export default AboutUs;