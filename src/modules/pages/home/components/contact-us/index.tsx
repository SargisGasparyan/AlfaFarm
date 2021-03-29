import * as React from 'react';

import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import Form from './components/form';
import AboutDelivery from './components/about-delivery';
import AboutBonusCard from './components/about-bonus-card';
import AboutMobileApp from './components/about-mobile-app';
import Maps from 'components/maps';
import HelperComponent from 'platform/classes/helper-component';
import PharmacyBranchController from 'platform/api/pharmacyBranch';
import { Marker, InfoWindow } from 'react-google-maps';
import { formatTime, getViewEnum } from 'platform/services/helper';
import { WeekDaysEnum } from 'platform/constants/enums';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';
import MapIconGreen from 'assets/images/map-icon-green.svg';
import MapIconOrange from 'assets/images/map-icon-orange.svg';

import './style.scss';

interface IState {
  branches: IPharmacyBranchListResponseModel[];
  hoveredMarkerIndex?: number;
};

class ContactUs extends HelperComponent<{}, IState> {

  public state: IState = {
    branches: []
  };

  public componentDidMount() { this.fetchData() }
  private weeksViewEnum = getViewEnum(WeekDaysEnum);
  private toggleMarker = (index?: number) => this.safeSetState({ hoveredMarkerIndex: index });

  private fetchData = async () => {
    const result = await PharmacyBranchController.GetList({
      pageSize: 20000,
      pageNumber: 1,
    });

    this.safeSetState({
      branches: result && result.data && result.data.list || []
    });
  }
  private get markers() {
    return this.state.branches.map((item, index) => ({
      position: { lat: item.addressLat, lng: item.addressLng },
      onMouseOver: () => this.toggleMarker(index),
      onMouseOut: () => this.toggleMarker(),
      icon: {
        url: item.isOpen ? MapIconGreen : MapIconOrange,
        scaledSize:  new google.maps.Size(30, 30)
      },
    }));
  }
  private get hoveredMarkerData() {
    const { hoveredMarkerIndex, branches } = this.state;
    return hoveredMarkerIndex || hoveredMarkerIndex === 0 ? branches[hoveredMarkerIndex] : undefined;
  }
  private WorkingPlan = () => {
    if (!this.hoveredMarkerData) return null;
    return <div>
      {this.hoveredMarkerData.workingPlan.map((item, index) => <span key={index}>
        {Settings.translations[this.weeksViewEnum[item.startDay]]}
        {item.endDay ? '-' + Settings.translations[this.weeksViewEnum[item.endDay]] : ''}
        &nbsp;&nbsp;
        {item.isDayOff ? Settings.translations.day_off : `${formatTime(item.startTime)}-${formatTime(item.endTime)}`}
      </span>)}
    </div>
  }

  public render() {
    const { hoveredMarkerIndex } = this.state;

    return (
      <section className="G-page P-home-contact-us">
        <h2 className="G-page-title">{Settings.translations.contact_us}</h2>
        <Form />

        <Maps className="P-maps P-home-map">
          <div className="P-icons-info">
            <p><img src={MapIconGreen} alt="" /> <b> { Settings.translations.open}</b></p>
            <p><img src={MapIconOrange} alt=""/> <b> { Settings.translations.closed}</b></p>
          </div>
          {this.markers.map((item, index) =>
            <Marker key={index} {...item}>
              {hoveredMarkerIndex === index && this.hoveredMarkerData && <InfoWindow>
                <div className="P-info-window P-home-info-window">
                  <h3 className="G-clr-orange G-text-center P-name">{this.hoveredMarkerData.name}</h3>
                  <h4 className="P-info-row G-flex-center">
                    <i className="icon-Group-5522 G-clr-orange" /> <span>{this.hoveredMarkerData.contactPhoneNumber}</span>
                  </h4>
                  <h4 className="P-info-row">
                    <i className="icon-Group-5554 G-clr-orange" />
                    <this.WorkingPlan />
                  </h4>
                </div>
              </InfoWindow>}
            </Marker>
          )}
        </Maps>

    

        <div className="P-bottom">
          <AboutDelivery />
          <AboutBonusCard />
          <AboutMobileApp />
        </div>
      </section>
    );
  }
}

export default ContactUs;
