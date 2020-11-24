import CategoryController from '../api/category';
import Settings from './settings';
import UserController from '../api/user';
import LanguageController from '../api/language';
import { ICategoryListResponseModel } from '../api/category/models/response';
import { ILanguageListResponseModel } from '..//api/language/models/response';
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
      const languages = await LanguageController.GetList();

      Storage.categories = categories.data;
      Storage.languages = languages.data;

      return true;
    } catch(e) { return false; }
  }

  public static profile: IUserResponseModel;
  public static categories: ICategoryListResponseModel[];
  public static languages: ILanguageListResponseModel[];
}

export default Storage;