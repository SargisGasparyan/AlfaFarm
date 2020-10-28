import * as React from 'react';
import { hydrate } from 'react-dom';
import Modal from 'react-modal';

import App from './app';

Modal.setAppElement(document.getElementById('P-content'));
hydrate(<App />, document.getElementById('P-content'));
module.hot && module.hot.accept();
