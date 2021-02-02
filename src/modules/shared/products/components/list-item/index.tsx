import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';
import CountInput from 'components/count-input';
import { IProductListResponseModel } from 'platform/api/product/models/response';
import { getMediaPath, truncateText, formatPrice } from 'platform/services/helper';
import DiscountLabel from '../discount-label';
import FavoriteController from 'platform/api/favorite';
import BasketController from 'platform/api/basket';
import LoaderContent from 'components/loader-content';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';

interface IProps {
  data: IProductListResponseModel;
};

const ListItem = React.memo((props: IProps) => {
  const [data, setData] = React.useState(props.data);
  const [cartLoading, setCartLoading] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(1);

  const toggleFavorite = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await FavoriteController.AddOrRemove(data.id);
    result.success && setData({ ...data, isFavorite: !data.isFavorite });
  }

  const addToCart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCartLoading(true);
    
    await BasketController.Change({
      productId: data.id,
      productQuantity: count,
      isPackage: true,
    });

    window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
    setCartLoading(false);
  }

  return (
    <Link className="P-products-list-item" to={ROUTES.PRODUCTS.DETAILS.replace(':id', data.id)}>
      {!!data.promotion.percent && <DiscountLabel percent={data.promotion.percent} type={data.promotion.promotionType} />}
      <div className="P-image" style={{ background: `url('${getMediaPath(data.imagePath)}') center/contain no-repeat` }} />
      
      {!Settings.guest && <i
        onClick={toggleFavorite}
        className={`P-favorite ${data.isFavorite ? 'P-active icon-Group-5520' : 'icon-Group-5518'}`}
      />}

      <h3>{truncateText(data.title)}</h3>
      
      <div className="P-price" onClick={(e: React.SyntheticEvent) => e.preventDefault()}>
        <div className="P-product-price-container">
          {(!!data.promotion?.result) && <del className="P-without-discount-price">{formatPrice(data.price)}</del>}
          <span>{formatPrice(data.promotion.result ? data.price - data.promotion.result : data.price)}</span>
        </div>
        <CountInput
          step={1}
          min={1}
          value={count}
          onChange={setCount}
          onlyPlusIfOne={true}
        />
      </div>

      <LoaderContent
        loading={cartLoading}
        className="G-main-button"
        onClick={addToCart}
      >{Settings.translations.add}</LoaderContent>
    </Link>
  );
});

export default ListItem;