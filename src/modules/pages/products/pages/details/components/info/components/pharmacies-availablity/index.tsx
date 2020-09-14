import * as React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';

import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';
import Maps from 'components/maps';
import { getViewEnum, formatTime } from 'platform/services/helper';
import { WeekDaysEnum } from 'platform/constants/enums';
import SearchInput from 'components/search-input';
import Modal from 'components/modal';

import './style.scss';

interface IProps {
  data: IPharmacyBranchListResponseModel[];
  onClose(): void;
};

interface IState {
  searchValue: string;
  hoveredMarkerIndex?: number;
};

class PharmaciesAvailablity extends HelperComponent<IProps, IState> {

  public state: IState = {
    searchValue: '',
  };
  
  private weeksViewEnum = getViewEnum(WeekDaysEnum);

  private get data() {
    const { data} = this.props;
    const { searchValue } = this.state;

    if (!searchValue) return data;
    return data.filter(item => item.name.includes(searchValue));
  }

  private get markers() {
    return this.data.map((item, index) => ({
      position: { lat: item.addressLat, lng: item.addressLng },
      onMouseOver: () => this.toggleMarker(index),
      onMouseOut: () => this.toggleMarker(),
    }));
  }

  private get hoveredMarkerData() {
    const { hoveredMarkerIndex } = this.state;
    return hoveredMarkerIndex || hoveredMarkerIndex === 0 ? this.data[hoveredMarkerIndex] : undefined;
  }

  private toggleMarker = (index?: number) => this.safeSetState({ hoveredMarkerIndex: index });

  private onSearchChange = (searchValue: string) => this.safeSetState({ searchValue });

  public render() {
    const { onClose } = this.props;
    const { hoveredMarkerIndex } = this.state;

    return (
      <Modal className="P-product-pharmacies-availablity-modal" onClose={onClose}>
        <div className="P-content">
          <div className="P-list">
            <h2>{Settings.translations.availability_at_the_nearest_pharmacy}</h2>
            {this.data.map((item, index) => <h3
              key={item.id}
              onMouseOver={() => this.toggleMarker(index)}
              onMouseOut={() => this.toggleMarker()}
            >{item.name}</h3>)}
          </div>
          

          <div className="P-maps-wrapper">
            <SearchInput onChange={this.onSearchChange} />
            <Maps>
              {this.markers.map((item, index) => <Marker key={index} {...item}>
                {hoveredMarkerIndex === index && this.hoveredMarkerData && <InfoWindow>
                  <div className="P-info-window">
                    <h3 className="G-orange-color G-text-center P-name">{this.hoveredMarkerData.name}</h3>
                    <h4 className="P-info-row G-flex-center">
                      <i className="icon-Group-5522 G-orange-color" /> <span>{this.hoveredMarkerData.contactPhoneNumber}</span>
                    </h4>
                    <h4 className="P-info-row">
                      <i className="icon-Group-5554 G-orange-color" />
                      <this.WorkingPlan />
                    </h4>
                  </div>
                </InfoWindow>}
              </Marker>)}
            </Maps>
          </div>
        </div>
      </Modal>
    );
  }

  private WorkingPlan = () => {
    if (!this.hoveredMarkerData) return null;

    return <div>
      {this.hoveredMarkerData.workingPlan.map((item, index, arr) => <span key={index}>
        {Settings.translations[this.weeksViewEnum[item.startDay]]}
        {item.endDay ? '-' + Settings.translations[this.weeksViewEnum[item.endDay]] : ''}
        &nbsp;&nbsp;
        {item.isDayOff ? Settings.translations.day_off : `${formatTime(item.startTime)}-${formatTime(item.endTime)}`}
      </span>)}
    </div>
  }
};

export default PharmaciesAvailablity;