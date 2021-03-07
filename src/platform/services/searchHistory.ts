import { IProductSearchProductResponseModel } from 'platform/api/product/models/response';

class SearchHistory {

  public static get items(): IProductSearchProductResponseModel[] {
    try {
      const storedItems = window.localStorage.getItem('searchHistory');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch { return []; }
  }

  public static add(product: IProductSearchProductResponseModel) {
    const { items } = SearchHistory;
    if (!items.some(item => item.id === product.id)) {
      items.unshift(product);
      if (SearchHistory.items.length > 10) SearchHistory.items.length = 10;
      window.localStorage.setItem('searchHistory', JSON.stringify(items));  
    }
  }

  public static clear() {
    window.localStorage.removeItem('searchHistory');
  }
}

export default SearchHistory;