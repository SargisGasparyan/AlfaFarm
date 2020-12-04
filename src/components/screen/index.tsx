import * as React from 'react';
import Responsive from 'react-responsive';

import { smallScreen, tabletScreen, mobileScreen } from 'assets/styles/variables.scss';

const Screen = {
  // Screens
  
  Desktop: (props: object) => <Responsive {...props} minWidth={+smallScreen.replace('px', '')} />,
  SmallDesktop: (props: object) => <Responsive {...props} maxWidth={+smallScreen.replace('px', '')} />,
  Min_Tablet: (props: object) => <Responsive {...props} minWidth={+tabletScreen.replace('px', '')} />,
  Tablet: (props: object) => <Responsive {...props} maxWidth={+tabletScreen.replace('px', '')} />,
  Mobile: (props: object) => <Responsive {...props} maxWidth={+mobileScreen.replace('px', '')} />,

  // Ranges

  Desktop_SmallDesktop: (props: object) => <Responsive {...props} query={`(max-width: ${smallScreen}) and (min-width: ${tabletScreen})`} />,
  SmallDesktop_Tablet: (props: object) => <Responsive {...props} query={`(max-width: ${smallScreen}) and (min-width: ${tabletScreen})`} />,
  Tablet_Mobile: (props: object) => <Responsive {...props} query={`(max-width: ${tabletScreen}) and (min-width: ${mobileScreen})`} />,
};

export default Screen;