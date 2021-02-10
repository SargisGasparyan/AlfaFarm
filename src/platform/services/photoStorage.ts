import { getMediaPath } from './helper';

import LogoGray from 'assets/images/logo_gray.png';

class PhotoStorage {

  public static store: { [key: string]: boolean } = {};

  public static getURL = async (url: string): Promise<string> => new Promise(resolve => {
    const { store } = PhotoStorage;

    if (store.hasOwnProperty(url)) resolve(store[url] ? getMediaPath(url) : LogoGray);
    else {
      const image = new Image();
      image.src = url;
      
      image.onload = () => {
        resolve(getMediaPath(url));
        store[url] = true;
      };
  
      image.onerror = () => {
        resolve(LogoGray);
        store[url] = false;
      }
    }
  });
}

export default PhotoStorage;