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
import UserController from 'platform/api/user';
import ConfirmModal from 'components/confirm-modal';
import LogoGray from 'assets/images/logo_gray.png';

import './style.scss';
import PhotoStorage from 'platform/services/photoStorage';
import { PromotionTypeEnum } from 'platform/constants/enums';

interface IProps {
  data: IProductListResponseModel;
  specialProductId?: number | null;
};

const ListItem = React.memo((props: IProps) => {
  const [loadingImage, setLoadingImage] = React.useState('');
  const [data, setData] = React.useState(props.data);
  const [cartLoading, setCartLoading] = React.useState<boolean>(false);
  const [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(1);

  React.useEffect(() => {
    data.imagePath && PhotoStorage.getURL(data.imagePath).then(url => setLoadingImage(url));
  }, []);

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

  const addSpecialProduct = async () => {
    setConfirmModal(false);
    const result = await UserController.UpdatePreferredProductList({
      newProductId: data.id,
      oldProductId: props.specialProductId ? +props.specialProductId : undefined,
    });
    if (result && result.success) {
      window.routerHistory.push(ROUTES.PROFILE.SPECIAL_PRODUCTS);
    }
  }

  const isDiscount = !!data?.promotion?.result && data.promotion.promotionType === PromotionTypeEnum.Discount;

  return (
    <>
      <Link className="P-products-list-item" to={ROUTES.PRODUCTS.DETAILS.replace(':id', data.id)}>
        {!!data.promotion.percent && <DiscountLabel percent={data.promotion.percent} type={data.promotion.promotionType} />}
        <div className="P-image" style={{ background: `url('${getMediaPath(loadingImage)}') center/contain no-repeat` }} />
        
        {!Settings.guest && <i
          onClick={toggleFavorite}
          className={`P-favorite ${data.isFavorite ? 'P-active icon-Group-5520' : 'icon-Group-5518'}`}
        />}

        {!Settings.guest && props.specialProductId && <i
          onClick={(e) => {e.preventDefault(), setConfirmModal(true)}}
          className={`P-special-add icon-Group-5532`}
        />}

        <h3>{truncateText(data.title)}</h3>
        
        <div className="P-price" onClick={(e: React.SyntheticEvent) => e.preventDefault()}>
          <div className="P-product-price-container">
            {isDiscount && <del className="P-without-discount-price">{formatPrice(data.price)}</del>}
            <span>{formatPrice(isDiscount ? data.promotion.result : data.price)}</span>
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

      {confirmModal && <ConfirmModal
        text={Settings.translations.special_product_confirm}
        onConfirm={addSpecialProduct}
        onClose={() => setConfirmModal(false)}
      />}
    </>
  );
});

export default ListItem;