class GuestWishList {

  public static Clear = () => {
    window.localStorage.removeItem('wishListIds');
    window.dispatchEvent(new CustomEvent('wishlistmodify'));
  }

  public static Add = (id: string) => {
    const ids = GuestWishList.Ids;
    ids.indexOf(id) === -1 && ids.push(id);
    window.localStorage.setItem('wishListIds', JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('wishlistmodify'));
  }

  public static Remove = (list: string[]) => {
    const ids = GuestWishList.Ids;
    const newIds = ids.filter(item => list.indexOf(item) === -1);
    window.localStorage.setItem('wishListIds', JSON.stringify(newIds));
    window.dispatchEvent(new CustomEvent('wishlistmodify'));
  }

  public static get Ids(): string[] {
    try {
      const ids = JSON.parse(window.localStorage.getItem('wishListIds') || '');
      if (Array.isArray(ids) && !ids.find(item => typeof item !== 'string')) return ids;
      else {
        GuestWishList.Clear();
        return [];
      }
    } catch (e) { return []; }
  }

};

export default GuestWishList;