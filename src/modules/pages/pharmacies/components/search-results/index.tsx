import * as React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';

import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import ShadowText from 'components/shadow-text';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';
import Maps from 'components/maps';
import { getViewEnum, formatTime } from 'platform/services/helper';
import { WeekDaysEnum } from 'platform/constants/enums';
import SearchInput from 'components/search-input';

import './style.scss';
import ClickOutside from 'components/click-outside';

interface IProps {
  data: IPharmacyBranchListResponseModel[];
};

interface IState {
  searchValue: string;
  hoveredMarkerIndex?: number;
};

class SearchResults extends HelperComponent<IProps, IState> {

  public state: IState = {
    searchValue: '',
  };
  
  private weeksViewEnum = getViewEnum(WeekDaysEnum);

  private get data() {
    const { data} = this.props;
    const { searchValue } = this.state;

    if (!searchValue) return data;
    return data.filter(item => item.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
    );
  }

  private get markers() {
    return this.data.map((item, index) => ({
      position: { lat: item.addressLat, lng: item.addressLng },
      onClick: () => this.toggleMarker(index),
    }));
  }

  private get hoveredMarkerData() {
    const { hoveredMarkerIndex } = this.state;
    return hoveredMarkerIndex || hoveredMarkerIndex === 0 ? this.data[hoveredMarkerIndex] : undefined;
  }

  private toggleMarker = (index?: number) => {
    const { hoveredMarkerIndex } = this.state;
    this.safeSetState({ hoveredMarkerIndex: hoveredMarkerIndex === index ? undefined : index });
  }

  private onSearchChange = (searchValue: string) => this.safeSetState({ searchValue });

  private infoWindowClickOutside = (e: MouseEvent) => {
    e.stopPropagation();
    this.toggleMarker();
  }

  public render() {
    const { hoveredMarkerIndex } = this.state;

    return (
      <section id="pharmacy-search-results" className="G-page P-pharmacies-search-results">
        <ShadowText className="G-text-center">{Settings.translations.search_results}</ShadowText>

        <div className="P-content">
          <div className="P-list">
            {this.data.length ? this.data.map((item, index) => <h3
              key={item.id}
              onMouseOver={() => this.toggleMarker(index)}
              onMouseOut={() => this.toggleMarker()}
            >{item.name}</h3>) : <h3>{Settings.translations.no_search_result}</h3>}
          </div>
          

          <div className="P-maps-wrapper">
            <SearchInput onChange={this.onSearchChange} />
            <Maps>
              {this.markers.map((item, index) => <Marker key={index} {...item}>
                {hoveredMarkerIndex === index && this.hoveredMarkerData && <InfoWindow>
                  <ClickOutside onClickOutside={this.infoWindowClickOutside}>
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
                  </ClickOutside>
                </InfoWindow>}
              </Marker>)}
            </Maps>
          </div>
        </div>
      </section>
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

export default SearchResults;