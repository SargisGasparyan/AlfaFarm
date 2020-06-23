import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';
import CheckBox from 'rc-checkbox';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import AddressController, { IAddressRequestModel } from 'platform/api/address';
import { countryCode, googlePlacesTypes, googlePlacesRestrictions } from 'platform/constants';
import { isValidNonCityPhone } from 'platform/services/validator';
import LoaderContent from 'components/loader-content';
import NumberInput from 'components/number-input';
import { IGooglePlace } from 'platform/constants/interfaces';
import { preventFieldSubmit } from 'platform/services/helper';
import Storage from 'platform/services/storage';

import CompanyController from 'platform/api/company';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  id?: string | null;
  guest?: boolean;
  form?: IAddressRequestModel | null;
  companyId?: string;
  onClose(updateData?: boolean | string | IAddressRequestModel, form?: IAddressRequestModel): void;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: IAddressRequestModel;
};

class ModifyModal extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      address: '',
      lat: 0,
      lng: 0,
      contactName: '',
      contactPhoneNumber: '',
      isDefault: false,
    },
  };

  public async componentDidMount() {
    const { id, form } = this.props;

    if (id) this.safeSetState({ submitLoading: true }, this.fillForm);
    else if (form) this.safeSetState({ form });
  }

  private fillForm = async () => {
    const { id } = this.props;
    if (id) {
      const result = await AddressController.Details(id);
      if (!result.success) this.props.onClose();
      else {
        const { address, lat, lng, contactName, contactPhoneNumber, house, apartment, isUserDefaultAddress } = result.data;
  
        this.safeSetState({
          form: {
            id,
            address,
            lat,
            lng,
            contactName,
            contactPhoneNumber: contactPhoneNumber.replace(countryCode, ''),
            house,
            apartment,
            isDefault: isUserDefaultAddress,
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

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (!submited) this.safeSetState({ submited: true }, this.checkForSend);
    else this.checkForSend();
  }

  private checkForSend = () => {
    const form = { ...this.state.form };
    for (const key in form) !form[key] && delete form[key];
    form.contactPhoneNumber = `${countryCode}${form.contactPhoneNumber}`;
    if (
      isValidNonCityPhone(form.contactPhoneNumber) && form.contactName &&
      form.address && (form.lat || form.lat === 0) && (form.lng || form.lng === 0)
    ) {
      const { Add } = AddressController;

      if (Storage.profile) this.safeSetState({ submitLoading: true }, () => this.authorizedSave(form));
      else this.safeSetState({ submitLoading: true }, async () => {
        const result = await Add(form);
        if (result.success) this.props.onClose(result.data, this.state.form);
        else this.safeSetState({ submitLoading: false });
      });
    }
  }

  private authorizedSave = async (form: IAddressRequestModel) => {
    const { id, companyId, onClose } = this.props;
    const { Add, Edit } = AddressController;
    const { AddDelivery } = CompanyController;

    if (!companyId) {
      const result = id ? await Edit(form) : await Add(form);
      if (result.success) onClose(result.data);
      else this.safeSetState({ submitLoading: false });  
    } else {
      form.id = companyId;
      const result = await AddDelivery(form);
      if (result.success) onClose(result.data);
      else this.safeSetState({ submitLoading: false});
    }
  }

  private closeModal = () => this.props.onClose();
  private changeDefault = () => {
    const { form } = this.state;
    form.isDefault = !form.isDefault;
    this.safeSetState({ form });
  }

  private changeAddress = (place: IGooglePlace) => {
    const { form } = this.state;
    const element = document.getElementById('google-autocomplete') as HTMLInputElement;
    if (element && place.geometry) {
      form.address = element.value;
      form.lat = place.geometry.location.lat();
      form.lng = place.geometry.location.lng();
      this.safeSetState({ form });    
    }
  }

  private changeAddressString = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.address = e.currentTarget.value;
    form.lat = undefined;
    form.lng = undefined;
    this.safeSetState({ form });
  }

  public render() {
    const { id, companyId } = this.props;
    const { submited, submitLoading, form } = this.state;

    return (
      <Modal onClose={this.closeModal} className="P-address-modify-modal">
        <h2>{id ? Settings.translations.edit_address : Settings.translations.add_address}</h2>
        <form className="G-fields-form">
          <div className="G-field-wrap">
            <h4>{Settings.translations.address}</h4>
            <div className={`G-field ${submited && !(form.lat && form.lat !== 0) ? 'G-invalid-field' : ''}`}>
              <Autocomplete
                id="google-autocomplete"
                onPlaceSelected={this.changeAddress}
                placeholder=""
                value={form.address}
                types={googlePlacesTypes}
                onChange={this.changeAddressString}
                onKeyPress={preventFieldSubmit}
                componentRestrictions={googlePlacesRestrictions}
              />
            </div>
          </div>
          <div className="G-field-wrap">
            <h4>{Settings.translations.name}</h4>
            <div className={`G-field ${submited && !form.contactName ? 'G-invalid-field' : ''}`}>
              <input
                name="contactName"
                value={form.contactName}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="G-half-field-wrap">
            <h4>{Settings.translations.house}</h4>
            <div className="G-field">
              <NumberInput
                name="house"
                value={form.house}
                onChange={this.changeNumberField}
              />
            </div>
          </div>
          <div className="G-half-field-wrap">
            <h4>{Settings.translations.apartment_office}</h4>
            <div className="G-field">
              <NumberInput
                name="apartment"
                value={form.apartment}
                onChange={this.changeNumberField}
              />
            </div>
          </div>
          <div className="G-field-wrap">
            <h4>{Settings.translations.phone_number}</h4>
            <div className={`G-field ${submited && !isValidNonCityPhone(`${countryCode}${form.contactPhoneNumber}`) ? 'G-invalid-field' : ''}`}>
              <p>+{countryCode}</p>
              <input
                name="contactPhoneNumber"
                value={form.contactPhoneNumber}
                pattern="([0-9]{1,8})"
                onChange={this.changeField}
              />
            </div>
          </div>
          {!!Storage.profile && !companyId && <label className="G-form-checkbox">
            <CheckBox checked={form.isDefault} onChange={this.changeDefault} />
            <h3>{Settings.translations.default_address}</h3>
          </label>}
          <LoaderContent
            loading={submitLoading}
            className="G-form-button"
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