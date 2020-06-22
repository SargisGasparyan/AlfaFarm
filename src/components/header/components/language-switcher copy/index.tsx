import * as React from 'react';

import Select from 'components/select';
import Settings from 'platform/services/settings';
import { LanguageEnum } from 'platform/constants/enums';
import { LanguagesDropdown } from './constants/dropdowns';
import { IDropdownOption } from 'platform/constants/interfaces';

import './style.scss';

const changeLanguage = (chosen: IDropdownOption<LanguageEnum>) => {
  Settings.language = chosen.value;
  window.location.reload();
};

const LanguageSwitcher = React.memo(() => (
  <Select<LanguageEnum>
    className="P-header-language-switcher G-auto-margin-left"
    onChange={changeLanguage}
    options={LanguagesDropdown}
    value={Settings.language}
    useValue={true}
  />
));

export default LanguageSwitcher;