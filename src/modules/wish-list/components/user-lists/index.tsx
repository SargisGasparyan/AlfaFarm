import * as React from 'react';

import WishController, { IWishListItem } from 'platform/api/wish';
import PageLoader from 'components/page-loader';
import Settings from 'platform/services/settings';
import PageLeftMenu, { ILeftMenuItem } from 'components/page-left-menu';
import ModifyListModal from './components/modify-list-modal';
import ListDetails from './components/list-details';
import EmptyState from 'components/empty-state';
import ROUTES from 'platform/constants/routes';
import HelperComponent from 'platform/classes/helper-component';

import * as WishListAnimationJSON from 'assets/animations/empty_wish_list.json';

import './style.scss';

interface IState {
  data: IWishListItem[];
  leftMenuData: ILeftMenuItem[];
  editListData: IWishListItem | null;
  modifyListOpen: boolean;
  activeListId: string | null;
  isFetchData: boolean;
}

class UserLists extends HelperComponent<{}, IState> {

  public state: IState = {
    data: [],
    leftMenuData: [],
    editListData: null,
    modifyListOpen: false,
    activeListId: null,
    isFetchData: false,
  };

  public componentDidMount() { 
    this.fetchData();
    sessionStorage.removeItem('activeTab');
  }

  private getActiveListQuery = (data: IWishListItem[]) => {
    const query = new URLSearchParams(window.location.search);
    const activeListId = query.get('active');

    if (activeListId && data.some(item => item._id === activeListId)) return activeListId;

    return null;
  }

  private fetchData = async () => {
    const { data } = await WishController.List();
    const activeListId = data.length ? this.getActiveListQuery(data) || data[0]._id : null;
    const leftMenuData = data.length ? data.map(item => ({ display: item.name, value: item._id })) : [];
    this.safeSetState({ data, leftMenuData, activeListId, isFetchData: true });
  };

  private openAddList = () => {
    this.safeSetState({ modifyListOpen: true })
  };
  private openEditList = () => {
    const { data, activeListId } = this.state;

    if (data) {
      const editListData = data.find(item => item._id === activeListId);
      if (editListData) this.safeSetState({ modifyListOpen: true, editListData });
    }
  }

  private closeModifyList = (update: boolean) => {
    this.safeSetState({ modifyListOpen: false, editListData: null });
    if (update) this.fetchData();
  }
  private listChange = (id: string) => {
    this.safeSetState({ activeListId: id });
    window.routerHistory.replace(`${ROUTES.WISH_LIST.MAIN}?active=${id}`);
  }

  public render() {
    const { data, editListData, modifyListOpen, activeListId, leftMenuData, isFetchData } = this.state;

    return isFetchData ? (
      <>
        <h1 className="G-page-title">
          {Settings.translations.wish_list}
          {!!data.length && <button onClick={this.openAddList}>{Settings.translations.add_new_list}</button>}
        </h1>
        {leftMenuData && leftMenuData.length ? 
        <>
          <PageLeftMenu
            items={leftMenuData}
            defaultChosen={activeListId}
            onChange={this.listChange}
            className="P-wish-list-user-left-menu"
          />
          {activeListId && <ListDetails
            id={activeListId}
            onListUpdate={this.fetchData}
            onEditChoose={this.openEditList}
          />}
        </> : <div className="P-wish-list-content G-page-min-height">
          <EmptyState
            animation={WishListAnimationJSON}
            text={Settings.translations.no_lists}
            buttonText={Settings.translations.add_new_list}
            onClick={this.openAddList}
          />
         </div>}
        {modifyListOpen && <ModifyListModal data={editListData} onClose={this.closeModifyList} />}  
      </>
    ) : <PageLoader />;
  };
};

export default UserLists;