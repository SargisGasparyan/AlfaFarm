import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';

import AppStoreImage from 'assets/images/app_store.png';
import GooglePlayImage from 'assets/images/google_play.png';

const AboutDelivery = React.memo(() => {
  const [opened, setOpened] = React.useState<boolean>(false);

  return (
    <div onClick={() => setOpened(true)}>
      <i className="icon-Group-5791" />
      <h3>{Settings.translations.mobile_app}</h3>

      {opened && <Modal className="P-contact-us-about-modal" onClose={() => setOpened(false)}>
        <i className="icon-Group-5791" />
        <h3>{Settings.translations.mobile_app}</h3>
        <p>{Settings.translations.about_mobile_app_text}</p>      
        <div className="P-download-images">
          <img src={AppStoreImage} onClick={() => window.open('https://apps.apple.com/ru/app/alfa-pharm-drugstore-chain/id1453737637', '_blank')} />
          <img src={GooglePlayImage} onClick={() => window.open('https://play.google.com/store/apps/details?id=am.gtest.alfapharm&hl=ru&gl=US', '_blank')} />
        </div>
      </Modal>}
    </div>
  );
});

export default AboutDelivery;