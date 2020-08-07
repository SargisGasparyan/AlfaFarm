
import * as React from 'react';

import LeftSide from '../left-side';

import './style.scss';

interface IProps {
  children: React.ReactNode;
};

const Layout = React.memo(({ children }: IProps) => (
  <section className="G-page P-profile-page">
    <LeftSide />
    <div className="P-content">
      {children}
    </div>
  </section>
));

export default Layout;