import * as React from 'react';
import { hydrate } from 'react-dom';

import App from './app';
import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('P-content'));
hydrate(<App />, document.getElementById('P-content'));
module.hot && module.hot.accept();
