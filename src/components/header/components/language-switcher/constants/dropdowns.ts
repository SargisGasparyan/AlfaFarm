import { LanguageEnum } from 'platform/constants/enums';

import EN from 'assets/translations/en';
import RU from 'assets/translations/ru';
import AM from 'assets/translations/am';

export const LanguagesDropdown = [
  {
    name: EN.language_label,
    value: LanguageEnum.English,
  },
  {
    name: RU.language_label,
    value: LanguageEnum.Russian,
  },
  {
    name: AM.language_label,
    value: LanguageEnum.Armenian,
  },
];