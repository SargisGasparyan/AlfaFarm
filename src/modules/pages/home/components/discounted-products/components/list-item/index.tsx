import * as React from 'react';

import { Shared } from 'modules';
import Settings from 'platform/services/settings';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import { getMediaPath, truncateText, formatPrice } from 'platform/services/helper';
import BasketController from 'platform/api/basket';
import LoaderContent from 'components/loader-content';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';
import ROUTES from 'platform/constants/routes';
import { Link } from 'react-router-dom';

interface IProps {
  data: IProductListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => {
  const [cartLoading, setCartLoading] = React.useState<boolean>(false);
  const addToCart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCartLoading(true);

    await BasketController.Change({
      productId: data.id,
      productQuantity: 1,
    });

    window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    setCartLoading(false);
  }

  return (
    <Link to={ROUTES.PRODUCTS.DETAILS.replace(':id', data.id)} className="P-home-discounted-products-list-item">
      {!!data.promotion.percent && <Shared.Products.DiscountLabel percent={data.promotion.percent} type={data.promotion.promotionType} />}
      <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/contain no-repeat` }} />
      <h3>{truncateText(data.title)}</h3>
      {!!data.discount && <del className="P-without-discount-price">{formatPrice(data.price)}</del>}
      <span className="P-price">{formatPrice(data.discountedPrice || data.price)}</span>
      <LoaderContent
        loading={cartLoading}
        className="G-main-button"
        onClick={addToCart}
      >{Settings.translations.add_to_cart}</LoaderContent>
    </Link>
  )
});

export default ListItem;