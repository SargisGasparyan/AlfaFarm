//? Service to save some settings

import { LanguageEnum } from '../constants/enums';

import Armenian from 'assets/translations/am';
import Russian from 'assets/translations/ru';
import English from 'assets/translations/en';

class Settings {
  
  public static defaultLangauge = LanguageEnum.Armenian;

  public static facebookId = 392096548151413;
  public static googleId = '68962021705-tu6bdgffqj3orrlu34t6a9c4lfuupc6q.apps.googleusercontent.com';
  public static linkedinId = '77ji7ohk6dxaxv';

  public static googleAPIKey = 'AIzaSyDT8V0w75M0dzAqC61m3s-K7S0qRpTjQcU';

  public static googlePlayURL = 'https://play.google.com/store/apps/details?id=am.armboldmind.ineed';
  public static appStoreURL = 'https://apps.apple.com/am/app/id1465885901';

  public static facebookURL = 'https://www.facebook.com/ineedGlobalMarket/';
  public static instagramURL = 'https://www.instagram.com/ineed.market/';
  public static linkedinURL = 'https://www.linkedin.com/company/ineed.am/about/';

  public static get language(): LanguageEnum {
    const storageLanguage = window.localStorage.getItem('language') || Settings.defaultLangauge;
    const language = +storageLanguage;
    if (!language || !LanguageEnum[language]) return Settings.defaultLangauge;
    else return language;
  }

  public static set language(value: LanguageEnum) {
    window.localStorage.setItem('language', value.toString());
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
      window.localStorage.removeItem('guestId');
    } else window.localStorage.removeItem('token');
  }

  public static get guestId(): string | null {
    const id = window.localStorage.getItem('guestId') || null;
    return id;
  }

  public static set guestId(value: string | null) {
    if (value) {
      window.localStorage.setItem('guestId', value);
      window.localStorage.removeItem('token');
    } else window.localStorage.removeItem('guestId');
  }

  public static logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('cartItems');
    window.location.reload();
  }
}

export default Settings;