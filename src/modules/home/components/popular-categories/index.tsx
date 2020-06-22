import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Settings from 'platform/services/settings';
import CategoryController, { IHomeCategory } from 'platform/api/category';
import ROUTES from 'platform/constants/routes';
import { BackArrow, NextArrow } from 'components/slider-arrows';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState {
  data: IHomeCategory[] | null;
};

class PopularCategories extends HelperPureComponent<{}, IState> {

  public state: IState = { data: null };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await CategoryController.Home();
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return (<div className={`${!data ? 'no-item' : ''}`}>
      <h2 className="P-G-page-title">{Settings.translations.popular_categories}</h2>
      {data && data.length ? <>
        <Slider
          className="variable-width P-popular-categories"
          infinite={true}
          variableWidth={true}
          draggable={false}
          slidesToShow={1}
          prevArrow={<BackArrow />}
          nextArrow={<NextArrow />}
        >
          {data.map(item => <div key={item._id} className="P-category">
            <Link
              to={`${ROUTES.PRODUCTS.LIST}?category=${item._id}`}
              title={item.name}
              className="P-title"
            >{item.name}</Link>
            {item.itemList.map(category => <Link
              to={`${ROUTES.PRODUCTS.LIST}?category=${category._id}`}
              key={category._id}
              className="P-item"
            >
              <div className="P-cover" style={{ background: `url("${category.imagePath}") center/cover no-repeat` }} />
              <h3>
                {category.name}
                <span>{category.itemCount} {Settings.translations.products}</span>
              </h3>
            </Link>)}
          </div>)
          }
        </Slider>
        </> :
        <div className="T-small-loader-wrap">
          <div className="loader-small" />
        </div>
        }

    </div>);
  }
};

export default PopularCategories;