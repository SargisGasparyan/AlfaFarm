import * as React from 'react';

import { Shared } from 'modules';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import { getMediaPath } from 'platform/services/helper';

import { IFavoriteListResponseModel } from 'platform/api/favorite/models/response';
import FavoriteController from 'platform/api/favorite';
import Settings from 'platform/services/settings';
import UserController from 'platform/api/user';
import ConfirmModal from 'components/confirm-modal';

import './style.scss';
import PhotoStorage from 'platform/services/photoStorage';

interface IProps {
  data: IProductDetailsResponseModel;
  onChange(data: IProductDetailsResponseModel): void;
}

interface IState {
  activeId: number;
  photosPackIndex: number;
  confirmModal: boolean;
}

class Images extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    activeId: 0,
    photosPackIndex: 0,
    confirmModal: false,
  };

  public componentDidMount() {
    const { data } = this.props;
    this.safeSetState({ activeId: data.images[0].id }, async () => {
      const { data, onChange } = this.props;
      const result = await Promise.all(data.images.map(item => PhotoStorage.getURL(item.path).then(url => ({
        ...item,
        path: url,
      }))));

      onChange({
        ...data,
        images: result,
      });
    });
  }

  private get activeImage() {
    const { data } = this.props;
    const { activeId } = this.state;

    const finded = data.images.find(item => item.id === activeId);
    return finded ? finded.path : null;
  }

  private setActiveImage = (id: number) => this.safeSetState({ activeId: id });

  private currentTransform = () => {
    const { photosPackIndex } = this.state;
    const calculation = `calc(${photosPackIndex * -300}% - ${photosPackIndex * 60}px)`;
    return `translateY(${calculation})`;
  }

  private toggleFavorite = async (e: React.SyntheticEvent, item: IFavoriteListResponseModel) => {
    e.preventDefault();
    const { data, onChange } = this.props;
    const result = await FavoriteController.AddOrRemove(item.id);

    result && result.success && onChange({
      ...data,
      isFavorite: !data.isFavorite,
    });
  }

  private addSpecialProduct = async () => {
    const { data, onChange } = this.props;
    const result = await UserController.UpdatePreferredProductList({ newProductId: data.id });
    result && result.success && onChange({
      ...data,
      isSpecial: !data.isSpecial,
    });
    this.closeConfirmModal();
  }

  private openConfirmModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ confirmModal: true });
  }
  
  private closeConfirmModal = () => {
    this.safeSetState({ confirmModal: false });
  }

  private zoom = (e: React.MouseEvent) => {
    const zoomer = e.currentTarget as HTMLElement;
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;

    const x = offsetX / zoomer.offsetWidth * 100;
    const y = offsetY / zoomer.offsetHeight * 100;
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }
  public render() {
    const { data } = this.props;
    const { activeId, confirmModal } = this.state;

    const thumbImages = data.images.filter(item => item.id !== activeId);

    return (
      <div className="P-product-details-images">
        {!!data.promotion.percent && <Shared.Products.DiscountLabel percent={data.promotion.percent} type={data.promotion.promotionType} />}
        <div className="P-current-image">
          <div onMouseMove={this.zoom} style={{ backgroundImage: `url("${this.activeImage}")` }} className="I-zoomable-image">
            <img src={getMediaPath(this.activeImage)} />
          </div>

          {!Settings.guest && <i
            onClick={e => this.toggleFavorite(e, data)}
            className={`P-favorite ${data.isFavorite ? 'P-active icon-Group-5520' : 'icon-Group-5518'}`}
          />}

          {!Settings.guest && !data.isSpecial && <i
            onClick={e => this.openConfirmModal(e)}
            className={`P-special-add icon-Group-5532`}
          />}

        </div>
        {!!thumbImages.length && <div className="P-thumbs">
          {thumbImages.map(item => <div
            key={item.id}
            style={{ transform: this.currentTransform() }}
            onClick={() => this.setActiveImage(item.id)}
          >
            <div style={{ background: `url("${getMediaPath(item.path)}") center/contain no-repeat` }} />
          </div>)}
        </div>}

        {confirmModal && <ConfirmModal
          text={Settings.translations.special_product_confirm}
          onConfirm={this.addSpecialProduct}
          onClose={this.closeConfirmModal}
        />}
      </div>
    );
  }
};

export default Images;