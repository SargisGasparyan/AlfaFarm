import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import { IProductDetailsResponseModel } from 'platform/api/product/models/response';
import { getMediaPath } from 'platform/services/helper';

import './style.scss';


interface IProps {
  data: IProductDetailsResponseModel;
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
    const { activeId } = this.state;

    const thumbImages = data.images.filter(item => item.id !== activeId);

    return (
      <div className="P-product-details-images">
        <div className="P-current-image">
          <div style={{ backgroundImage: `url("${getMediaPath(this.activeImage)}")` }} className="P-zoomable-image" onMouseMove={this.zoom}>
            <img src={getMediaPath(this.activeImage)} />
          </div>
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