import * as React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';

import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import Maps from 'components/maps';
import { getViewEnum, formatTime } from 'platform/services/helper';
import { WeekDaysEnum } from 'platform/constants/enums';
import SearchInput from 'components/search-input';
import Modal from 'components/modal';
import { IProductDetailsResponseModel, IProductAvailablityResponseModel } from 'platform/api/product/models/response';

import './style.scss';
import PageLoader from 'components/page-loader';
import ProductController from 'platform/api/product';
import Screen from 'components/screen';

interface IProps {
  data: IProductDetailsResponseModel;
  onClose(): void;
};
interface IState {
  data?: IProductAvailablityResponseModel;
  searchValue: string;
  hoveredMarkerIndex?: number;
};

class PharmaciesAvailablity extends HelperComponent<IProps, IState> {

  public state: IState = {
    searchValue: '',
  };
  
  private weeksViewEnum = getViewEnum(WeekDaysEnum);

  private get filteredData() {
    const { data } = this.state;
    const { searchValue } = this.state;

    if (!data) return [];

    if (!searchValue || !searchValue.trim()) return data.branches;

    const searchParams = searchValue.split(' ').filter(x => !!x);
    
    return data.branches.filter(item => (
      searchParams.every(x => item.name
        .toLowerCase()
        .includes(x.toLowerCase()))
    )); 
  }

  private get markers() {
    return this.filteredData.map((item, index) => ({
      position: { lat: item.addressLat, lng: item.addressLng },
      onMouseOver: () => this.toggleMarker(index),
      onMouseOut: () => this.toggleMarker(),
    }));
  }

  private get hoveredMarkerData() {
    const { hoveredMarkerIndex } = this.state;
    return hoveredMarkerIndex || hoveredMarkerIndex === 0 ? this.filteredData[hoveredMarkerIndex] : undefined;
  }

  public componentDidMount() { this.fetchData(); }

  private toggleMarker = (index?: number) => this.safeSetState({ hoveredMarkerIndex: index });

  private onSearchChange = (searchValue: string) => this.safeSetState({ searchValue });

  private fetchData = async () => { 
    const { data } = this.props;
    const result = await ProductController.GetAvailablity(data.id);
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;
    const { onClose } = this.props;
    const { hoveredMarkerIndex } = this.state;

    return data ? (
      <Modal className="P-product-pharmacies-availablity-modal" onClose={onClose}>
        <div className="P-content">
          <Screen.Desktop>
            {(match: boolean) => match && <div className="P-list">
              <h2>{Settings.translations.availability_at_the_nearest_pharmacy}</h2>
              {this.filteredData.length ? this.filteredData.map((item, index) => <h3
                key={item.id}
                onMouseOver={() => this.toggleMarker(index)}
                onMouseOut={() => this.toggleMarker()}
              >{item.name}</h3>) : <h3>{Settings.translations.no_search_result}</h3>}
            </div>}
          </Screen.Desktop>

          <div className="P-maps-wrapper">
            <SearchInput onChange={this.onSearchChange} />
            <Maps>
              {this.markers.map((item, index) => <Marker key={index} {...item}>
                {hoveredMarkerIndex === index && this.hoveredMarkerData && <InfoWindow>
                  <div className="P-info-window">
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
              </Marker>)}
            </Maps>
          </div>
        </div>
      </Modal>
    ) : <PageLoader />;
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