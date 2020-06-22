import CategoryController from '../api/category';
import MUController from '../api/mu';
import Settings from './settings';
import UserController from '../api/user';
import { IMU } from '../api/mu';
import { IProfile } from '../api/user';
import { ICategory } from '../api/category';

class Storage {

  public static fetchDefault = async () => {
    try {
      const categories = await CategoryController.List();
      const mues = await MUController.List();
      const alertify = await import('alertifyjs');
      
      Storage.categories = categories.data;
      Storage.mues = mues.data;
  
      if (Settings.token) {
        
        const profile = await UserController.Details();
        
        const giftBonusCount = sessionStorage.getItem('giftBonusCount') || 0;
        if (+giftBonusCount) {
          alertify.success(`${Settings.translations.gift_success} ${giftBonusCount} ${Settings.translations.points}`);
          sessionStorage.removeItem('giftBonusCount');
        }

        Storage.profile = {
          ...profile.data,
          firstName: profile.data.firstName || '',
          lastName: profile.data.lastName || '',
          phoneNumber: profile.data.phoneNumber || '',
        };
      }

      return true;
    } catch(e) { return false; }
  }

  public static profile: IProfile;
  public static categories: ICategory[];
  public static mues: IMU[];
}

export default Storage;