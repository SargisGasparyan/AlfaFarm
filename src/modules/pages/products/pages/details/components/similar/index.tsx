import * as React from 'react';

import Settings from 'platform/services/settings';
import { Shared } from 'modules';
import Slider from "react-slick";
import { IProductListResponseModel, IProductDetailsResponseModel } from 'platform/api/product/models/response';
import ProductController from 'platform/api/product';

import './style.scss';
import { Link } from 'react-router-dom';
import ROUTES from 'platform/constants/routes';

interface IProps {
  data: IProductDetailsResponseModel;
};

const Similar = React.memo(({ data }: IProps) => {
  const [list, setList] = React.useState<IProductListResponseModel[]>([]);

  const settings = {
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

  React.useEffect(() => {
    ProductController.GetRelated(data.id, { pageNumber: 1, pageSize: 4 }).then(result => {
      setList((result.data && result.data.list) || []);
    })
  }, []);

  return list.length ? (
    <div className="P-product-details-similar">
      <h2 className="P-title">{Settings.translations.similar_products}</h2>
      <div className="P-list">
        <Slider
          {...settings}
          arrows={true}
          swipe={false}
        >
          {list.map(item => <div key={item.id}>
            <Shared.Products.ListItem data={item} />
          </div>)}
        </Slider>
        {/* {list.map(item => <Shared.Products.ListItem key={item.id} data={item} />)} */}
      </div>
      {list.length > 4 && <Link
        to={ROUTES.PRODUCTS.SIMILAR.replace(':id', data.id)}
        className="G-main-ghost-button G-ml-auto G-mr-auto"
      >{Settings.translations.show_all}</Link>}
    </div>
  ) : null;
});

export default Similar;