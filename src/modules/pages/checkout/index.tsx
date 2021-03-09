import * as React from 'react';
import * as DateTime from 'react-datetime';
import { Moment } from 'moment';
import CheckBox from 'rc-checkbox';
import { Link } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import { countryCode } from 'platform/constants';
import { OrderDeliveryTimeTypeEnum, OrderDeliveryTypeEnum } from 'platform/api/order/constants/enums';
import Select from 'components/select';
import { OrderDeliveryTimeTypeDropdown, OrderDeliveryTypeDropdown } from 'platform/constants/dropdowns';
import { IOrderCreateRequestModel } from 'platform/api/order/models/request';
import Storage from 'platform/services/storage';
import { IDropdownOption, IYandexPlace } from 'platform/constants/interfaces';
import { validateForm } from './services/helper';
import { formatDate, formatPrice } from 'platform/services/helper';
import ChooseAddress from './components/choose-address';
import { IUserAddressListResponseModel } from 'platform/api/userAddress/models/response';
import OrderController from 'platform/api/order';
import SuccessModal from 'components/success-modal';
import { PaymentTypeEnum } from 'platform/constants/enums';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import PaymentMethod from './components/payment';
import { IBonusCardDetailsWithHistoryResponseModel } from 'platform/api/bonusCard/models/response';
import BonusCardController from 'platform/api/bonusCard';
import NumberInput from 'components/number-input';
import { IOrderResultResponseModel } from 'platform/api/order/models/response';
import Connection from 'platform/services/connection';
import ChoosePharmacy from './components/choose-pharmacy';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';
import YandexAutocomplete from 'components/yandex-autocomplete';
import UserAddressController from 'platform/api/userAddress';
import { Shared } from 'modules';

import './style.scss';


interface IState {
  bonusDetails?: IBonusCardDetailsWithHistoryResponseModel;
  resultInfo?: IOrderResultResponseModel;
  form: IOrderCreateRequestModel;
  dateType: OrderDeliveryTimeTypeEnum;
  submited: boolean;
  submitLoading: boolean;
  choosePharmacyOpen: boolean;
  chooseAddressOpen: boolean;
  authModalOpen: boolean;
  successModalOpen: boolean;
  chosenBranch?: IPharmacyBranchListResponseModel;
  addressList: IUserAddressListResponseModel[];
  initialTotalDiscountedPrice: number;
  isUsingBonus: boolean;
  isPayment: boolean;
  idramAmount: number | null;
  idramNId: number | null;
};

@byRoute(ROUTES.CHECKOUT)
class Checkout extends HelperComponent<{}, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    choosePharmacyOpen: false,
    chooseAddressOpen: false,
    successModalOpen: false,
    authModalOpen: false,
    isUsingBonus: false,
    addressList: [],
    initialTotalDiscountedPrice: 0,
    dateType: OrderDeliveryTimeTypeEnum.Asap,
    form: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      deliveryType: OrderDeliveryTypeEnum.Delivery,
      paymentType: PaymentTypeEnum.Cash,
    },
    isPayment: false,
    idramAmount: null,
    idramNId: null
  };

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
      this.getBonusDetails();
      this.getResultInfo();
      this.fetchAddressesList();
      this.safeSetState({ form });
    }
  }

  private getTotalPrice = () => {
    const query = new URLSearchParams(window.location.search);
    const price = query.get('total');
    this.safeSetState({ idramAmount: price });
  }

  private getBonusDetails = async () => {
    const result = await BonusCardController.GetDetailsWithHistory({
      pageNumber: 1,
      pageSize: 1,
    });

    this.safeSetState({ bonusDetails: result.data });
  }

  private getResultInfo = async (bonus = 0) => {
    const { form, initialTotalDiscountedPrice } = this.state;
    const result = await OrderController.GetResult({
      usingBonus: bonus,
      deliveryType: form.deliveryType,
    });

    result.data && this.safeSetState({
      resultInfo: result.data,
      initialTotalDiscountedPrice: initialTotalDiscountedPrice || result.data.totalDiscountedPrice,
    });
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private bonusChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.usedBonus = +e.currentTarget.value;

    Connection.AbortAll();
    this.safeSetState({ form }, () => this.getResultInfo(form.usedBonus));
  }

  
  private fetchAddressesList = async () => {
    const result = await UserAddressController.GetList();
    result.data.length && this.safeSetState({ addressList: result.data }, this.checkForDefaultAddress);
  }

  private checkForDefaultAddress = () => {
    const { form, addressList } = this.state;
    const defaultAddress = addressList.find(item => item.isDefault === true);

    if (defaultAddress) {
      form.addressText = defaultAddress.addressText;
      form.addressLat = defaultAddress.addressLat;
      form.addressLng = defaultAddress.addressLng;
      form.addressBuilding = defaultAddress.building;
      form.addressEntrance = defaultAddress.entrance;
      form.addressApartment = defaultAddress.apartment;
      form.addressFloor = defaultAddress.floor;
      this.safeSetState({ form });
    }
  }

  private addressChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form.addressText = e.currentTarget.value;
    form.addressLat = 0;
    form.addressLng = 0;
    this.safeSetState({ form })
  }

  private addressSelect = (place: IYandexPlace) => {
    const { form } = this.state;
    delete form.userAddressId;
    form.addressText = place.name;
    form.addressLat = place.position[0];
    form.addressLng = place.position[1];
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

  private openPharmacyChoose = () => this.safeSetState({ choosePharmacyOpen: true });

  private closeAddressChoose = (chosen?: IUserAddressListResponseModel) => {
    const { form } = this.state;

    if (chosen) {
      form.userAddressId = chosen.id;
      form.addressApartment = chosen.apartment;
      form.addressBuilding = chosen.building;
      form.addressEntrance = chosen.entrance;
      form.addressFloor = chosen.floor;
      form.addressText = chosen.addressText;
      form.addressLat = chosen.addressLat;
      form.addressLng = chosen.addressLng;
      this.safeSetState({ form, chooseAddressOpen: false });
    } else this.safeSetState({ chooseAddressOpen: false });
  }

  private clearAddress = () => {
    const { form } = this.state;
    form.branchId = undefined;
    form.userAddressId = undefined;
    form.addressApartment = '';
    form.addressBuilding = '';
    form.addressEntrance = '';
    form.addressFloor = '';
    form.addressText = '';
    form.addressLat = 0;
    form.addressLng = 0;
    this.safeSetState({ form, chosenBranch: null });
  }

  private choosePharmacy = (pharmacy: IPharmacyBranchListResponseModel) => {
    if (pharmacy) {
      const { form } = this.state;
      form.branchId = pharmacy.id;
      form.addressText = pharmacy.addressText;
      form.addressLat = pharmacy.addressLat;
      form.addressLng = pharmacy.addressLng;
      this.safeSetState({ form, chosenBranch: pharmacy, choosePharmacyOpen: false });
    } else this.safeSetState({ choosePharmacyOpen: false });
  }

  private changeDeliveryType = (chosen: IDropdownOption<OrderDeliveryTypeEnum>) => {
    const { form } = this.state;
    form.deliveryType = chosen.value;
    this.safeSetState({ form }, this.clearAddress);
  }

  private changeDeliveryTimeType = (chosen: IDropdownOption<OrderDeliveryTimeTypeEnum>) => {
    const { form } = this.state;
    if (chosen.value === OrderDeliveryTimeTypeEnum.Asap) form.deliveryDateFrom = undefined;
    this.safeSetState({ dateType: chosen.value, form });
  }

  private validateDeliveryDate = (dateItem: moment.Moment) => {
    const currentDayStarting = new Date();

    dateItem.hours(currentDayStarting.getHours());
    dateItem.minutes(currentDayStarting.getMinutes());
    dateItem.seconds(currentDayStarting.getSeconds());
    dateItem.milliseconds(currentDayStarting.getMilliseconds());

    return dateItem.isSameOrAfter(currentDayStarting);
  }

  private toggleUsingBonus = async () => {
    const { isUsingBonus, form } = this.state;
    
    if (isUsingBonus) {
      form.usedBonus = 0;
      Connection.AbortAll();
      this.safeSetState({ form }, () => this.getResultInfo(form.usedBonus));
    }

    this.safeSetState({ isUsingBonus: !isUsingBonus });
  }

  private finishCheckout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { form } = this.state;
    const query = new URLSearchParams(window.location.search);
    const card = query.get('card');
    form.paymentType = Number(query.get('paymentType'));
    form.creditCardId = card ? Number(card) : undefined;
    this.safeSetState({ submitLoading: true, form }, async () => {
      const result = await OrderController.Create(form);
      if (result.success) {
        const finishState: Partial<IState> = { submitLoading: false };
    
        if (form.paymentType === PaymentTypeEnum.Idram) document.getElementById('currentId')?.click();
        if (form.paymentType === PaymentTypeEnum.IPay && result.data.vposUrl) window.open(result.data.vposUrl, '_top');
        else finishState.successModalOpen = true;

        this.safeSetState(finishState, () => window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate)));
      } else this.safeSetState({ submitLoading: false });
    });
  }

  private toggleAuthModal = () => {
    const { authModalOpen } = this.state;
    this.safeSetState({ successModalOpen: false, authModalOpen: !authModalOpen });
  }

  private navigateToHome = () => window.routerHistory.push(ROUTES.HOME);

  public render() {
    const {
      form,
      dateType,
      addressList,
      submitLoading,
      resultInfo,
      bonusDetails,
      chosenBranch,
      choosePharmacyOpen,
      chooseAddressOpen,
      authModalOpen,
      successModalOpen,
      initialTotalDiscountedPrice,
      isUsingBonus,
      isPayment,
    } = this.state;

    return (
      <section className="G-page P-checkout-page">
        <h1 className="G-page-title">{!isPayment ? Settings.translations.fill_your_information : Settings.translations.payment_method}</h1>
        {!isPayment ? <form className="G-main-form P-checkout-form">
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
                value={form.email || ''}
                className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.email}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field G-main-form-field-closer">
              <YandexAutocomplete
                suggestDisabled={chooseAddressOpen || choosePharmacyOpen}
                placeholder={Settings.translations.address}
                value={form.addressText || ''}
                className={`G-main-input ${this.formValidation.errors.address ? 'G-invalid-field' : ''}`}
                onChange={this.addressChange}
                onPlaceSelect={this.addressSelect}
              />
            </div>
            <div className="G-main-form-field G-main-form-field-closer">
              <input
                name="addressBuilding"
                value={form.addressBuilding || ''}
                className="G-main-input"
                placeholder={Settings.translations.building}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field G-main-form-field-closer">
              <input
                name="addressEntrance"
                value={form.addressEntrance || ''}
                className="G-main-input"
                placeholder={Settings.translations.entrance}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field G-main-form-field-closer">
              <input
                name="addressApartment"
                value={form.addressApartment || ''}
                className="G-main-input"
                placeholder={Settings.translations.apartment}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field G-main-form-field-closer">
              <input
                name="addressFloor"
                value={form.addressFloor || ''}
                className="G-main-input"
                placeholder={Settings.translations.floor}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="P-delivery-form G-half-width">
            <div className="G-main-form-field G-phone-input-wrapper P-checkout-select">
              <Select<OrderDeliveryTypeEnum>
                options={OrderDeliveryTypeDropdown()}
                className="G-main-select P-checkout-select-item"
                value={form.deliveryType}
                onChange={this.changeDeliveryType}
              />
            </div>

            <div className="G-main-form-field G-phone-input-wrapper P-checkout-select">
              <Select<OrderDeliveryTimeTypeEnum>
                options={OrderDeliveryTimeTypeDropdown()}
                className="G-main-select P-checkout-select-item"
                value={dateType}
                onChange={this.changeDeliveryTimeType}
              />
            </div>

            {dateType === OrderDeliveryTimeTypeEnum.Date && <div className="P-delivery-date G-flex G-align-center">
              <div className="G-main-form-half-field">
                <DateTime
                  onChange={this.dateFromChange}
                  isValidDate={this.validateDeliveryDate}
                  inputProps={{
                    value: form.deliveryDateFrom ? formatDate(form.deliveryDateFrom, true) : '',
                    readOnly: true,
                    className: `G-main-input ${this.formValidation.errors.deliveryDateFrom ? 'G-invalid-field' : ''}`,
                    placeholder: Settings.translations.choose_date,
                  }}
                />
              </div>
            </div>}

            {form.deliveryType === OrderDeliveryTypeEnum.Pickup && <div className="G-main-form-field">
              <input
                value={chosenBranch ? chosenBranch.name : ''}
                readOnly={true}
                className={`G-main-input G-cursor-pointer ${this.formValidation.errors.branchId ? 'G-invalid-field' : ''}`}
                placeholder={Settings.translations.choose_pharmacy}
                onClick={this.openPharmacyChoose}
              />
            </div>}

            <div className="G-main-form-field P-comment-field">
              <textarea
                name="comment"
                value={form.comment || ''}
                className="G-main-input"
                placeholder={Settings.translations.comment}
                onChange={this.changeField}
              />
            </div>

            {bonusDetails &&
              !!initialTotalDiscountedPrice &&
              !!bonusDetails.bonusCardDetails.amount && <div className="G-main-form-field G-flex G-flex-wrap">
                <CheckBox checked={isUsingBonus} onClick={this.toggleUsingBonus} />
                {Settings.translations.use_bonus_points}
                {isUsingBonus && <>
                  <span className="G-ml-auto G-text-bold G-clr-orange">{bonusDetails.bonusCardDetails.amount}</span>
                  <NumberInput
                    max={Math.min(initialTotalDiscountedPrice, bonusDetails.bonusCardDetails.amount)}
                    value={form.usedBonus || ''}
                    className="G-main-input G-full-width G-mt-20"
                    placeholder={Settings.translations.bonus}
                    onChange={this.bonusChange}
                  />
                </>}
              </div>}

            {resultInfo && <>
              <h3 className="G-mt-auto G-flex G-flex-justify-between">{Settings.translations.price} <span>{formatPrice(resultInfo.totalDiscountedPrice)}</span></h3>
              <h3 className="G-mt-10 G-flex G-flex-justify-between">{Settings.translations.bonus} <span>{resultInfo.receivedBonus}</span></h3>
              {!!form.usedBonus && <h3 className="G-mt-10 G-flex G-flex-justify-between">{Settings.translations.used_bonus} <span>{form.usedBonus}</span></h3>}
              <h3 className="G-mt-10 G-flex G-flex-justify-between">{Settings.translations.delivery_fee} <span>{formatPrice(resultInfo.deliveryFee)}</span></h3>
              <h2 className="G-mt-10 G-mb-20 G-flex G-flex-justify-between">{Settings.translations.total} <span className="G-clr-orange">{formatPrice(resultInfo.totalPrice)}</span></h2>
            </>}
          </div>

          <div className="G-flex G-flex-column P-checkout-btn">
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
            {chooseAddressOpen && <ChooseAddress data={addressList} onClose={this.closeAddressChoose} />}
          </div>
        </form> : <PaymentMethod resultInfo={resultInfo} callback={(e: React.SyntheticEvent) => this.finishCheckout(e)} />}

        {successModalOpen && <SuccessModal onClose={this.navigateToHome}>
          {Settings.guest ? <>
            <h3>{Settings.translations.guest_order_success}</h3>
            <button className="G-main-button G-normal-link G-mt-30 P-register-button" onClick={this.toggleAuthModal}>{Settings.translations.sign_up}</button>
          </>: <>
            <h3>{Settings.translations.order_success}</h3>
            <Link className="G-main-button G-normal-link G-mt-30" to={ROUTES.PROFILE.ORDERS.MAIN}>{Settings.translations.order_history}</Link>
          </>}
        </SuccessModal>}

        {authModalOpen && <Shared.Auth onClose={this.toggleAuthModal} />}

        {choosePharmacyOpen && <ChoosePharmacy onClose={this.choosePharmacy} />}

        <form action="https://money.idram.am/payment.aspx" method="POST" target="blank">
          <input type="hidden" name="EDP_LANGUAGE" value="EN" />
          <input type="hidden" name="EDP_REC_ACCOUNT" value="110000601" />
          <input type="hidden" name="EDP_DESCRIPTION" value="Order description" />
          <input type="hidden" name="EDP_AMOUNT" value={this.state.idramAmount || ''} />
          <input type="hidden" name="EDP_BILL_NO" value={this.state.idramNId || ''} />
          <input type="submit" value="submit" id="currentId" className="G-dn" />
        </form>

      </section>
    );
  }
};

export default Checkout;
