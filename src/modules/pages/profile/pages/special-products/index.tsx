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
import HelpIcon from 'assets/images/help-icon.svg';

import './style.scss';
import EmptyState from 'components/empty-state';
import SpecialProductHelp from './components/help';
import PhotoStorage from 'platform/services/photoStorage';
import * as animationData from 'assets/animations/EmptySpecialProducts.json';
import * as loadingData from 'assets/animations/loading.json';

interface IState {
  data: IPreferredProductListResponseModel[] | null;
  helpIsOpen: boolean;
  isLoading: boolean;
};

@byPrivateRoute(ROUTES.PROFILE.SPECIAL_PRODUCTS, [onlyForUsers])
class SpecialProducts extends HelperComponent<IState, {}> {

  public state: IState = {
    data: null,
    helpIsOpen: false,
    isLoading: true
  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const result = await UserController.GetPreferredProductList();
    this.safeSetState({
      data: result.data.map(item => ({
        ...item,
        expiredDate: new Date(item.expiredDate).getTime()
      }))
    }, async () => {
      const { data } = this.state;
      if (data) {
        const photoResult = await Promise.all(data.map(item => PhotoStorage.getURL(item.imagePath).then(url => ({
          ...item,
          imagePath: url
        }))));

        this.safeSetState({ data: photoResult, isLoading: false });
      }
    });
  };

  private openHelp = () => {
    this.safeSetState({ helpIsOpen: true });
  };

  private closeHelp = () => {
    this.safeSetState({ helpIsOpen: false });
  };

  private changeProduct = async (e: React.SyntheticEvent, item: IPreferredProductListResponseModel) => {
    e.preventDefault();
    if (Date.now() >= +item.expiredDate) window.routerHistory.push(`${ROUTES.PRODUCTS.MAIN}?preferredProductId=${item.id}`);
    else {
      const alertify = await import('alertifyjs');
      alertify.error(Settings.translations.special_products_replace_fail(formatDate(item.expiredDate, false)));
    }
  };

  public render() {
    const { data, helpIsOpen, isLoading } = this.state;

    return (
      <Layout>
        <div className="G-flex G-flex-align-center G-flex-justify-between G-mb-30">
          <h2 className="G-clr-main">{Settings.translations.special_product}</h2>
          <img src={HelpIcon} className="P-help-icon" onClick={this.openHelp} alt=""/>
        </div>
        <div className="G-flex P-profile-special-products">

          {data ? (data.length ? data.map(item => <Link
            to={ROUTES.PRODUCTS.DETAILS.replace(':id', item.id)}
            key={item.id}
            className="P-list-item"
          >
            <div
              className="P-image G-square-image-block"
              style={{ background: `url('${getMediaPath(item.imagePath)}') center/contain no-repeat` }}
            />

            <div className="P-main-info">
              <p
                className="G-clr-gray P-prod-date">
                <span>{+item.expiredDate < Date.now() ? Settings.translations.expired_text : Settings.translations.expire_text } </span>
                <span> { formatDate(item.expiredDate, false)}</span></p>
              <p className="P-prod-title">{item.title}</p>
              <p>{item.unitQuantity} {item.unitName}</p>
            </div>


            <div className="P-price G-mr-10 G-clr-orange">{formatPrice(item.price)}</div>
            <div
              className={`G-clr-main P-edit-icon ${Date.now() < +item.expiredDate ? 'P-disabled' : ''}`}
              onClick={e => this.changeProduct(e, item)}><i className="icon-Group-5545"/>
            </div>


          </Link>) :
            <EmptyState animationData={isLoading ? loadingData : animationData} text={isLoading ? '' : Settings.translations.empty_special_products}/>) : null}
        </div>

        {helpIsOpen ? <SpecialProductHelp onClose={this.closeHelp}/> : null}
      </Layout>
    );
  }
}

export default SpecialProducts;
