import * as React from 'react';
import { Link } from 'react-router-dom';

import { Shared } from 'modules';
import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import FavoriteController from 'platform/api/favorite';
import Settings from 'platform/services/settings';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import { IFavoriteListResponseModel } from 'platform/api/favorite/models/response';
import SavedBaskets from './pages/saved-baskets';
import SavedBasketItems from './pages/saved-basket-items';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyFavorite.json';
import './style.scss';
import { PromotionTypeEnum } from 'platform/constants/enums';
import * as loadingData from 'assets/animations/loading.json';

interface IState {
  data: IFavoriteListResponseModel[] | null;
  inProgress: boolean;
  isLoading: boolean;
};

@byPrivateRoute(ROUTES.PROFILE.FAVORITES.MAIN)
class Favorites extends HelperComponent<IState, {}> {

  public state: IState = {
    data: null,
    inProgress: false,
    isLoading: true
  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const result = await FavoriteController.GetList();
    this.safeSetState({ data: result.data.map(item => ({ ...item, isFavorite: true })), isLoading: false });
  };

  private toggleFavorite = async (e: React.SyntheticEvent, index: number) => {
    if (!this.state.inProgress) {
      this.safeSetState({ inProgress: true });
      e.preventDefault();
      const data = this.state.data as IFavoriteListResponseModel[];
      const result = await FavoriteController.AddOrRemove(data[index].id);

      if (result.success) {
        data.splice(index, 1);
        this.safeSetState({ data, inProgress: false });
      }
    }
  };

  public render() {
    const { data, isLoading } = this.state;

    return (
      <Layout>
        <section className="P-profile-favorites">
          <h2 className="P-title G-mb-20 G-flex G-flex-justify-between">
            <p className="P-registrations-title">{Settings.translations.favorites}</p>
            <p><Link to={ROUTES.PROFILE.FAVORITES.SAVED_BASKET}>{Settings.translations.saved_carts}</Link></p>
          </h2>
          <div className="P-list">
            {data ? (data.length ? data.map((item, index) => <Link
                to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.id)}
                key={item.id}
                className="P-list-item G-mb-20"
            >
              {!!item.promotion.percent &&
              <Shared.Products.DiscountLabel percent={item.promotion.percent} type={item.promotion.promotionType}/>}
              <div
                  className="P-image G-square-image-block"
                  style={{ background: `url('${getMediaPath(item.imagePath)}') center/cover` }}
              >
                {!Settings.guest && <i
                    onClick={e => this.toggleFavorite(e, index)}
                    className={`P-favorite ${item.isFavorite ? 'P-active icon-Group-5520' : 'icon-Group-5518'}`}
                />}
              </div>

              <div className="P-main-info">
                <p className="P-prod-title">{item.title}</p>
                <p>{item.unitQuantity} {item.unitName}</p>
              </div>

              <div className="P-price">
                <div>{item.promotion.promotionType === PromotionTypeEnum.Discount && item.promotion.result > 0 ?
                    <del>{formatPrice(item.price)}</del> : null}</div>
                <h2
                    className={`${item.promotion.promotionType === PromotionTypeEnum.Discount && item.promotion.result ? 'G-clr-orange' : ''}`}>
                  {item.promotion.promotionType === PromotionTypeEnum.Discount ?
                      formatPrice(item.promotion.result) :
                      formatPrice(item.price)}
                </h2>
              </div>
            </Link>) : <EmptyState animationData={isLoading ? loadingData : animationData} text={isLoading ? '' : Settings.translations.empty_favorites_list}/>) : null}
          </div>
        </section>
      </Layout>
    );
  }
}

export default { Favorites, SavedBaskets, SavedBasketItems };
