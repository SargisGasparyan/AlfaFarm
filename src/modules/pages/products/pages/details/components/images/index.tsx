import * as React from 'react';

import { Shared } from 'modules';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import { getMediaPath } from 'platform/services/helper';

import { IFavoriteListResponseModel } from 'platform/api/favorite/models/response';
import FavoriteController from 'platform/api/favorite';

import './style.scss';
import Settings from 'platform/services/settings';

interface IProps {
  data: IProductDetailsResponseModel;
  onChange(data: IProductDetailsResponseModel): void;
}

interface IState {
  activeId: number;
  photosPackIndex: number;
}

class Images extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    activeId: 0,
    photosPackIndex: 0,
  };

  public componentDidMount() {
    const { data } = this.props;
    this.safeSetState({ activeId: data.images[0].id });
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

  public render() {
    const { data } = this.props;
    const { activeId } = this.state;

    const thumbImages = data.images.filter(item => item.id !== activeId);

    return (
      <div className="P-product-details-images">
        {!!data.discountedPrice && <Shared.Products.DiscountLabel percent={-Math.round(100 - (100 / data.price * data.discountedPrice))}/>}
        <div className="P-current-image">
          <div>
            <img src={getMediaPath(this.activeImage)} />
          </div>

          {!Settings.guest && <i
            onClick={e => this.toggleFavorite(e, data)}
            className={`P-favorite ${data.isFavorite ? 'P-active icon-Group-5520' : 'icon-Group-5518'}`}
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
      </div>
    );
  }
};

export default Images;