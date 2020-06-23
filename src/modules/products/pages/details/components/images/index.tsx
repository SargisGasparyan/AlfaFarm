import * as React from 'react';

import { IProduct, IProductImage } from 'platform/api/product';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  details: IProduct;
  currentImage: string;
  onChange(id: string): void;
}

interface IState {
  photosPackIndex: number;
  choosedImage: IProductImage | null;
}

class Images extends HelperComponent<IProps, IState> {

  public state: IState = {
    photosPackIndex: 0,
    choosedImage: null,
  };

  public static getDerivedStateFromProps(nextProps: IProps, state: IState) {
    if (!state.choosedImage || nextProps.currentImage !== state.choosedImage._id) {
      const { details, currentImage } = nextProps;
      let choosedPosition = null;
      const choosedImage = details.images.find((item, index) => {
        if (item._id === currentImage) {
          choosedPosition = index + 1;
          return true;
        }
  
        return false;
      });

      if (!choosedImage) return null;
  
      if (choosedPosition && choosedPosition / 3 % 1) {
        return { photosPackIndex: Math.floor(choosedPosition / 3), choosedImage };
      } else if (choosedPosition) return { photosPackIndex: choosedPosition / 3 - 1, choosedImage };
  
  
      return { choosedImage };  
    }

    return null;
  }  
  private showScrollUp = () => {
    const { photosPackIndex } = this.state;
    return !!photosPackIndex;
  };

  private showScrollDown = () => {
    const { details } = this.props;
    const { photosPackIndex } = this.state;
    return details.images.length - (photosPackIndex + 1) * 3 > 0;
  };

  private scrollUp = () => this.safeSetState({ photosPackIndex: this.state.photosPackIndex - 1 });
  private scrollDown = () => this.safeSetState({ photosPackIndex: this.state.photosPackIndex + 1 });

  private choose = (image: IProductImage) => this.props.onChange(image._id);

  private currentTransform = () => {
    const { photosPackIndex } = this.state;
    const calculation = `calc(${photosPackIndex * -300}% - ${photosPackIndex * 60}px)`;
    return `translateY(${calculation})`;
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
    const { choosedImage } = this.state;
    const { details } = this.props;

    return choosedImage ? (
      <div className="P-product-images">
        <div className="P-thumbs">
          {this.showScrollUp() && <span className="P-thumbs-scroll-up">
            <i className="icon-top" onClick={this.scrollUp} />
          </span>}
          {details.images.map(item => <div
            key={item._id}
            style={{ transform: this.currentTransform() }}
            onClick={() => this.choose(item)}
            className={item._id === choosedImage._id ? 'P-choosed' : ''}
          >
            <div style={{ background: `url("${item.path}") center/contain no-repeat` }} />
          </div>)}
          {this.showScrollDown() && <span className="P-thumbs-scroll-down">
            <i className="icon-down" onClick={this.scrollDown} />
          </span>}
        </div>
        <div className="P-current-image">
          {!!details.discount && <span className="G-discount-label">-{details.discount}%</span>}
          <div style={{ backgroundImage: `url("${choosedImage.path}")` }} className="P-zoomable-image" onMouseMove={this.zoom}>
            <img src={choosedImage.path} />
          </div>
        </div>
      </div>
    ) : null;
  }
};

export default Images;