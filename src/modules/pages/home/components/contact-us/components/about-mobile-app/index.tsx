import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';

import AppStoreImage from 'assets/images/app_store.png';
import GooglePlayImage from 'assets/images/google_play.png';

const AboutDelivery = React.memo(() => {
  const [opened, setOpened] = React.useState<boolean>(false);

  return (
    <div onClick={() => setOpened(true)}>
      <i className="icon-Group-5801" />
      <h3>{Settings.translations.mobile_app}</h3>

      {opened && <Modal className="P-contact-us-about-modal" onClose={() => setOpened(false)}>
        <i className="icon-Group-5801" />
        <h3>{Settings.translations.mobile_app}</h3>
        <p>{Settings.translations.about_mobile_app_text}</p>      
        <div className="P-download-images">
          <img src={AppStoreImage} />
          <img src={GooglePlayImage} />
        </div>
      </Modal>}
    </div>
  );
});

export default AboutDelivery;