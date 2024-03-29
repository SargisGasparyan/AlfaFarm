import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';

import { IBlogDetailsResponseModel } from 'platform/api/blog/models/response';
import { getMediaPath } from 'platform/services/helper';

import './style.scss';


interface IProps {
  data: IBlogDetailsResponseModel;
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

  public render() {
    const { data } = this.props;
    const { activeId } = this.state;

    const thumbImages = data.images.filter(item => item.id !== activeId);

    return (
      <div className="P-blog-details-images">
        {!!thumbImages.length && <div className="P-thumbs">
          {thumbImages.map(item => <div
            key={item.id}
            style={{ background: `url("${getMediaPath(item.path)}") center/cover` }}
            onClick={() => this.setActiveImage(item.id)}
          />)}
        </div>}
        <div style={{ background: `url("${getMediaPath(this.activeImage)}") center/cover no-repeat` }} className="P-current-image" />
      </div>
    );
  }
};

export default Images;
