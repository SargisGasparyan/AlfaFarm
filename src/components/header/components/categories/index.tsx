import * as React from 'react';

import ClickOutside from '../../../click-outside';
import HelperComponent from 'platform/classes/helper-component';
import { ICategoryListResponseModel } from 'platform/api/category/models/response';
import CategoryController, { ICategory } from 'platform/api/category';
import DataCache from './services/data-cache';

import './style.scss';
import ROUTES from 'platform/constants/routes';
import Storage from 'platform/services/storage';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

interface IProps {
  onClose(): void;
  openPosition: number;
}

interface IState {
  lists: ICategoryListResponseModel[][];
};

class Categories extends HelperComponent<IProps, {}> {

  public state: IState = {
    lists: [Storage.categories],
  };

  private fetchData = async (index: number, parentId?: number) => {
    const { lists } = this.state;
    lists.length = index;
    
    if (parentId) {
      const existingItem = DataCache.alreadyFetched.find(item => item.id === parentId);

      if (existingItem) {
        lists[index] = existingItem.categories;
        this.safeSetState({ lists });
        return;
      }
    }

    const result = await CategoryController.GetList(parentId);

    parentId && DataCache.alreadyFetched.push({
      id: parentId,
      categories: result.data
    });

    lists[index] = result.data;
    this.safeSetState({ lists });
  }

  private hoverItem = (index: number, category: ICategoryListResponseModel) => {
    if (category.hasChildren) this.fetchData(index + 1, category.id);
    else {
      const { lists } = this.state;
      lists.length = index + 1;
      this.safeSetState({ lists })
    }
  }

  private clickItem = (category: ICategoryListResponseModel) => {
    const { onClose } = this.props;
    window.routerHistory.push(`${ROUTES.PRODUCTS.LIST}?categoryIds=${category.id}`);
    window.dispatchEvent(new Event(DispatcherChannels.ProductFilterChange));
    onClose();
  }

  public render() {
    const { lists } = this.state;
    const { onClose, openPosition } = this.props;

    return (
      <ClickOutside onClickOutside={onClose}>
        <div className="P-header-categories-wrapper">
          <div className="P-content" style={{ minWidth: window.innerWidth - openPosition }}>
            {lists.map((item, index) => <div key={index} className="P-list">
                {item.map(sub => <div
                  key={sub.id}
                  className={''}
                  onMouseOver={() => this.hoverItem(index, sub)}
                  onClick={() => this.clickItem(sub)}
                >
                  {/* {sub.icon && <img src={sub.icon} alt="category icon" />} */}
                  <h3>{sub.name}</h3>
                  {sub.hasChildren && <i className="icon-Group-5513" />}
                </div>)}
            </div>)}
          </div>
        </div>
      </ClickOutside>
    );
  }
};

export default Categories;