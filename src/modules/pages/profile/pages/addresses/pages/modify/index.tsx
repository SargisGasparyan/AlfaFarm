import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { validateForm } from './services/helper';
import { IUserAddressModifyRequestModel } from 'platform/api/userAddress/models/request';
import UserAddressController from 'platform/api/userAddress';
import generic from 'platform/decorators/generic';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IDropdownOption, IGooglePlace } from 'platform/constants/interfaces';
import PlaceController from 'platform/api/place';
import Select from 'components/select';

interface IState {
  form: IUserAddressModifyRequestModel;
  cities: IDropdownOption<number>[];
  regions: IDropdownOption<number>[];
  cityId: number;
  edited: boolean;
  submited: boolean;
  submitLoading: boolean;
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute([ROUTES.PROFILE.ADDRESSES.CREATE, ROUTES.PROFILE.ADDRESSES.UPDATE])
class Modify extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {
    edited: false,
    submited: false,
    submitLoading: false,
    cityId: 0,
    cities: [],
    regions: [],
    form: {
      name: '',
      addressText: '',
      addressLat: 0,
      addressLng: 0,
    },
  };

  public componentDidMount() {
    this.fetchData();
    this.fetchCities();
  }

  private fetchData = async () => {
    const { id } = this.props.match.params;

    if (id) {
      const result = await UserAddressController.GetDetails(+id);
      const { form } = this.state;
      form.name = result.data.name;
      form.addressText = result.data.addressText;
      form.addressLat = result.data.addressLat;
      form.addressLng = result.data.addressLng;
      this.safeSetState({ form }, this.fetchRegions);
    }
  }

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private goBack = () => window.routerHistory.goBack();

  private fetchCities = async () => {
    const result = await PlaceController.GetCities();
    this.safeSetState({ cities: result.data.map(item => ({ name: item.name, value: item.id })) })
  }

  private fetchRegions = async () => {
    const { cityId } = this.state;
    const result = await PlaceController.GetRegions(cityId);
    this.safeSetState({ regions: result.data.map(item => ({ name: item.name, value: item.id })) })
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form, edited: true });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const { id } = this.props.match.params;
        const { form } = this.state;
        const result = id ? await UserAddressController.Update(+id, form) : await UserAddressController.Create(form);
        
        if (result.data) window.routerHistory.push(ROUTES.PROFILE.ADDRESSES.MAIN);
        else this.safeSetState({ submitLoading: false });
      });
    });
  }

  private onAddressChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.addressText = e.currentTarget.value;
    form.addressLat = 0;
    form.addressLng = 0;
    this.safeSetState({ form })
  }

  private onAddressSelect = (place: IGooglePlace) => {
    const { form } = this.state;
    form.addressText = place.formatted_address;
    form.addressLat = place.geometry.location.lat();
    form.addressLng = place.geometry.location.lng();
    this.safeSetState({ form });
  }

  public render() {
    const { form, cityId, cities, regions, edited, submitLoading } = this.state;

    return (
      <Layout>
        <div className="G-flex G-flex-wrap">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <form className="G-main-form P-form-block G-mr-20">
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.name}</p>
              <input
                name="name"
                value={form.name}
                className={`G-main-input ${this.formValidation.errors.name ? 'G-invalid-field' : ''}`}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.address}</p>
              <Autocomplete
                placeholder=""
                value={form.addressText || ''}
                className={`G-main-input ${this.formValidation.errors.address ? 'G-invalid-field' : ''}`}
                onChange={this.onAddressChange}
                onPlaceSelected={this.onAddressSelect}
                componentRestrictions={{country: 'am'}}
              />
            </div>
            <LoaderContent
              className="G-main-button"
              loading={submitLoading}
              onClick={this.submit}
            >{Settings.translations.save}</LoaderContent>
          </form>
        </div>
      </Layout>
    );
  }
}

export default Modify;