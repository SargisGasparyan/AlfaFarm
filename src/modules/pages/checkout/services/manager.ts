import { ICartItem } from 'platform/api/product';

class CartManager {

  public static Clear = () => {
    window.localStorage.removeItem('cartItems');
    window.dispatchEvent(new CustomEvent('cartmodify'));
  }

  public static Add = (addingItem: ICartItem) => {
    const items = CartManager.Items;
    const element = items.find(item => {
      if (item.productVersion) return item.productVersion === addingItem.productVersion;
      else return item.product === addingItem.product;
    });

    if (!element) items.push(addingItem);
    else element.count += addingItem.count;

    window.localStorage.setItem('cartItems', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cartmodify'));
  }

  public static Update = (updatingItem: ICartItem) => {
    const items = CartManager.Items;
    const element = items.find(item => {
      if (item.productVersion) return item.productVersion === updatingItem.productVersion;
      else return item.product === updatingItem.product;
    });

    element.count = updatingItem.count;
    window.localStorage.setItem('cartItems', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cartmodify'));
  }

  public static AddList = (addingItems: ICartItem[]) =>  {
    const items = CartManager.Items;
    addingItems.forEach(item => {
      const element = items.find(sub => {
        if (sub.productVersion) return sub.productVersion === item.productVersion;
        else return sub.product === item.product;
      });

      if (!element) items.push(item);
      else element.count += item.count;
    });
    
    window.localStorage.setItem('cartItems', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cartmodify'));
  }

  public static Remove = (list: string[]) => {
    const items = CartManager.Items;
    const newItems = items.filter(item => list.indexOf(item.product) === -1 && list.indexOf(item.productVersion) === -1);
    window.localStorage.setItem('cartItems', JSON.stringify(newItems));
    window.dispatchEvent(new CustomEvent('cartmodify'));
  }

  public static get Items() {
    try {
      const items = JSON.parse(window.localStorage.getItem('cartItems') || '');
      if (Array.isArray(items) && !items.find(item => !item.product || !item.count)) return items;
      else {
        CartManager.Clear();
        return [];
      }
    } catch (e) { return []; }
  }
  
};

export default CartManager;