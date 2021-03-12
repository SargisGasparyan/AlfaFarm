import * as React from 'react';

import Select from 'components/select';
import Settings from 'platform/services/settings';
import { LanguageEnum } from 'platform/constants/enums';
import { IDropdownOption } from 'platform/constants/interfaces';

import './style.scss';
import Storage from 'platform/services/storage';

const changeLanguage = (chosen: IDropdownOption<LanguageEnum>) => {
  Settings.language = chosen.value;
  window.location.reload();
};

const LanguageSwitcher = React.memo(() => {
  const languagesDropdown = Storage.languages.map(item => ({ name: item.name, value: item.isoCode }));

  return <Select<LanguageEnum>
    className="P-header-language-switcher"
    onChange={changeLanguage}
    options={languagesDropdown}
    value={Settings.language}
  />
});

export default LanguageSwitcher;
