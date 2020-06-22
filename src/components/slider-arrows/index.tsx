import * as React from 'react';

import './style.scss';

export const BackArrow = ({ onClick }: { onClick?: () => void }) => <i
  className="P-slider-back icon-back"
  onClick={onClick}
/>;

export const NextArrow = ({ onClick }: { onClick?: () => void }) => <i
  className="P-slider-next icon-right"
  onClick={onClick}
/>;
