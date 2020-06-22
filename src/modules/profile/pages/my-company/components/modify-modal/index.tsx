import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import CompanyController, { ICompanyRequestModel } from 'platform/api/company';
import { countryCode, googlePlacesTypes, googlePlacesRestrictions } from 'platform/constants';
import {  phoneFieldPattern } from 'platform/services/validator';
import LoaderContent from 'components/loader-content';
import NumberInput from 'components/number-input';
import { IGooglePlace } from 'platform/constants/interfaces';
import { preventFieldSubmit } from 'platform/services/helper';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

const initialDeliveryForm = () => ({
  address: '',
  lat: 0,
  lng: 0,
  contactName: '',
  contactPhoneNumber:'',
});

interface IProps {
  id: string | null;
  onClose(updateList?: boolean): void;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: ICompanyRequestModel;
};

class ModifyModal extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      name: '',
      tin: '',
      bilAddress: '',
      bilLat: 0,
      bilLng: 0,
      delAddresses: [initialDeliveryForm()],
    },
  };

  public async componentDidMount() {
    this.props.id && this.safeSetState({ submitLoading: true }, this.fillForm);
  }

  private fillForm = async () => {
    const { id } = this.props;
    if (id) {
      const result = await CompanyController.Details(id);
      if (!result.success) this.props.onClose();
      else {
        const { _id, tin, name, billingAddress, deliveryAddresses } = result.data;
        deliveryAddresses.map((item, index) => {
          const address = deliveryAddresses[index];
          address.contactPhoneNumber = item.contactPhoneNumber.replace(countryCode, '');
        });
        this.safeSetState({
          form: {
            id: _id,
            tin,
            name,
            bilAddress: billingAddress.address,
            bilLat: billingAddress.lat,
            bilLng: billingAddress.lng,
            bilHouse: billingAddress.house,
            bilApartment: billingAddress.apartment,
            delAddresses: deliveryAddresses,
          },
          submitLoading: false,
        });
      }  
    }
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { form } = this.state;
      form[e.currentTarget.name] = e.currentTarget.value;
      this.safeSetState({ form });
    }
  }

  private changeNumberField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value || undefined;
    this.safeSetState({ form });
  }

  private changeDeliveryField = (e: React.SyntheticEvent<HTMLInputElement>, index: number) => {
    if (e.currentTarget.validity.valid) {
      const { form } = this.state;
      form.delAddresses[index][e.currentTarget.name] = e.currentTarget.value;
      this.safeSetState({ form });
    }
  }

  private changeDeliveryNumberField = (e: React.SyntheticEvent<HTMLInputElement>, index: number) => {
    const { form } = this.state;
    form.delAddresses[index][e.currentTarget.name] = e.currentTarget.value || undefined;
    this.safeSetState({ form });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (!submited) this.safeSetState({ submited: true }, this.checkForSend);
    else this.checkForSend();
  }

  private checkForSend = () => {
    const form = { ...this.state.form };
    form.delAddresses = [...form.delAddresses.map(item => ({...item}))];
    for (const key in form) !form[key] && delete form[key];
    form.delAddresses.map(item => {
      for (const key in item) !item[key] && delete item[key];
    });
    form.delAddresses.map((item, index) => {
      form.delAddresses[index].contactPhoneNumber = `${countryCode}${item.contactPhoneNumber}`;
    });

    const delValid = !form.delAddresses.find(item => (
      !item.address || (!item.lat && item.lat !== 0) ||
      !item.contactName || (item.contactPhoneNumber.length < 4)
    ));

    const bilValid = form.bilAddress && (form.bilLat || form.bilLat === 0);

    if (delValid && bilValid && form.name.length > 1 && form.tin.length === 8) {
      this.safeSetState({ submitLoading: true }, async () => {
        const { Add, Edit } = CompanyController;
        const result = this.props.id ? await Edit(form) : await Add(form);
        if (result.success) this.props.onClose(true);
        else this.safeSetState({ submitLoading: false });
      });
    }
  }

  private closeModal = () => this.props.onClose();

  private changeBilAddress = (place: IGooglePlace) => {
    const { form } = this.state;
    const element = document.getElementById('bil-autocomplete') as HTMLInputElement;
    if (element && place.geometry) {
      form.bilAddress = element.value;
      form.bilLat = place.geometry.location.lat();
      form.bilLng = place.geometry.location.lng();
      this.safeSetState({ form });    
    }
  }

  private changeBilAddressString = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.bilAddress = e.currentTarget.value;
    form.bilLat = undefined;
    form.bilLng = undefined;
    this.safeSetState({ form });
  }

  private changeDelAddress = (place: IGooglePlace, index: number) => {
    const { form } = this.state;
    const element = document.getElementById(`del-autocomplete${index}`) as HTMLInputElement;
    if (element && place.geometry) {
      form.delAddresses[index].address = element.value;
      form.delAddresses[index].lat = place.geometry.location.lat();
      form.delAddresses[index].lng = place.geometry.location.lng();
      this.safeSetState({ form });
    }
  }

  private changeDelAddressString = (e: React.SyntheticEvent<HTMLInputElement>, index: number) => {
    const { form } = this.state;
    form.delAddresses[index].address = e.currentTarget.value;
    form.delAddresses[index].lat = undefined;
    form.delAddresses[index].lng = undefined;
    this.safeSetState({ form });
  }

  private addDelivery = () => {
    const { form } = this.state;
    form.delAddresses.push(initialDeliveryForm());
    this.safeSetState({ form });
  }

  public render() {
    const { id } = this.props;
    const { submited, submitLoading, form } = this.state;

    return (
      <Modal onClose={this.closeModal} className="P-company-modify-modal P-modal-static">
        <h2>{id ? Settings.translations.edit_company : Settings.translations.add_company}</h2>
        <form className="P-G-fields-form">
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.name}</h4>
            <div className={`P-G-field ${submited && form.name.length < 2 ? 'P-G-invalid-field' : ''}`}>
              <input
                name="name"
                value={form.name}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.tin}</h4>
            <div className={`P-G-field ${submited && form.tin.length < 8 ? 'P-G-invalid-field' : ''}`}>
              <input
                name="tin"
                pattern={phoneFieldPattern}
                value={form.tin}
                onChange={this.changeField}
              />
            </div>
          </div>
          <span className="P-border-line" />
          <h3>{Settings.translations.billing_address}</h3>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.address}</h4>
            <div className={`P-G-field ${submited && !(form.bilLat && form.bilLat !== 0) ? 'P-G-invalid-field' : ''}`}>
              <Autocomplete
                id="bil-autocomplete"
                onPlaceSelected={this.changeBilAddress}
                placeholder=""
                value={form.bilAddress}
                types={googlePlacesTypes}
                onChange={this.changeBilAddressString}
                onKeyPress={preventFieldSubmit}
                componentRestrictions={googlePlacesRestrictions}
              />
            </div>
          </div>
          <div className="P-G-half-field-wrap">
            <h4>{Settings.translations.house}</h4>
            <div className="P-G-field">
              <NumberInput
                name="bilHouse"
                value={form.bilHouse}
                onChange={this.changeNumberField}
              />
            </div>
          </div>
          <div className="P-G-half-field-wrap">
            <h4>{Settings.translations.apartment_office}</h4>
            <div className="P-G-field">
              <NumberInput
                name="bilApartment"
                value={form.bilApartment}
                onChange={this.changeNumberField}
              />
            </div>
          </div>
          <span className="P-border-line" />
          <h3>{Settings.translations.delivery_address}</h3>
          {form.delAddresses.map((item, index) => <>
            <div className="P-G-field-wrap">
              <h4>{Settings.translations.address}</h4>
              <div className={`P-G-field ${submited && !(item.lat && item.lat !== 0) ? 'P-G-invalid-field' : ''}`}>
                <Autocomplete
                  id={`del-autocomplete${index}`}
                  onPlaceSelected={(place: IGooglePlace) => this.changeDelAddress(place, index)}
                  placeholder=""
                  value={item.address}
                  types={googlePlacesTypes}
                  onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.changeDelAddressString(e, index)}
                  onKeyPress={preventFieldSubmit}
                  componentRestrictions={googlePlacesRestrictions}
                />
              </div>
            </div>
            <div className="P-G-half-field-wrap">
              <h4>{Settings.translations.house}</h4>
              <div className="P-G-field">
                <NumberInput
                  name="house"
                  value={item.house}
                  onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.changeDeliveryNumberField(e, index)}
                />
              </div>
            </div>
            <div className="P-G-half-field-wrap">
              <h4>{Settings.translations.apartment_office}</h4>
              <div className="P-G-field">
                <NumberInput
                  name="apartment"
                  value={item.apartment}
                  onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.changeDeliveryNumberField(e, index)}
                />
              </div>
            </div>
            <div className="P-G-field-wrap">
              <h4>{Settings.translations.contact_person}</h4>
              <div className={`P-G-field ${submited && !item.contactName ? 'P-G-invalid-field' : ''}`}>
                <input
                  name="contactName"
                  value={item.contactName}
                  onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.changeDeliveryField(e, index)}
                />
              </div>
            </div>
            <div className="P-G-field-wrap">
              <h4>{Settings.translations.phone_number}</h4>
              <div className={`P-G-field ${submited && !(item.contactPhoneNumber) ? 'P-G-invalid-field' : ''}`}>
                <p>+{countryCode}</p>
                <input
                  name="contactPhoneNumber"
                  value={item.contactPhoneNumber}
                  pattern={phoneFieldPattern}
                  onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.changeDeliveryField(e, index)}
                />
              </div>
            </div>
          </>)}
          <span className="P-border-line" />
          <h4 className="P-add-other" onClick={this.addDelivery}>{Settings.translations.add_other_address}</h4>
          <LoaderContent
            loading={submitLoading}
            className="P-G-form-button"
            onClick={this.submit}
          >
            {Settings.translations.save}
          </LoaderContent>
        </form>
      </Modal>
    );
  }
};

export default ModifyModal;