import * as React from 'react';

import Screen from 'components/screen';

import './style.scss';

interface IProps {
  children: React.ReactNode;
  className?: string | null;
};

const ShadowText = React.memo(({ children, className }: IProps) => (
  <h1 className={`P-shadow-text ${className || ''}`}>
    <Screen.Min_Tablet>
      <span className="P-background P-right">{children}</span>
    </Screen.Min_Tablet>
    {children}
  </h1>
));

export default ShadowText;