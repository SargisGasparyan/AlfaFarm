import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import enviroment from 'platform/services/enviroment';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import DiscountedProducts from './components/discounted-products';
import Carousel from './components/carousel';
import News from './components/news';
import ContactUs from './components/contact-us';
import ForPartners from './components/for-partners';

import './style.scss';

@byRoute(ROUTES.HOME)
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
        {enviroment.WHOLESALE ? <ForPartners /> : <News />}
        <ContactUs />
      </section>
    );
  }
}

export default Home;