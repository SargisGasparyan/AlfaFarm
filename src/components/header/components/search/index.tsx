import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import ClickOutside from 'components/click-outside';
import Settings from 'platform/services/settings';
import { IProductSearchProductResponseModel, IProductSearcResponseModel } from 'platform/api/product/models/response';
import { Link } from 'react-router-dom';
import { formatPrice, getMediaPath } from 'platform/services/helper';
import BasketController from 'platform/api/basket';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import LoaderContent from 'components/loader-content';
import PhotoStorage from 'platform/services/photoStorage';
import { PromotionTypeEnum } from 'platform/constants/enums';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';
import SearchHistory from 'platform/services/searchHistory';


interface IProps {
  searchText: string;
  data: IProductSearcResponseModel | null;
  historyShown: boolean;
  onClose(): void;
}

interface IState {
  data: IProductSearcResponseModel | null;
}

class SearchPopup extends HelperComponent<IProps, IState> {

  public state: IState = {
    data: null,
  }

  public componentDidMount() {
    const { data } = this.props;
    this.safeSetState({ data }, async () => {
      if (data) {
        const photoResult = await Promise.all(data.products.map(item => PhotoStorage.getURL(item.imagePath).then(url => ({
          ...item,
          imagePath: url,
        }))));
  
        data.products = photoResult;
        this.safeSetState({ data });  
      }
    });
  }

  private changeCart = (e: Event | React.SyntheticEvent, item: IProductSearchProductResponseModel) => {
    e.stopPropagation();
    let data = this.state.data as IProductSearcResponseModel;
    const element = data.products.find(x => x.id === item.id);
    if (element) {
      element.cartLoading = true;
      data = {
        ...data,
        products: [...data.products]
      };
    }
    this.safeSetState({ data }, async () => {
      await BasketController.Change({
        productId: item.id,
        productQuantity: 1,
        isPackage: true,
      });
      if (element) {
        element.cartLoading = false;
        data = {
          ...data,
          products: [...data.products]
        };
      }
      window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
      this.safeSetState({ data });
    }); 
  }

  private clickOnItem = (item: IProductSearchProductResponseModel) => {
    SearchHistory.add(item);
    window.routerHistory.replace(ROUTES.PRODUCTS.DETAILS.replace(':id', item.id));
    this.props.onClose();
  }

  private clearAll = () => {
    SearchHistory.clear();
    this.props.onClose();
  }

  public render() {
    const { data } = this.state;
    const { searchText, onClose, historyShown } = this.props;

    return (
      <ClickOutside onClickOutside={onClose}>
        <aside className="P-header-search-result">
          {historyShown ? <h6 className="G-flex">
            {Settings.translations.last_search_results}
            <a className="G-ml-auto G-clr-orange G-cursor-pointer" onClick={this.clearAll}>{Settings.translations.clear_all}</a>
          </h6> : <h6 className="G-flex">
            {Settings.translations.products}
            <Link to={`${ROUTES.PRODUCTS.MAIN}?text=${searchText}`} className="G-ml-auto G-clr-orange" onClick={() => onClose()}>{Settings.translations.see_more}</Link>
          </h6>}
          {data && data.products.map(item => (
            <div className="P-list-item" key={item.id} onClick={() => this.clickOnItem(item)}>
              <div className="P-image" style={{ background: `url('${getMediaPath(item.imagePath)}') center/contain no-repeat` }} />

              <div className="P-middle">
                <h5>{item.title}</h5>
                {item.producer && <span className="P-value">{item.producer.name}</span>}
              </div>

              <div className="P-right">
                {!!item.promotion.result && item.promotion.promotionType === PromotionTypeEnum.Discount ? <>
                  <del className="G-ml-auto P-price">{formatPrice(item.price)}</del>
                  <span className="G-clr-orange G-ml-auto P-price">{formatPrice(item.promotion.result)}</span>
                </>: <span className="G-clr-orange G-ml-auto P-price">{formatPrice(item.price)}</span>}

                <LoaderContent
                  loading={item.cartLoading}
                  className="G-main-button"
                  onClick={(e) => this.changeCart(e, item)}
                >{Settings.translations.add_to_cart}</LoaderContent>
              </div>
            </div>
          ))}
        </aside>
      </ClickOutside>
    );
  }
}

export default SearchPopup;
