import * as React from 'react';

import { Shared } from 'modules';
import Settings from 'platform/services/settings';
import { IProductListResponseModel } from 'platform/api/product/models/response';

import './style.scss';
import { getMediaPath } from 'platform/services/helper';
import BasketController from 'platform/api/basket';
import LoaderContent from 'components/loader-content';

interface IProps {
  data: IProductListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => {
  const [cartLoading, setCartLoading] = React.useState<boolean>(false);
  const addToCart = async () => {
    setCartLoading(true);
    await BasketController.Change({
      productId: data.id,
      productQuantity: 1,
    });
    setCartLoading(false);
  }

  return (
    <a className="P-home-discounted-products-list-item">
      {!!data.discount && <Shared.Products.DiscountLabel percent={data.discount} />}
      <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/contain no-repeat` }} />
      <h3>{data.title}</h3>
      {/* <del className="P-discounted-price">{data.price / 100 * data.discount} AMD</del> */}
      <span className="P-price">{data.price} AMD</span>
      <LoaderContent
        loading={cartLoading}
        className="G-main-button"
        onClick={addToCart}
      >{Settings.translations.add_to_cart}</LoaderContent>
    </a>
  )
});

export default ListItem;