import * as React from 'react';
import { Prompt } from 'react-router-dom';
import CheckBox from 'rc-checkbox';
import scrollIntoView from 'scroll-into-view';

import LoaderContent from 'components/loader-content';
import NumberInput from 'components/number-input';
import Settings from 'platform/services/settings';
import Storage from 'platform/services/storage';
// import ModifyAddressModal from '../../../profile/pages/my-addresses/components/modify-modal';
import AddressController, { IAddress, IAddressRequestModel } from 'platform/api/address';
import PayerInformation from './components/payer-information';
import DatePicker from './components/date-picker';
import OrderController, {
  IOrderRequestModel,
  IOrderCheckoutRequestModel,
  OrderDeliveryTypeEnum,
  OrderPaymentMethodEnum,
  IOrderCheckoutResponseModel,
  IPayer,
} from 'platform/api/order';
import { ICartItem } from 'platform/api/product';
import { formatDate } from 'platform/services/helper';
import CompanyController from 'platform/api/company';
import ROUTES from 'platform/constants/routes';
import { IContactInfoModel } from 'platform/constants/interfaces';
import { IPriceCounterData } from '../../constants/interfaces';
import { maxBonus } from './services/helper';
import { promoCodeFieldPattern } from 'platform/services/validator';
import Connection from 'platform/services/connection';
import HelperComponent from 'platform/classes/helper-component';
import CartManager from '../../services/manager';
import idram from 'assets/images/ic_idram@2x.png';
import './style.scss';

interface IProps {
  priceData: IPriceCounterData;
  onPriceChange(priceData: IPriceCounterData): void;
  fromOrder: boolean;
  queryExists: boolean;
  chosenItemsList: ICartItem[];
  companies: IPayer[];
};

interface IState {
  addresses: IAddress[];
  billingAddress?: string;
  submited: boolean;
  payerAddOpen: boolean;
  addressAddOpen: boolean;
  datePickerOpen: boolean;
  submitLoading: boolean;
  form: IOrderRequestModel;
  guestAddressForm: IAddressRequestModel | null;
  initialData: IOrderCheckoutResponseModel | null;
  idramAmount: number | null;
  idramNId: number | null;
};

class Checkout extends HelperComponent<IProps, IState> {
  private submitForm: React.RefObject<HTMLFormElement> = React.createRef();
  public state: IState = {
    addresses: [],
    payerAddOpen: false,
    addressAddOpen: false,
    datePickerOpen: false,
    billingAddress: '',
    submited: false,
    submitLoading: false,
    guestAddressForm: null,
    initialData: null,
    form: {
      idList: [],
      deliveryMethod: OrderDeliveryTypeEnum.Delivery,
      paymentMethod: OrderPaymentMethodEnum.Cash,
      additional: '',
    },

    idramAmount: null,
    idramNId: null,
  };


  get maxBonus() {
    const { priceData } = this.props;

    return maxBonus(priceData);
  }

  get payerValid() {
    const { form } = this.state;
    return Storage.profile || form.guestPhoneNumber;
  }

  get addressValid() {
    const { form } = this.state;
    return form.deliveryAddressId || form.deliveryMethod === OrderDeliveryTypeEnum.PickUp;
  }

  
  get bonusValid() {
    const { form } = this.state;
    return !form.bonus || form.bonus <= this.maxBonus;
  }

  public componentDidMount() {
    this.fetchData();
    
    Storage.profile && this.fetchAddresses();
  }

  public static getDerivedStateFromProps(props: IProps, state: IState) {
    const { form } = state;
    const { priceData, onPriceChange } = props;

    if (Storage.profile && form.bonus && form.idList !== props.chosenItemsList) {
      const max = maxBonus(props.priceData);
      if (form.bonus > max) {
        form.bonus = max;
        onPriceChange({ ...priceData, points: form.bonus || 0 });
      }
    } else if (form.idList !== props.chosenItemsList) form.idList = [...props.chosenItemsList];

    if (props.chosenItemsList.length && !window.onbeforeunload)
      window.onbeforeunload = () => Settings.translations.are_you_sure;

    return { form: {...form} };
  }

  public componentDidUpdate(prevProps: IProps) {
    const { form } = this.state;
    const chosenChanged = JSON.stringify(form.idList) !== JSON.stringify(prevProps.chosenItemsList);
    if (form.idList.length && chosenChanged) this.fetchData();
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.onbeforeunload = null;
  }

  public fetchData = async () => {
    const { form } = this.state;
    const { priceData, onPriceChange } = this.props;
    const idList = form.idList.map(item => ({
      product: item.product,
      productVersion: item.productVersion,
      count: item.count,
    }));
    const body: IOrderCheckoutRequestModel = { idList };
    
    if (form.bonus) body.bonus = form.bonus;

    const result = await OrderController.Checkout(body);
    if (!result.aborted) {
      if (result.data.deliveryFee !== priceData.delivery) onPriceChange({ ...priceData, delivery: result.data.deliveryFee });
      if (result.data.deliveryAddress) form.deliveryAddressId = result.data.deliveryAddress._id;
      if (result.data.companyId) form.companyId = result.data.companyId;
      this.safeSetState({ form: {...form}, initialData: result.data });
    }
  }

  private fetchAddresses = () => this.safeSetState({ addresses: [] }, async () => {
    const { form } = this.state;
    if (form.companyId) {
      const result = await CompanyController.Delivery(form.companyId);
      !result.aborted && this.safeSetState({ addresses: result.data });
    } else {
      const result = await AddressController.All();
      !result.aborted && this.safeSetState({ addresses: result.data });  
    }
  });

  private fetchDeliveryFee = async () => {
    const { form } = this.state;
    const { priceData, onPriceChange } = this.props;
    
    if (form.deliveryAddressId) {
      const result = await OrderController.Delivery({
        id: form.deliveryAddressId,
        price: priceData.subtotal - priceData.discount,
      });

      if (!result.aborted && result.data !== priceData.delivery) onPriceChange({ ...priceData, delivery: result.data });
    }
  }

  private fetchPromo = async (withoutFee = false) => {
    const { form } = this.state;
    const { priceData, onPriceChange } = this.props;

    if (form.promoCode) {
      const body = {
        email: form.email,
        deliveryType: form.deliveryMethod,
        code: form.promoCode,
        price: priceData.subtotal - priceData.discount,
        addressId: form.deliveryAddressId,
      };
  
      const result = await OrderController.Promo(body);
      if (!result.aborted) {
        if (result.success) {
          if (!withoutFee) priceData.delivery = result.data.deliveryFee;
          onPriceChange({
            ...priceData,
            promoDiscount: result.data.discountAmount,
          });
        } else {
          delete form.promoCode;
          this.safeSetState({ form: {...form} });
        }  
      }
    }
  }

  private openPayerAdd = () => this.safeSetState({ payerAddOpen: true });  
  private closePayerAdd = (data?: IContactInfoModel) => {
    const { form } = this.state;
    
    if (data) {
      form.email = data.email;
      form.guestName = data.firstName;
      form.guestPhoneNumber = data.phoneNumber;
      if (data.code) form.code = data.code;
    }

    this.safeSetState({ payerAddOpen: false, form });
  }

  private openAddressAdd = () => this.safeSetState({ addressAddOpen: true });
  private closeAddressAdd = (id?: string, guestForm?: IAddressRequestModel | null) => {
    if (id) {
      const { form } = this.state;
      form.deliveryAddressId = id;

      if (Storage.profile) this.fetchAddresses();

      this.fetchDeliveryFee();
      this.safeSetState({ form: {...form}, addressAddOpen: false, guestAddressForm: guestForm || null });
    } else this.safeSetState({ addressAddOpen: false });
  }

  private openDatePicker = () => this.safeSetState({ datePickerOpen: true });  
  private closeDatePicker = (value?: string) => {
    const { form } = this.state;
    if (value) form.deliveryDate = value;
    this.safeSetState({ datePickerOpen: false, form });
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form: {...form} });
  }

  private changeDeliveryType = (type: OrderDeliveryTypeEnum) => {
    const { form } = this.state;
    const { priceData, onPriceChange } = this.props;

    if (type === OrderDeliveryTypeEnum.Delivery) this.fetchDeliveryFee();
    else onPriceChange({ ...priceData, delivery: 0 });

    form.deliveryMethod = type;
    this.safeSetState({ form: {...form} });
  }

  private changeDeliveryAddress = (value: string) => {
    const { form } = this.state;
    form.deliveryAddressId = value;
    if (form.promoCode && form.promoCode.length >= 8) this.fetchPromo(true);
    this.fetchDeliveryFee();
    this.safeSetState({ form: {...form} });
  }

  private changePaymentType = (type: OrderPaymentMethodEnum) => {
    const { form } = this.state;
    form.paymentMethod = type;
    this.safeSetState({ form: {...form} });
  }

  private changePayer = (company: IPayer) => {
    const { form, initialData } = this.state;
    const { priceData, onPriceChange } = this.props;

    if (form.companyId ? form.companyId !== company.companyId : company.companyId) {
      if (!company.companyId) {
        delete form.companyId;
        if (initialData && initialData.deliveryAddress) {
          form.deliveryAddressId = initialData.deliveryAddress._id;
          form.deliveryMethod === OrderDeliveryTypeEnum.Delivery && this.fetchDeliveryFee();
        } else {
          delete form.deliveryAddressId;
          onPriceChange({ ...priceData, delivery: 0 });
        }

        this.safeSetState({ form: {...form}, billingAddress: '' }, this.fetchAddresses);
      } else {
        const { billingAddress } = company;
        form.companyId = company.companyId;
        form.deliveryAddressId = company.deliveryAddress._id;
        this.safeSetState({ form: {...form}, billingAddress: billingAddress ? billingAddress.address : '' }, this.fetchAddresses);
        form.deliveryMethod === OrderDeliveryTypeEnum.Delivery && this.fetchDeliveryFee();
      }  
    }
  }

  private changePromo = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const alertify = await import('alertifyjs');
    const { form } = this.state;
    const { priceData, onPriceChange } = this.props;

    if (form.deliveryMethod === OrderDeliveryTypeEnum.Delivery && !form.deliveryAddressId) {
      alertify.dismissAll();
      alertify.error(Settings.translations.checkout_promo_address_error);
      delete form.promoCode;
      this.safeSetState({ form: {...form} });
    } else if (e.currentTarget.validity.valid && e.currentTarget.value) {
      form.promoCode = e.currentTarget.value.toUpperCase();
      this.safeSetState({ form: {...form} });
      
      if (e.currentTarget.value.length === 8) {
        Connection.AbortAll();
        this.fetchPromo();
      }
    } else if (e.currentTarget.validity.valid) {
      delete form.promoCode;
      this.safeSetState({ form: {...form} });
      
      if (priceData.promoDiscount) {
        Connection.AbortAll();
        onPriceChange({ ...priceData, promoDiscount: 0 });
        form.deliveryMethod === OrderDeliveryTypeEnum.Delivery && this.fetchDeliveryFee();
      }
    }
  }

  private changeBonus = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    const { priceData, onPriceChange } = this.props;
    if (e.currentTarget.value) form.bonus = +e.currentTarget.value;
    else delete form.bonus;

    onPriceChange({ ...priceData, points: this.bonusValid ? form.bonus || 0 : 0 });
    this.safeSetState({ form: {...form} }, () => {
      Connection.AbortAll();
      form.deliveryMethod === OrderDeliveryTypeEnum.Delivery && this.fetchDeliveryFee();
      this.fetchPromo();
    });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;

    if (!submited) this.safeSetState({ submited: true }, this.checkForSend);
    else this.checkForSend();
  }

  private checkForSend = async () => {
    const { form }  = this.state;
    const { queryExists, chosenItemsList } = this.props;
    const alertify = await import('alertifyjs');
    const invalidBlocks = document.getElementsByClassName('P-invalid');
    invalidBlocks.length && scrollIntoView(invalidBlocks[0]);

    if (form.deliveryDate && this.payerValid && this.addressValid && this.bonusValid) this.safeSetState({ submitLoading: true }, async () => {

        const result = await OrderController.Create(form);
        if (result.success) {
          if(form.paymentMethod === OrderPaymentMethodEnum.Idram) {
            this.safeSetState({
              idramNId: result.data.nid,
              idramAmount: result.data.total,
            }, () => {
              window.onbeforeunload = null;
              this.submitForm.current && this.submitForm.current.submit();
            })
          }
          // else if(form.paymentMethod === OrderPaymentMethodEnum.BankTransfer) {
          //   window.onbeforeunload = null;
          //   alertify.success(Settings.translations.order_create_success);
          //   !queryExists && CartManager.Remove(chosenItemsList.map(item => item.productVersion || item.product));
          //   window.routerHistory.push(ROUTES.HOME.MAIN);
          // } 
          else if (form.paymentMethod === OrderPaymentMethodEnum.Card && result.data.link) {
            window.onbeforeunload = null;
            window.location.href = result.data.link;
          }
          else {
            Storage.fetchDefault();
            window.onbeforeunload = null;
            alertify.success(Settings.translations.order_create_success);
            !queryExists && CartManager.Remove(chosenItemsList.map(item => item.productVersion || item.product));
            window.routerHistory.push(ROUTES.HOME.MAIN);
          }
        } else this.safeSetState({ submitLoading: false });
     
    });
  }

  public render() {
    const { companies } = this.props;
    const {
      form,
      addresses,
      payerAddOpen,
      // addressAddOpen,
      datePickerOpen,
      billingAddress,
      initialData,
      submited,
      submitLoading,
      guestAddressForm,
    } = this.state;
    return (
      <>
            <form className="G-fields-form P-checkout-form">
        {initialData && <>
          {!submitLoading && <Prompt message={Settings.translations.are_you_sure} />}
          <div className="P-block">
            <h2>{Settings.translations.type}</h2>
            <label className="P-choose-label">
              <CheckBox
                checked={form.deliveryMethod === OrderDeliveryTypeEnum.Delivery}
                className="P-radio"
                onChange={() => this.changeDeliveryType(OrderDeliveryTypeEnum.Delivery)}
              />
              {Settings.translations.delivery}
            </label>
            <label className="P-choose-label">
              <CheckBox
                checked={form.deliveryMethod === OrderDeliveryTypeEnum.PickUp}
                className="P-radio"
                onChange={() => this.changeDeliveryType(OrderDeliveryTypeEnum.PickUp)}
              />
              {Settings.translations.pickup}
            </label>
          </div>
          <div className={`P-block ${submited && !this.payerValid ? 'P-invalid' : ''}`}>
            <h2>{Settings.translations.payer}</h2>
            {Storage.profile ? <>
              {companies.map(item => <label key={item.companyId} className="P-choose-label">
                <CheckBox
                  checked={item.companyId ? form.companyId === item.companyId : !form.companyId}
                  className="P-radio"
                  onChange={() => this.changePayer(item)}
                />
                {item.companyName || Settings.translations.i}
              </label>)}
            </> : <>
              <h3 onClick={this.openPayerAdd} className="P-action-green-label P-action-write-label">{form.guestName ? `${Settings.translations.written} (${form.guestName})` : Settings.translations.write}</h3>
              {payerAddOpen && <PayerInformation value={form} onClose={this.closePayerAdd} />}
            </>}
          </div>
          <div className={`P-block ${submited && !form.deliveryDate ? 'P-invalid' : ''}`}>
            <h2>{form.deliveryMethod === OrderDeliveryTypeEnum.PickUp ? Settings.translations.pickup_date : Settings.translations.delivery_date}</h2>
            <div className="G-field P-date-field">
              <input
                placeholder={Settings.translations.choose}
                onClick={this.openDatePicker}
                value={formatDate(form.deliveryDate)}
                readOnly={true}
              />
            </div>
            {datePickerOpen && <DatePicker value={form.deliveryDate} onClose={this.closeDatePicker} prepareDaysCount={initialData.dayCount} />}
          </div>
          {form.deliveryMethod === OrderDeliveryTypeEnum.Delivery && <div className={`P-block ${submited && !this.addressValid ? 'P-invalid' : ''}`}>
            <h2>{Settings.translations.delivery_address}</h2>
            {Storage.profile ? <>
              {addresses.map(item => <label key={item._id} className="P-choose-label">
                <CheckBox
                  checked={form.deliveryAddressId === item._id}
                  className="P-radio"
                  onChange={() => this.changeDeliveryAddress(item._id)}
                />
                {item.address}
              </label>)}
              <h3 className="P-action-green-label" onClick={this.openAddressAdd}> {Settings.translations.add_new_address}</h3>
            </> : <h3
              onClick={this.openAddressAdd}
              className="P-action-green-label P-action-write-label"
            >
              {guestAddressForm ?
                `${Settings.translations.written} (${guestAddressForm.contactName})` :
                Settings.translations.write}
            </h3>}
            {/* {addressAddOpen && <ModifyAddressModal onClose={this.closeAddressAdd} form={Storage.profile ? null : guestAddressForm} companyId={form.companyId} />} */}
          </div>}
          {billingAddress && <div className="P-block P-billing-address">
            <h2>{Settings.translations.billing_address}</h2>
            <h3><i className="icon-location" /> {billingAddress}</h3>
          </div>}
          <div className="P-block P-pricing G-fields-form">
            <h2>{Settings.translations.pricing}</h2>
            <div className="P-payment-methods">
                <div
                  className={`P-method ${form.paymentMethod === OrderPaymentMethodEnum.Cash ? 'P-chosen' : ''}`}
                  onClick={() => this.changePaymentType(OrderPaymentMethodEnum.Cash)}
                >
                  <i className="icon-dollar" />
                  <h3>{Settings.translations.cash}</h3>
                </div>
                
                <div
                  className={`P-method ${form.paymentMethod === OrderPaymentMethodEnum.Idram ? 'P-chosen' : ''}`}
                  onClick={() => this.changePaymentType(OrderPaymentMethodEnum.Idram)}
                >
                <div className={ form.paymentMethod !== OrderPaymentMethodEnum.Idram ? "idram-opacity-on": "idram-opacity-off"} style={{background: `url('${idram}') center/cover`, width: '93px', height: '95px'}} />
                </div>
               <div
                  className={`P-method ${form.paymentMethod === OrderPaymentMethodEnum.BankTransfer ? 'P-chosen' : ''}`}
                  onClick={() => this.changePaymentType(OrderPaymentMethodEnum.BankTransfer)}
                >
                  <i className="icon-credit_card_02" />
                  <h3 className="P-text">{Settings.translations.bank_transfer}</h3>
                </div>
                 <div
                  className={`P-method ${form.paymentMethod === OrderPaymentMethodEnum.Card ? 'P-chosen' : ''}`}
                  onClick={() => this.changePaymentType(OrderPaymentMethodEnum.Card)}
                >
                  <i className="icon-credit_card" />
                  <h3>{Settings.translations.card}</h3>
                </div>
            </div>
            
            {Storage.profile && <>
              <div className={Storage.profile ? 'G-half-field-wrap' : 'G-field-wrap'}>
                <h4>{Settings.translations.promo_code}</h4>
                <div className={`G-field ${form.promoCode && form.promoCode.length < 8 ? 'G-invalid-field' : ''}`}>
                  <input
                    type="text"
                    value={form.promoCode || ''}
                    pattern={promoCodeFieldPattern}
                    onChange={this.changePromo}
                  />
                </div>
              </div>

              {/* {!!Storage.profile.points && <div className="G-half-field-wrap">
                <h4>{Settings.translations.i_bonus}</h4>
                <div className={`G-field ${!this.bonusValid ? 'G-invalid-field' : ''}`}>
                  <NumberInput
                    int={true}
                    name="bonus"
                    value={form.bonus}
                    onChange={this.changeBonus}
                  />
                </div>
                <p className="G-field-description">{Settings.translations.checkout_i_bonus_can_use(this.maxBonus, Storage.profile.points)}</p>
              </div>} */}
            </>}
          </div>
          <div className="P-block">
            <h2>{Settings.translations.additionally}</h2>
            <div className="G-field G-field-textarea">
              <textarea
                name="additional"
                onChange={this.changeField}
                placeholder={Settings.translations.comment}
              />
            </div>
          </div>
        </>}
        {submitLoading ? null : <LoaderContent
          onClick={this.submit}
          loading={submitLoading}
          className="G-form-button"
        >{Settings.translations.checkout}</LoaderContent>}
      </form>

      <form action="https://money.idram.am/payment.aspx" ref={this.submitForm} method="POST">
        <input type="hidden" name="EDP_LANGUAGE" value="AM" />
        <input type="hidden" name="EDP_REC_ACCOUNT" value="110000055" />
        <input type="hidden" name="EDP_AMOUNT" value={this.state.idramAmount || ''} />
        <input type="hidden" name="EDP_BILL_NO" value={this.state.idramNId || ''} />
      </form>
      </>
    );
  }
};

export default Checkout;
