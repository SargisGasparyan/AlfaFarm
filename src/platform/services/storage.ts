import CategoryController from '../api/category';
import MUController from '../api/mu';
import Settings from './settings';
import UserController from '../api/user';
import { IMU } from '../api/mu';
import { IProfile } from '../api/user';
import LanguageController from '../api/language';
import { ICategoryListResponseModel } from '../api/category/models/response';
import { ILanguageListResponseModel } from '..//api/language/models/response';
import BrandController from 'platform/api/brand';
import { IBrandListResponseModel } from 'platform/api/brand/models/response';
import { infinityScrollMax } from 'platform/constants';
import ActiveIngredientController from 'platform/api/activeIngredients';
import { IActiveIngredientListResponseModel } from 'platform/api/activeIngredients/models/response';

class Storage {

  public static fetchDefault = async () => {
    try {
      const categories = await CategoryController.GetList();
      const brands = await BrandController.GetList({ pageNumber: 1, pageSize: infinityScrollMax });
      const activeIngredients = await ActiveIngredientController.GetList({ pageNumber: 1, pageSize: infinityScrollMax });
      const languages = await LanguageController.GetList();
      const mues = await MUController.List();
      const alertify = await import('alertifyjs');
      
      Storage.mues = mues.data;
      Storage.brands = brands.data.list;
      Storage.activeIngredients = activeIngredients.data.list;
      Storage.categories = categories.data;
      Storage.languages = languages.data;
  
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

  public static categories: ICategoryListResponseModel[];
  public static brands: IBrandListResponseModel[];
  public static activeIngredients: IActiveIngredientListResponseModel[];
  public static mues: IMU[];
  public static languages: ILanguageListResponseModel[];
}

export default Storage;