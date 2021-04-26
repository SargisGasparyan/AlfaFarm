import * as React from 'react';
import LoaderContent from 'components/loader-content';
import Radio from 'components/radio';
import { PaymentTypeEnum } from 'platform/constants/enums';
import { formatPrice } from 'platform/services/helper';
import Settings from 'platform/services/settings';

import { PaymentTypeEnumItems } from '../../constants';
import IPay from './components/i-pay';
import { IOrderResultResponseModel } from 'platform/api/order/models/response';

export interface IPaymentMethod {
  resultInfo?: IOrderResultResponseModel;
  callback: (e: React.SyntheticEvent) => void;
}

const PaymentMethod = React.memo(({ resultInfo, callback }: IPaymentMethod) => {
  const [type, setType] = React.useState(PaymentTypeEnum.Cash);
  const [loading, setLoading] = React.useState(false);

  const total = () => {
    const query = new URLSearchParams(window.location.search);
    const item = query.get('total');
    return resultInfo ? Number(item) + resultInfo.deliveryFee : Number(item);
  }

  const pay = (e: React.SyntheticEvent) => { setLoading(true); callback(e); };

  const chooseType = (item: PaymentTypeEnum) => {
    setType(item);
    const query = new URLSearchParams(window.location.search);
    query.set('paymentType', item.toString());
    item && window.routerHistory.push(`${window.location.pathname}?${query.toString()}`);
  }

  const child = (item: PaymentTypeEnum) => {
    const content = {
      [PaymentTypeEnum.Cash]: null,
      [PaymentTypeEnum.IPay]: <IPay />
    };
    return content[item];
  }

  return <div className="P-choose-payment-type-section">
    <div className="P-payment-types">
      {PaymentTypeEnumItems().map((item, index) =>
      <div key={index} className={item.class}>
        <Radio<PaymentTypeEnum> callback={(x: PaymentTypeEnum) => chooseType(x)} value={item.type} isChecked={type === item.type}>
           {item.image ? <img src={item.image} alt=""/> : null}
          <span>{item.name}</span>
          {type === item.type && child(item.type)}
        </Radio>
      </div>)}
    </div>
    {!!total() && <p>{Settings.translations.total} {formatPrice(total())}</p>}
    <div className="P-choose-payment-buttons">
      <LoaderContent
        className="G-main-button"
        loading={loading}
        onClick={pay}
      >{Settings.translations.pay}</LoaderContent>
    </div>
  </div>
});

export default PaymentMethod;
