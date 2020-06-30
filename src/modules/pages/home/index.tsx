import * as React from 'react';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';

import HelperComponent from 'platform/classes/helper-component';
import DiscountedProducts from './components/discounted-products';
import Carousel from './components/carousel';
import News from './components/news';
import ContactUs from './components/contact-us';

import './style.scss';

// import { ContentProperty } from 'csstype';
// import { string } from 'prop-types';
// import { stringify } from 'querystring';

@byRoute([ROUTES.HOME.MAIN, ROUTES.HOME.FAIL, ROUTES.HOME.SUCCESS])
class Home extends HelperComponent<{}, {}> {

  // shat romantik grdon
  // if(this.armLeng === this.armLeng) {
  //   document.body.classList.add('armenianFont');
  // }else {
  //   document.body.classList.remove('armenianFont');
  // }

  public render() {

    return (
      <section className="P-home-page">
        <Carousel />
        <DiscountedProducts />
        <News />
        <ContactUs />
      </section>
    );
  }
}

export default Home;