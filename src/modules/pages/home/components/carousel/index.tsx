import * as React from 'react';
import Slider from 'react-slick';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';

import HomeImage from 'assets/images/home_background.png';
import TestImage from 'assets/images/download_background.png';

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
            <ShadowText>Ապրենք առողջ</ShadowText>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deserunt accusantium vel doloremque praesentium dolores libero repellendus minus explicabo.</p>
            <button className="G-main-button">{Settings.translations.read_more}</button>
          </div>
        </div>
        <div>
          <div className="G-page P-home-carousel-slide" style={{ background: `url('${TestImage}') center/cover` }} />
        </div>
        <div>
          <div className="G-page P-home-carousel-slide" style={{ background: `url('${HomeImage}') center/cover` }}>
            <ShadowText>Ապրենք առողջ</ShadowText>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deserunt accusantium vel doloremque praesentium dolores libero repellendus minus explicabo.</p>
            <button className="G-main-button">{Settings.translations.read_more}</button>
          </div>
        </div>
      </Slider>
    );
  };
};

export default Carousel;