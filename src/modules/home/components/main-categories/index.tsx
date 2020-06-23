import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import CategoryController, { IMainHomeCategory } from 'platform/api/category';
import ROUTES from 'platform/constants/routes';
import { getHoverDirection } from 'platform/services/helper';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

const AnimDirectionViewEnum = {
  0: 'top',
  1: 'right',
  2: 'bottom',
  3: 'left',
};

interface IState { categories: IMainHomeCategory[]; };

class MainCategories extends HelperComponent<{}, IState> {

  public state: IState = { categories: [] };

  public async componentDidMount() {
    const result = await CategoryController.MainHome();
    this.safeSetState({ categories: result.data });
  }

  private mouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, category: IMainHomeCategory) => {
    const { categories } = this.state;
    const direction = getHoverDirection(e);
    const notOveredYet = !category.animClass || !category.animClass.includes('P-in-');

    if (notOveredYet && (direction || direction === 0)) {
      const type = AnimDirectionViewEnum[direction];
      category.animClass = `P-in-${type}`;

      this.safeSetState({ categories });
    }
  }

  private mouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, category: IMainHomeCategory) => {
    const { categories } = this.state;
    const direction = getHoverDirection(e);

    if (direction || direction === 0) {
      const type = AnimDirectionViewEnum[direction];
      category.animClass = `P-out-${type}`;
    
      this.safeSetState({ categories });
    }
  }

  public render() {
    const { categories } = this.state;

    return categories && categories.length ? <>
      <h2 className="G-page-title">{Settings.translations.categories}</h2>
      <div className="P-home-categories">
        {categories.map((item, index) => <div
          key={item._id}
          className={`P-flipper ${item.animClass || ''}`}
          onMouseOver={e => this.mouseOver(e, item)}
          onMouseLeave={e => this.mouseOut(e, item)}
        >
          <Link to={`${ROUTES.PRODUCTS.LIST}?category=${item._id}`} className="P-category-front">
            <div style={{ background: `url("${item.cover}") center/contain no-repeat` }} className="P-image" />
            <h3>{item.name}</h3>
          </Link>
          <div className="P-category-back">
            <div>
              {item.subList.map(sub => <Link
                to={`${ROUTES.PRODUCTS.LIST}?category=${sub._id}`}
                key={sub._id}
              >
                {sub.name}
              </Link>)}
            </div>
          </div>
        </div>)}
      </div>
    </> : null;
  }
}

export default MainCategories;