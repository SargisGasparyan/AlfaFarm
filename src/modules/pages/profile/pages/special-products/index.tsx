import * as React from 'react';
import { Link } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../components/layout';
import { getMediaPath, formatDate, formatPrice } from 'platform/services/helper';
import { IPreferredProductListResponseModel } from 'platform/api/user/models/response';
import { onlyForUsers } from 'platform/guards/routes';
import UserController from 'platform/api/user';
import Settings from 'platform/services/settings';

import './style.scss';
import EmptyState from 'components/empty-state';

interface IState {
  data: IPreferredProductListResponseModel[];
};

@byPrivateRoute(ROUTES.PROFILE.SPECIAL_PRODUCTS, [onlyForUsers])
class SpecialProducts extends HelperComponent<IState, {}> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await UserController.GetPreferredProductList();
    this.safeSetState({ data: result.data.map(item => ({
      ...item,
      expiredDate: new Date(item.expiredDate).getTime(),
    })) });
  }

  private changeProduct = async (e: React.SyntheticEvent, item: IPreferredProductListResponseModel) => {
    e.preventDefault();
    if (Date.now() >= +item.expiredDate) window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?preferredProductId=${item.id}`);
    else {
      const alertify = await import('alertifyjs');
      alertify.error(Settings.translations.special_products_replace_fail(formatDate(item.expiredDate, false)));
    }
  }

  public render() {
    const { data } = this.state;

    return (
      <Layout>
        <div className="G-flex P-profile-special-products">
          {data.length ? data.map(item => <Link
            to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.id)}
            key={item.id}
            className="P-list-item"
          >
            <div
              className="P-image G-square-image-block"
              style={{ background: `url('${getMediaPath(item.imagePath)}') center/cover` }}
            />

            <div className="P-main-info">
              <p className="G-text-gray-color">{+item.expiredDate < Date.now() ? Settings.translations.expired_text : Settings.translations.expire_text} {formatDate(item.expiredDate, false)}</p>
              <h2>{item.title}</h2>
              <span>{item.unitQuantity} {item.unitName}</span>
            </div>

            <h2 className="P-price">{formatPrice(item.price)}</h2>
            <span
              className={`G-main-color P-edit-icon ${Date.now() < +item.expiredDate ? 'P-disabled' : ''}`}
              onClick={e => this.changeProduct(e, item)}
            >
              <i className="icon-Group-5545" />
            </span>
          </Link>) : <EmptyState text={Settings.translations.empty_special_products} />}
        </div>
      </Layout>
    );
  }
}

export default SpecialProducts;