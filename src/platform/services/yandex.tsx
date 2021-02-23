import Settings from './settings';

export async function fetchYandexPlaces(text: string) {
  const response = await fetch(`https://search-maps.yandex.ru/v1/?apikey=${Settings.yandexAPIKey}&text=${text}&results=20`);
  const result = await response.json();

  console.log(result);

  return result;
};