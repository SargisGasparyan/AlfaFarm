import * as React from 'react';

import { Shared } from 'modules';
import Settings from 'platform/services/settings';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import { truncateText, formatPrice } from 'platform/services/helper';
import BasketController from 'platform/api/basket';
import LoaderContent from 'components/loader-content';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import ROUTES from 'platform/constants/routes';
import { Link } from 'react-router-dom';
import PhotoStorage from 'platform/services/photoStorage';
import { PromotionTypeEnum } from 'platform/constants/enums';

import './style.scss';

interface IProps {
  data: IProductListResponseModel;
};

const ListItem = React.memo(({ data }: IProps) => {
  const [loadingImage, setLoadingImage] = React.useState('');
  const [cartLoading, setCartLoading] = React.useState(false);
  const addToCart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCartLoading(true);

    await BasketController.Change({
      productId: data.id,
      productQuantity: 1,
      isPackage: true,
    });

    window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    setCartLoading(false);
  }

  React.useEffect(() => {
    data.imagePath && PhotoStorage.getURL(data.imagePath).then(url => setLoadingImage(url));
  }, []);

  const isDiscount = !!data?.promotion?.result && data.promotion.promotionType === PromotionTypeEnum.Discount;

  return (
    <Link to={ROUTES.PRODUCTS.DETAILS.replace(':id', data.id)} className="P-home-discounted-products-list-item">
      {!!data.promotion.percent && <Shared.Products.DiscountLabel percent={data.promotion.percent} type={data.promotion.promotionType} />}
      <div className="P-image" style={{ background: `url('${loadingImage}') center/contain no-repeat` }} />
      <h3>{truncateText(data.title)}</h3>
      {isDiscount && <del className="P-without-discount-price">{formatPrice(data.price)}</del>}
      <span className="P-price">{formatPrice(isDiscount ? data.promotion.result : data.price)}</span>
      <LoaderContent
        loading={cartLoading}
        className="G-main-button"
        onClick={addToCart}
      >{Settings.translations.add_to_cart}</LoaderContent>
    </Link>
  )
});

export default ListItem;
