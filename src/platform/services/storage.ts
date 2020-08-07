import CategoryController from '../api/category';
import MUController from '../api/mu';
import Settings from './settings';
import UserController from '../api/user';
import { IMU } from '../api/mu';
import LanguageController from '../api/language';
import { ICategoryListResponseModel } from '../api/category/models/response';
import { ILanguageListResponseModel } from '..//api/language/models/response';
import BrandController from 'platform/api/brand';
import { IBrandListResponseModel } from 'platform/api/brand/models/response';
import { infinityScrollMax } from 'platform/constants';
import ActiveIngredientController from 'platform/api/activeIngredients';
import { IActiveIngredientListResponseModel } from 'platform/api/activeIngredients/models/response';
import AuthController from 'platform/api/auth';
import { IUserResponseModel } from 'platform/api/user/models/response';

class Storage {

  public static fetchDefault = async () => {
    try {
      if (!Settings.token) {
        const guest = await AuthController.Guest();
        Settings.guest = guest.data.accessToken;
      } else if (!Settings.guest) {
        const profile = await UserController.Get();
        Storage.profile = profile.data;
      }

      const categories = await CategoryController.GetList();
      const brands = await BrandController.GetList({ pageNumber: 1, pageSize: infinityScrollMax });
      const activeIngredients = await ActiveIngredientController.GetList({ pageNumber: 1, pageSize: infinityScrollMax });
      const languages = await LanguageController.GetList();
      const mues = await MUController.List();
      
      Storage.mues = mues.data;
      Storage.brands = brands.data.list;
      Storage.activeIngredients = activeIngredients.data.list;
      Storage.categories = categories.data;
      Storage.languages = languages.data;

      return true;
    } catch(e) { return false; }
  }

  public static profile: IUserResponseModel;
  public static categories: ICategoryListResponseModel[];
  public static brands: IBrandListResponseModel[];
  public static activeIngredients: IActiveIngredientListResponseModel[];
  public static mues: IMU[];
  public static languages: ILanguageListResponseModel[];
}

export default Storage;