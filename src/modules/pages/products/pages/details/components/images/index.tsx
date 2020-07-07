import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';

import MedicineImage from 'assets/images/medicine.png';
import MedicineImage1 from 'assets/images/medicine_1.jpg';
import MedicineImage2 from 'assets/images/medicine_2.jpg';
import MedicineImage3 from 'assets/images/medicine_3.jpg';

import './style.scss';

const arr = [MedicineImage, MedicineImage1, MedicineImage2, MedicineImage3];

interface IState {
  photosPackIndex: number;
}

class Images extends HelperPureComponent<{}, IState> {

  public state: IState = {
    photosPackIndex: 0,
  };

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

    const random = arr[Math.round(Math.random() * 3)];

    return (
      <div className="P-product-details-images">
        <div className="P-current-image">
          <div style={{ backgroundImage: `url("${random}")` }} className="P-zoomable-image" onMouseMove={this.zoom}>
            <img src={random} />
          </div>
        </div>
        <div className="P-thumbs">
          {[1,2,3].map(item => <div
            key={item}
            style={{ transform: this.currentTransform() }}
          >
            <div style={{ background: `url("${arr[Math.round(Math.random() * 3)]}") center/contain no-repeat` }} />
          </div>)}
        </div>
      </div>
    );
  }
};

export default Images;