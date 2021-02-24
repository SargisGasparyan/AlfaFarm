import Settings from './settings';
import { getFullLanguageCode } from './helper';

export const initYMapsScript = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//api-maps.yandex.ru/2.1/?apikey=${Settings.yandexAPIKey}&lang=${getFullLanguageCode(Settings.language)}&load=SuggestView,geocode&onload=onYandexMapsLoad`;
  document.head.appendChild(script);
}