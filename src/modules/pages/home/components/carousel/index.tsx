import * as React from 'react';
import Slider from 'react-slick';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';

import HomeImage from 'assets/images/home_background.png';
import HomeImage1 from 'assets/images/home_background_1.png';
import HomeImage2 from 'assets/images/home_background_2.png';
import HerbionImage from 'assets/images/herbion.jpg';

import './style.scss';

class Carousel extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <Slider
        dots={true}
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={1}
        slidesToScroll={1}
      >
        <div>
          <div className="G-page P-home-carousel-slide" style={{ background: `url('${HomeImage}') center/cover` }}>
            <ShadowText className="P-shadow-text-without-offset">Ապրենք առողջ</ShadowText>
            <p>{Settings.translations.footer_text}</p>
            <button className="G-main-button">{Settings.translations.see_more}</button>
          </div>
        </div>
        <div>
          <div className="G-page P-home-carousel-slide" style={{ background: `url('${HomeImage1}') right/contain no-repeat` }}>
            <img src={HerbionImage} alt="herbion" />
            <button className="G-main-button">{Settings.translations.see_more}</button>
          </div>
        </div>
        <div>
          <div className="G-page P-home-carousel-slide" style={{ background: `url('${HomeImage2}') center/cover` }}>
            <ShadowText className="P-shadow-text-without-offset">Ապրենք առողջ</ShadowText>
            <p>{Settings.translations.footer_text}</p>
            <button className="G-main-button">{Settings.translations.see_more}</button>
          </div>
        </div>
      </Slider>
    );
  };
};

export default Carousel;