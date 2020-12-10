import * as React from 'react';
import * as DateTime from 'react-datetime';
import { Moment } from 'moment';
import Autocomplete from 'react-google-autocomplete';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import { countryCode, currency } from 'platform/constants';
import { OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import Select from 'components/select';
import { OrderDeliveryTypeDropdown } from 'platform/constants/dropdowns';
import { IOrderModifyRequestModel } from 'platform/api/order/models/request';
import Storage from 'platform/services/storage';
import PlaceController from 'platform/api/place';
import { IDropdownOption, IGooglePlace } from 'platform/constants/interfaces';
import { validateForm } from './services/helper';

import { formatDate, formatPrice } from 'platform/services/helper';
import ChooseAddress from './components/choose-address';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import OrderController from 'platform/api/order';
import SuccessModal from 'components/success-modal';

import './style.scss';
import Radio from 'components/radio';
import { PaymentType } from 'platform/constants/enums';
import PaymentController from 'platform/api/payment';

import arca from 'assets/images/Arca.png';
import master from 'assets/images/master.png';
import visa from 'assets/images/visaImage.svg';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
interface IState {
  form: IOrderModifyRequestModel;
  submited: boolean;
  submitLoading: boolean;
  chooseAddressOpen: boolean;
  successModalOpen: boolean;
  isPayment: boolean;
};

@byRoute(ROUTES.CHECKOUT)
class Checkout extends HelperComponent<{}, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    chooseAddressOpen: false,
    successModalOpen: false,
    form: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      deliveryType: OrderDeliveryTypeEnum.Delivery,
      paymentType: PaymentType.Cash
    },
    isPayment: false,
  };

  private total: number | null;

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  public componentDidMount() {
    if (Storage.profile) {
      const { form } = this.state;
      form.firstName = Storage.profile.firstName;
      form.lastName = Storage.profile.lastName;
      form.phoneNumber = Storage.profile.phoneNumber.substring(`+${countryCode}`.length);
      form.email = Storage.profile.email;
      this.getTotalPrice(); 
      this.safeSetState({ form });
    }
  }
  
  private getTotalPrice = () => {
    const query = new URLSearchParams(window.location.search);
    const price = query.get('total');
    if (price)  this.total = +price;
  }

  private changeField = (e: React.SyntheticEvent<any>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
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

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, () => {
      this.formValidation.valid && this.safeSetState({ isPayment: true });
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
      form.addressApartment = chosen.apartment;
      form.addressBuilding = chosen.building;
      form.addressEntrance = chosen.entrance;
      form.addressFloor = chosen.floor;
      form.addressComment = chosen.comment;
      form.addressText = chosen.addressText;
      form.addressLat = chosen.addressLat;
      form.addressLng = chosen.addressLng;
      this.safeSetState({ form, chooseAddressOpen: false });
    } else this.safeSetState({ chooseAddressOpen: false });
  }

  private changeDeliveryType = (chosen: IDropdownOption<OrderDeliveryTypeEnum>) => {
    const { form } = this.state;
    form.deliveryType = chosen.value;
    this.safeSetState({ form });
  }

  private validateDeliveryDate = (dateItem: moment.Moment) => {
    const currentDayStarting = new Date();

    dateItem.hours(currentDayStarting.getHours());
    dateItem.minutes(currentDayStarting.getMinutes());
    dateItem.seconds(currentDayStarting.getSeconds());
    dateItem.milliseconds(currentDayStarting.getMilliseconds());

    return dateItem.isSameOrAfter(currentDayStarting);
  }

  private choosePaymentType = async (type: PaymentType) => {
    const { form } = this.state;
    if (type === PaymentType.IPay) {
      const res = await PaymentController.getUserCards();
      if (res && res.success) {
        console.log(res);
      }
    }
    form.paymentType = type;
    this.safeSetState({ form });
  }

  private finishCheckout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { form } = this.state;
    form.paymentType = PaymentType.Cash;
    this.safeSetState({ submitLoading: true, form }, async () => {
      const result = await OrderController.Create(form);
      if (result.success) {
        // if (form.paymentType === PaymentType.IPay) {
        //   const onlinePayRes = await PaymentController.registerCard();
        //   if (onlinePayRes.success) {

        //   }
        // }
        this.safeSetState({ successModalOpen: true }, () => window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate)));
      }
      else this.safeSetState({ submitLoading: false });
    });
  }

  private navigateToHome = () => window.routerHistory.push(ROUTES.HOME);

  public render() {
    const { form, submitLoading, chooseAddressOpen, successModalOpen, isPayment } = this.state;

    return (
      <section className="G-page P-checkout-page">
        <h1 className="G-page-title">{!isPayment ? Settings.translations.fill_your_information : Settings.translations.payment_method}</h1>
        {!isPayment ? <form className="G-main-form">
          <div className="P-main-info G-half-width">
            <div className="G-main-form-field">
              <input
                name="firstName"
                value={form.firstName || ''}
                className={`G-main-input ${this.formValidation.errors.firstName ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.first_name}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="lastName"
                value={form.lastName || ''}
                className={`G-main-input ${this.formValidation.errors.lastName ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.last_name}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field G-phone-input-wrapper">
              <p className="G-input-country-code">+{countryCode}</p>
              <input
                name="phoneNumber"
                value={form.phoneNumber || ''}
                className={`G-main-input ${this.formValidation.errors.phoneNumber ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.phone_number}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="email"
                value={form.email || '' || ''}
                className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.email}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <Autocomplete
                placeholder={Settings.translations.address}
                value={form.addressText || '' || ''}
                className={`G-main-input ${this.formValidation.errors.address ? 'G-invalid-field' : ''}`}
                onChange={this.addressChange}
                onPlaceSelected={this.addressSelect}
                componentRestrictions={{ country: 'am' }}
                types={[]}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="addressBuilding"
                value={form.addressBuilding || ''}
                className="G-main-input"
                placeholder={Settings.translations.building}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="addressEntrance"
                value={form.addressEntrance || ''}
                className="G-main-input"
                placeholder={Settings.translations.entrance}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="addressApartment"
                value={form.addressApartment || ''}
                className="G-main-input"
                placeholder={Settings.translations.apartment}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="addressFloor"
                value={form.addressFloor || ''}
                className="G-main-input"
                placeholder={Settings.translations.floor}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <input
                name="addressComment"
                value={form.addressComment || ''}
                className="G-main-input"
                placeholder={Settings.translations.address_comment}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="P-delivery-form G-half-width">
            <div className="G-main-form-field G-phone-input-wrapper P-checkout-select">
              <Select<OrderDeliveryTypeEnum>
                options={OrderDeliveryTypeDropdown()}
                className="G-main-select"
                value={form.deliveryType}
                onChange={this.changeDeliveryType}
              />
            </div>

            <div className="P-delivery-date G-flex G-align-center">
              <div className="G-main-form-half-field">
                <DateTime
                  onChange={this.dateFromChange}
                  isValidDate={this.validateDeliveryDate}
                  inputProps={{
                    value: form.deliveryDateFrom ? formatDate(form.deliveryDateFrom, true) : '',
                    readOnly: true,
                    className: `G-main-input ${this.formValidation.errors.deliveryDateFrom ? 'G-invalid-field' : ''}`,
                    placeholder: Settings.translations.delivery_date,
                  }}
                />
              </div>
            </div>

            <div className="G-main-form-field P-comment-field">
              <textarea
                name="comment"
                value={form.comment || ''}
                className="G-main-input"
                placeholder={Settings.translations.comment}
                onChange={this.changeField}
              />
            </div>
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
        </form> : <this.Payment />}

        {successModalOpen && <SuccessModal text={Settings.translations.order_success} onClose={this.navigateToHome} />}
      </section>
    );
  }

  private Payment = () => {
    const { form, submitLoading } = this.state;
    return <div className="P-choose-payment-type-section">
      <div className="P-payment-types">
        <div>
          <Radio<PaymentType> callback={(data: PaymentType) => this.choosePaymentType(data)} value={PaymentType.Cash} isChecked={form.paymentType === PaymentType.Cash}>
            {Settings.translations.cash}
          </Radio>
        </div>
        <div>
          <Radio<PaymentType> callback={(data: PaymentType) => this.choosePaymentType(data)} value={PaymentType.IPay} isChecked={form.paymentType === PaymentType.IPay}>
            <span>{Settings.translations.card}</span>
            <div className="P-online-pay-icons">
              <div style={{ background: `url(${arca}) center/contain no-repeat` }} />
              <div style={{ background: `url(${visa}) center/cover no-repeat` }} />
              <div style={{ background: `url(${master}) center/contain no-repeat` }} />
            </div>
          </Radio>
        </div>
      </div>
      
      {this.total && <p>{Settings.translations.total} {formatPrice(this.total)}</p>}

      <div className="P-choose-payment-buttons">
        <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.finishCheckout}
        >{Settings.translations.pay}</LoaderContent>
      </div>
    </div>
  }
};

export default Checkout;