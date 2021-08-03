import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ListItem from './components/list-item';
import ROUTES from 'platform/constants/routes';
import { IProductListResponseModel } from 'platform/api/product/models/response';

import './style.scss';
import ProductController from 'platform/api/product';
import Slider from "react-slick";
import { ProductSortEnum } from 'platform/api/product/constants/enums';

interface IState {
  data: IProductListResponseModel[];
};

class DiscountedProducts extends HelperComponent<{}, IState> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const result = await ProductController.GetSpecialProducts();
    console.log("zexchvac u chzexchvac apranqneri gner@ ka estex-->",result)
    this.safeSetState({ data: result && result.data && result.data || [] });
  }

  public settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  }

  public render() {
    const { data } = this.state;

    return data.length ? (
      <section className="G-page P-home-discounted-products">
        <h2 className="G-page-title">{Settings.translations.special_offers}</h2>
        <div className="P-list-wrapper">
          <Slider
            {...this.settings}
            arrows={true}
            swipe={false}
          >
            {console.log("11111111",data)}
            {data.map(item => <div key={item.id}>
              <ListItem data={item} />
            </div>)}
          </Slider>
        </div>
        <Link
          to={`${ROUTES.PRODUCTS.MAIN}?sortBy=6&hasDiscount=true&page=1`}
          className="G-main-ghost-button G-ml-auto G-mr-auto"
        >{Settings.translations.show_all}</Link>
      </section>
    ) : null;
  }
};

export default DiscountedProducts;
