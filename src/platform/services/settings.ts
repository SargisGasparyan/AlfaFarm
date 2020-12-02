//? Service to save some settings

import { LanguageEnum } from '../constants/enums';

import Armenian from 'assets/translations/am';
import Russian from 'assets/translations/ru';
import English from 'assets/translations/en';

class Settings {
  
  public static defaultLanguage = LanguageEnum.Armenian;

  public static facebookId = 4185689951504366;
  public static googleId = '868926872899-3h51jp9caaq17a9eohc61juahmahk01q.apps.googleusercontent.com';
  public static linkedinId = '77ji7ohk6dxaxv';

  public static googleAPIKey = 'AIzaSyDVSjKMr1sGNq7dlzGm3YBskX9GYeZJ5Uk';
  // AIzaSyDqd5WM8hmgmjB-7DozGaJ38M1fjIWrStY

  public static googlePlayURL = 'https://play.google.com/store/apps/details?id=am.armboldmind.ineed';
  public static appStoreURL = 'https://apps.apple.com/am/app/id1465885901';
  public static authToken: string = '';
  public static facebookURL = 'https://www.facebook.com/ineedGlobalMarket/';
  public static instagramURL = 'https://www.instagram.com/ineed.market/';
  public static linkedinURL = 'https://www.linkedin.com/company/ineed.am/about/';

  public static webURL = 'https://alfapharm.abmdemo.me';
  public static wholesaleURL = 'https://wholesalealfa.abmdemo.me';

  public static get language(): LanguageEnum {
    const language = window.localStorage.getItem('language') as LanguageEnum || Settings.defaultLanguage;
    if (!language || !Object.values(LanguageEnum).includes(language)) return Settings.defaultLanguage;
    return language;
  }

  public static set language(value: LanguageEnum) {
    window.localStorage.setItem('language', value);
  }

  public static get shortCode() {
    switch (Settings.language) {
      case LanguageEnum.Armenian: return 'hy-am';
      case LanguageEnum.Russian: return 'ru';
      default: return 'en-GB';
    }
  }

  public static get translations() {
    switch (Settings.language) {
      case LanguageEnum.Armenian: return Armenian;
      case LanguageEnum.Russian: return Russian;
      default: return English;
    }
  }

  public static get token(): string | null {
    const authToken = window.localStorage.getItem('token') || null;
    return authToken;
  }

  public static set token(value: string | null) {
    if (value) {
      window.localStorage.setItem('token', value);
      window.localStorage.removeItem('guest');
    } else window.localStorage.removeItem('token');
  }

  public static get guest(): string | null {
    const guest = window.localStorage.getItem('guest') || null;
    return guest ? Settings.token : null;
  }

  public static set guest(value: string | null) {
    if (value) {
      window.localStorage.setItem('token', value);
      window.localStorage.setItem('guest', 'true');
    } else window.localStorage.removeItem('guest');
  }

  public static get referralCode(): string {
    const referralCode = window.sessionStorage.getItem('referralCode');
    return referralCode || '';
  }

  public static set referralCode(value: string) {
    window.sessionStorage.setItem('referralCode', value);
  }

  public static logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('guest');
    window.location.reload();
  }
}

export default Settings;