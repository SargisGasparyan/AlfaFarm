import * as React from 'react';
import Slider from 'react-slick';

import Modal from '../modal';

import './style.scss';
import { NextArrow, BackArrow } from 'components/slider-arrows';

interface IProps {
  onClose(): void;
  images: string[];
};

const ImageCarouselModal = React.memo(({ onClose, images }: IProps) => (
  <Modal onClose={onClose} className="P-image-carousel-modal">
    <Slider
      arrows={true}
      autoplay={false}
      autoplaySpeed={5000}
      slidesToShow={1}
      slidesToScroll={1}
      nextArrow={<NextArrow />}
      prevArrow={<BackArrow />}
    >
        {/* tslint:disable-next-line:jsx-key */}
      {images.map((item, index) => <div>
        <div style={{ background: `url('${item}') center/cover` }} />
      </div>)}
    </Slider>
  </Modal>
));

export default ImageCarouselModal;
