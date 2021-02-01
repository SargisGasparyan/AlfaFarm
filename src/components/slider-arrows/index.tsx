import * as React from 'react';

import './style.scss';

export const BackArrow = ({ onClick }: { onClick?: () => void }) => <span
  className="P-slider-back react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
  onClick={onClick}
/>;

export const NextArrow = ({ onClick }: { onClick?: () => void }) => <span
  className="P-slider-next react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
  onClick={onClick}
/>;
