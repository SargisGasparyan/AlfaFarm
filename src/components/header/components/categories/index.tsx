import * as React from 'react';

import { ICategoryList } from '../../constants/interfaces';
import CategoryController, { ICategory, ICachedCategories } from 'platform/api/category';
import Storage from 'platform/services/storage';
import ROUTES from 'platform/constants/routes';
import ClickOutside from '../../../click-outside';
import Connection from 'platform/services/connection';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  categoryLists: ICategoryList[];
  cachedCategories: ICachedCategories[];
  onClose(e?: MouseEvent): void;
  onChange(lists: ICategoryList[]): void;
  onCachedChange(lists: ICachedCategories[]): void;
};



class Categories extends HelperComponent<IProps, {}> {

  public visitedRoutes: ICategory[] = [];

  public async componentDidMount() {
    !this.props.categoryLists.length && this.props.onChange([{
      choosedId: null,
      list: Storage.categories,
    }]);
  }

  private hoverCategory = async (item: ICategory, index: number) => {
    const categoryLists = [...this.props.categoryLists];
    this.visitedRoutes[index] = item;

    if (index === 0) {
     this.visitedRoutes.splice(1);
    } else if(index === 1) {
      this.visitedRoutes.splice(2);
    }
    

    //* Max 4 length (index 3)
    if (index < 3  && item.subCategoryCount && categoryLists[index].choosedId !== item._id) {
      Connection.AbortAll();
      const nextIndex = index + 1;
      if (categoryLists[nextIndex]) {
        categoryLists.splice(nextIndex, 1);
        this.props.onChange(categoryLists);
      }

      const cached = this.props.cachedCategories.find(getted => getted.id === item._id);
      categoryLists[index].choosedId = item._id;      

      if (cached) {
        categoryLists[nextIndex] = {
          choosedId: null,
          list: cached.list,
        };

        this.props.onChange(categoryLists);
      } else {
        categoryLists.length = nextIndex + 1;
        
        const result = await CategoryController.List(item._id);
        if (!result.aborted && result.data) {
          categoryLists[nextIndex] = {
            choosedId: null,
            list: result.data,
          };

          const cachedCategories = [...this.props.cachedCategories];
          cachedCategories.push({
            id: item._id,
            list: result.data,
          });
    
          this.props.onCachedChange(cachedCategories);
          this.props.onChange(categoryLists);
        }
      }
    }
  }

  private chooseCategory = (item: ICategory) => {
    window.routerHistory.push(`${ROUTES.PRODUCTS.LIST}?category=${item._id}`);
    window.dispatchEvent(new CustomEvent('filterchange', { detail: { category: item._id } }));
    this.props.onClose();
  }

  public render() {
    const { categoryLists, onClose } = this.props;

    return (
      <ClickOutside onClickOutside={onClose}>
        <div className="P-header-categories">
          {categoryLists && categoryLists.length && categoryLists.map((item, index) => (
            <div className="P-list" key={index}>
              {item && item.list.map(sub => (               
                <div
                  className={item.choosedId === sub._id ? 'P-category-choosed' : ''}
                  onMouseOver={() => this.hoverCategory(sub, index)}
                  onClick={() => this.chooseCategory(sub)}
                  key={sub._id}
                >
                  {sub.icon && <img src={sub.icon} alt="category icon" />}
                  <h3>{sub.name}</h3>
                  {!!sub.subCategoryCount && <i className="icon-right" />}
                </div>
              ))}
            </div>     
          ))}
        </div>
          {/* <div>
              <div>{this.visitedRoutes[0].name}</div>
              <div>{this.visitedRoutes[1].name}</div>
              <div>{this.visitedRoutes[3].name}</div>
          </div> */}
      </ClickOutside>
    );
  }
};

export default Categories;