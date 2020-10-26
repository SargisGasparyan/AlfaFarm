import * as React from 'react';
import * as DateTime from 'react-datetime';
import { Moment } from 'moment';
import Autocomplete from 'react-google-autocomplete';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import { countryCode } from 'platform/constants';
import { OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import Select from 'components/select';
import { OrderDeliveryTypeDropdown } from 'platform/constants/dropdowns';
import { IOrderModifyRequestModel } from 'platform/api/order/models/request';
import Storage from 'platform/services/storage';
import PlaceController from 'platform/api/place';
import { IDropdownOption, IGooglePlace } from 'platform/constants/interfaces';
import { validateForm } from './services/helper';

import { formatDate } from 'platform/services/helper';
import ChooseAddress from './components/choose-address';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import OrderController from 'platform/api/order';
import SuccessModal from 'components/success-modal';

import './style.scss';

interface IState {
  form: IOrderModifyRequestModel;
  cityId?: number;
  cities: IDropdownOption<number>[];
  regions: IDropdownOption<number>[];
  submited: boolean;
  submitLoading: boolean;
  chooseAddressOpen: boolean;
  successModalOpen: boolean;
};

@byRoute(ROUTES.CHECKOUT)
class Checkout extends HelperComponent<{}, IState> {

  public state: IState = {
    cities: [],
    regions: [],
    submited: false,
    submitLoading: false,
    chooseAddressOpen: false,
    successModalOpen: false,
    form: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      deliveryType: OrderDeliveryTypeEnum.Delivery,
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }
  
  public componentDidMount() {
    this.fetchCities();

    if (Storage.profile) {
      const { form } = this.state;
      form.firstName = Storage.profile.firstName;
      form.lastName = Storage.profile.lastName;
      form.phoneNumber = Storage.profile.phoneNumber.substring(`+${countryCode}`.length);
      form.email = Storage.profile.email;
      this.safeSetState({ form });
    }
  }

  private fetchCities = async () => {
    const result = await PlaceController.GetCities();
    this.safeSetState({ cities: result.data.map(item => ({ name: item.name, value: item.id })) })
  }

  private fetchRegions = async () => {
    const { cityId } = this.state;

    if (cityId) {
      const result = await PlaceController.GetRegions(cityId);
      this.safeSetState({ regions: result.data.map(item => ({ name: item.name, value: item.id })) })
    }
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private changeCity = (chosen: IDropdownOption<number>) => {
    const { form } = this.state;
    delete form.userAddressId;
    this.safeSetState({
      form,
      cityId: chosen.value,
      regions: [],
    }, this.fetchRegions);
  }

  private changeRegion = (chosen: IDropdownOption<number>) => {
    const { form } = this.state;
    delete form.userAddressId;
    form.regionId = chosen.value;
    this.safeSetState({ form });
  }

  private addressChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.addressText = e.currentTarget.value;
    form.addressLat = 0;
    form.addressLng = 0;
    this.safeSetState({ form })
  }

  private addressSelect = (place: IGooglePlace) => {
    const { form } = this.state;
    delete form.userAddressId;
    form.addressText = place.formatted_address;
    form.addressLat = place.geometry.location.lat();
    form.addressLng = place.geometry.location.lng();
    this.safeSetState({ form });
  }

  private dateFromChange = (chosen: Moment) => {
    const { form } = this.state;
    form.deliveryDateFrom = chosen.toISOString();
    this.safeSetState({ form });
  }

  private dateToChange = (chosen: Moment) => {
    const { form } = this.state;
    form.deliveryDateTo = chosen.toISOString();
    this.safeSetState({ form });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true  }, async () => {
        const { form } = this.state;
        const result = await OrderController.Create(form);
        if (result.success) this.safeSetState({ successModalOpen: true });
        else this.safeSetState({ submitLoading: false });
      });
    });
  }

  private openAddressChoose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ chooseAddressOpen: true });
  }

  private closeAddressChoose = (chosen?: IUserAddressListResponseModel) => {
    const { form } = this.state;

    if (chosen) {
      form.userAddressId = chosen.id;
      form.addressText = chosen.addressText;
      form.addressLat = chosen.addressLat;
      form.addressLng = chosen.addressLng;
      this.safeSetState({ form, chooseAddressOpen: false }, this.fetchRegions);      
    } else this.safeSetState({ chooseAddressOpen: false });
  }

  private changeDeliveryType = (chosen: IDropdownOption<OrderDeliveryTypeEnum>) => {
    const { form } = this.state;
    form.deliveryType = chosen.value;
    this.safeSetState({ form });
  }

  public render() {
    const { form, cityId, cities, regions, submitLoading, chooseAddressOpen, successModalOpen } = this.state;

    return (
      <section className="G-page P-checkout-page">
        <h1 className="G-page-title">{Settings.translations.fill_your_information}</h1>
        <form className="G-main-form">
          <div className="P-main-info G-half-width">
            <div className="G-main-form-field">
              <input
                name="firstName"
                value={form.firstName}
                className={`G-main-input ${this.formValidation.errors.firstName ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.first_name}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="lastName"
                value={form.lastName}
                className={`G-main-input ${this.formValidation.errors.lastName ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.last_name}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field G-phone-input-wrapper">
              <p className="G-input-country-code">+{countryCode}</p>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                className={`G-main-input ${this.formValidation.errors.phoneNumber ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.phone_number}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="email"
                value={form.email || ''}
                className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.email}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <Select<number>
                placeholder={Settings.translations.city}
                options={cities}
                className={`G-main-select ${this.formValidation.errors.regionId ? 'G-invalid-select' : ''}`}
                value={cityId}
                onChange={this.changeCity}
              />
            </div>
            {!!regions.length && <div className="G-main-form-field">
              <Select<number>
                placeholder={Settings.translations.region}
                options={regions}
                className={`G-main-select ${this.formValidation.errors.regionId ? 'G-invalid-select' : ''}`}
                value={form.regionId}
                onChange={this.changeRegion}
              />
            </div>}
            <div className="G-main-form-field">
              <Autocomplete
                placeholder={Settings.translations.address}
                value={form.addressText || ''}
                className={`G-main-input ${this.formValidation.errors.address ? 'G-invalid-field' : ''}`}
                onChange={this.addressChange}
                onPlaceSelected={this.addressSelect}
                componentRestrictions={{country: 'am'}}
              />
            </div>
          </div>
          <div className="P-delivery-form G-half-width">
            <div className="G-main-form-field G-phone-input-wrapper">
              <Select<OrderDeliveryTypeEnum>
                options={OrderDeliveryTypeDropdown()}
                className="G-main-select"
                value={form.deliveryType}
                onChange={this.changeDeliveryType}
              />
            </div>

            {form.deliveryType === OrderDeliveryTypeEnum.Delivery && <div className="P-delivery-date G-half-width">
              <h4 className="G-fs-normal">{Settings.translations.delivery_date}</h4>
              <div className="G-main-form-half-field">
                <DateTime
                  onChange={this.dateFromChange}
                  inputProps={{
                    value: form.deliveryDateFrom ? formatDate(form.deliveryDateFrom, true) : '',
                    readOnly: true,
                    className: `G-main-input ${this.formValidation.errors.deliveryDateFrom ? 'G-invalid-field' : ''}`,
                    placeholder: '00:00',
                  }}
                />
              </div>
              <span>&#8213;</span>
              <div className="G-main-form-half-field">
                <DateTime
                  onChange={this.dateToChange}
                  inputProps={{
                    value: form.deliveryDateTo ? formatDate(form.deliveryDateTo, true) : '',
                    readOnly: true,
                    className: `G-main-input ${this.formValidation.errors.deliveryDateTo ? 'G-invalid-field' : ''}`,
                    placeholder: '00:00',
                  }}
                />
              </div>
            </div>}
          </div>

          <div className="G-flex G-flex-column">
            <LoaderContent
              className="G-main-button"
              loading={submitLoading}
              onClick={this.submit}
            >{Settings.translations.confirm}</LoaderContent>

            {!Settings.guest && <LoaderContent
              className="G-main-button"
              loading={false}
              onClick={this.openAddressChoose}
            >{Settings.translations.choose_address}</LoaderContent>}
            {chooseAddressOpen && <ChooseAddress onClose={this.closeAddressChoose} />}
          </div>
        </form>
        {successModalOpen && <SuccessModal text={Settings.translations.order_success} onClose={() => window.routerHistory.push(ROUTES.HOME)} />}
      </section>
    );
  }
};

export default Checkout;