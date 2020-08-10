import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';

import { INewsDetailsResponseModel } from 'platform/api/news/models/response';
import { getMediaPath } from 'platform/services/helper';

import './style.scss';


interface IProps {
  data: INewsDetailsResponseModel;
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

  public render() {
    const { data } = this.props;
    const { activeId } = this.state;

    const thumbImages = data.images.filter(item => item.id !== activeId);

    return (
      <div className="P-news-details-images">
        <div className="P-current-image" style={{ background: `url("${getMediaPath(this.activeImage)}") center/cover` }} />
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