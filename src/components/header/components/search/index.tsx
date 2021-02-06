import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ROUTES from 'platform/constants/routes';

import './style.scss';
import ClickOutside from 'components/click-outside';
import Settings from 'platform/services/settings';
import { IProductSearchProductResponseModel, IProductSearcResponseModel } from 'platform/api/product/models/response';
import { Link } from 'react-router-dom';
import { formatPrice, getMediaPath } from 'platform/services/helper';
import BasketController from 'platform/api/basket';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import LoaderContent from 'components/loader-content';

interface IProps {
  data: IProductSearcResponseModel | null;
  onClose(): void;
}

interface IState {
  data: IProductSearcResponseModel | null;
}

class SearchPopup extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    data: null,
  }

  public componentDidMount() {
    this.safeSetState({ data: this.props.data });
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
    window.routerHistory.replace(ROUTES.PRODUCTS.DETAILS.replace(':id', item.id));
    this.props.onClose();
  }

  public render() {
    const { onClose } = this.props;
    const { data } = this.state;

    return (
      <ClickOutside onClickOutside={onClose}>
        <aside className="P-header-search-result">
          <h6>{Settings.translations.products}</h6>
          {data && data.products.map(item => (
            <div className="P-list-item" key={item.id} onClick={() => this.clickOnItem(item)}>
              <div className="P-image" style={{ background: `url('${getMediaPath(item.imagePath)}') center/contain no-repeat` }} />

              <div className="P-middle">
                <h5>{item.title}</h5>
                {item.activeIngredients?.length && <span className="P-value">{item.activeIngredients.map(x => x.name).join(', ')}</span>}
                {item.producer && <span className="P-value">{item.producer.name}</span>}
                {item.brand && <span className="P-value">{item.brand.name}</span>}
              </div>

              <div className="P-right">
                <span className="G-orange-color G-ml-auto P-price">{formatPrice(item.price)}</span>

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