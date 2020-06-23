import * as React from 'react';

import './style.scss';

interface IProps {
  children: React.ReactNode;
  className?: string | null;
};

const ShadowText = React.memo(({ children, className }: IProps) => (
  <h1 className={`P-shadow-text ${className}`}>
    <span className="P-background P-right">{children}</span>
    {children}
  </h1>
));

export default ShadowText;