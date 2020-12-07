import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';
import Select from 'components/select';
import PlaceController from 'platform/api/place';
import { IDropdownOption } from 'platform/constants/interfaces';

import './style.scss';

interface IProps {
  onChange(regionId?: number): void;
};

interface IState {
  cityId?: number;
  regionId?: number;
  cities: IDropdownOption<number>[];
  regions: IDropdownOption<number>[];
};

class SearchOptions extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    cities: [],
    regions: [],
  };

  public async componentDidMount() {
    this.fetchCities();
  }

  private fetchCities = async () => {
    const data = await PlaceController.GetCities();

    this.safeSetState({
      cities: data.data.map(item => ({
        name: item.name,
        value: item.id,
      }))
    });
  }

  private fetchRegions = async () => {
    const { cityId } = this.state;

    if (cityId) {
      const data = await PlaceController.GetRegions(cityId);

      this.safeSetState({
        regions: data.data.map(item => ({
          name: item.name,
          value: item.id,
        }))
      });
    }
  }

  private changeCity = (chosen: IDropdownOption<number> | null) => this.safeSetState({
    cityId: chosen ? chosen.value : undefined,
    regionId: undefined,
    regions: [],
  }, chosen ? this.fetchRegions : undefined);

  private changeRegion  = (chosen: IDropdownOption<number> | null) => this.safeSetState({
    regionId: chosen ? chosen.value : undefined,
  });

  private submit = (e: React.SyntheticEvent) => {
    const { regionId } = this.state;
    const { onChange } = this.props;

    e.preventDefault();
    onChange(regionId);
  };

  public render() {
    const { cityId, regionId, cities, regions } = this.state;

    return (
      <div className="G-page P-pharmacies-search-options">
        <ShadowText>{Settings.translations.pharmacies}</ShadowText>
        <form className="G-main-form P-form P-">
          <div className="G-main-form-half-field">
            <Select<number>
              clear={true}
              value={cityId}
              onChange={this.changeCity}
              placeholder={Settings.translations.city}
              options={cities}
            />
          </div>

          <div className="G-main-form-half-field">
            <Select<number>
              clear={true}
              disabled={!cityId}
              value={regionId}
              onChange={this.changeRegion}
              placeholder={Settings.translations.region}
              options={regions}
            />
          </div>

          <button className="G-main-button" onClick={this.submit}>{Settings.translations.search}</button>
        </form>
      </div>
    );
  };
};

export default SearchOptions;
