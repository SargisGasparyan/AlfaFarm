import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';

const AboutBonusCard = React.memo(() => {
  const [opened, setOpened] = React.useState<boolean>(false);

  return (
    <div onClick={() => setOpened(true)}>
      <i className="icon-Group-5510" />
      <h3>{Settings.translations.bonus_card}</h3>

      {opened && <Modal className="P-contact-us-about-modal" onClose={() => setOpened(false)}>
        <i className="icon-Group-5510" />
        <h3>{Settings.translations.bonus_card}</h3>
        <p>{Settings.translations.about_bonus_card_text}</p>
        <p>{Settings.translations.about_bonus_card_text_2}</p>
      </Modal>}
    </div>
  );
});

export default AboutBonusCard;