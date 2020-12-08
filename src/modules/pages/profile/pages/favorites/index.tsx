import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import FavoriteController from 'platform/api/favorite';
import Settings from 'platform/services/settings';
import { getMediaPath, formatPrice } from 'platform/services/helper';
import { IFavoriteListResponseModel } from 'platform/api/favorite/models/response';

import './style.scss';
import SavedBaskets from '../orders/components/saved-baskets';

interface IState {
  data: IFavoriteListResponseModel[];
};

@byPrivateRoute(ROUTES.PROFILE.FAVORITES)
class Favorites extends HelperComponent<IState, {}> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await FavoriteController.GetList();
    this.safeSetState({ data: result.data.map(item => ({ ...item, isFavorite: true })) });
  }

  private toggleFavorite = async (e: React.SyntheticEvent, index: number) => {
    e.preventDefault();
    const { data } = this.state;
    const result = await FavoriteController.AddOrRemove(data[index].id);

    if (result.success) {
      data.splice(index, 1);
      this.safeSetState({ data });
    }
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <SavedBaskets />

        <div className="G-flex P-profile-favorites">
          {data.map((item, index) => <Link
            to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.id)}
            key={item.id}
            className="P-list-item"
          >
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
              <h2>{item.title}</h2>
              <span>{item.unitQuantity} {item.unitName}</span>
            </div>

            <h2 className="P-price">{formatPrice(item.price)}</h2>
          </Link>)}
        </div>
      </Layout>
    );
  }
}

export default Favorites;