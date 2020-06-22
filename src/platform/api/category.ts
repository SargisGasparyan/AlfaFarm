import Settings from '../services/settings';
import Connection from '../services/connection';
import { IResponse } from '../constants/interfaces';

const controller = 'category';

export interface ICategory {
  icon: string;
  name: string;
  subCategoryCount: number;
  _id: string;
};

export interface IHomeCategory {
  _id: string;
  name: string;
  itemList: Array<{
    imagePath: string;
    itemCount: number;
    name: string;
    _id: string;
  }>;
};

export interface IFilterCategory {
  _id: string;
  name: string;
  imageList: string[];
};

export interface ICachedCategories {
  id: string;
  list: ICategory[];
};

export interface IMainHomeCategory {
  _id: string;
  cover: string;
  name: string;
  animClass?: string;
  subList: Array<{ _id: string, name: string }>,
};

class CategoryController {

  public static List = (id?: string): Promise<IResponse<ICategory[]>> => {
    const result = Connection.GET({
      action: 'device',
      query: { language: Settings.language, id },
      controller,
    });

    return result;
  };

  public static Sub = (id: string): Promise<IResponse<IFilterCategory[]>> => {
    const result = Connection.GET({
      action: 'subTree',
      controller,
      query: { id }
    });

    return result;
  };


  public static Details = (id: string): Promise<IResponse<IFilterCategory>> => {
    const result = Connection.GET({
      action: 'details',
      controller,
      query: { id },
      unabortable: true,
    });

    return result;
  };

  public static MainHome = (): Promise<IResponse<IMainHomeCategory[]>> => {
    const result = Connection.GET({
      action: 'webHoverTree',
      controller,
    });

    return result;
  };

  public static Home = (): Promise<IResponse<IHomeCategory[]>> => {
    const result = Connection.GET({
      action: 'home',
      controller,
    });

    return result;
  };
};

export default CategoryController;