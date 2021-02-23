import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';

import AppStoreImage from 'assets/images/app_store_qr.png';
import GooglePlayImage from 'assets/images/google_play_qr.png';

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
        <p>{Settings.translations.about_mobile_app_text_2}</p>
        <div className="P-download-images">
          <a href="https://apps.apple.com/ru/app/alfa-pharm-drugstore-chain/id1453737637" target="_blank">
            <img src={AppStoreImage} />
          </a>

          <a href="https://play.google.com/store/apps/details?id=am.gtest.alfapharm&hl=ru&gl=US" target="_blank">
            <img src={GooglePlayImage} />
          </a>
        </div>
      </Modal>}
    </div>
  );
});

export default AboutDelivery;