import * as React from 'react';
import LoaderContent from 'components/loader-content';
import Radio from 'components/radio';
import { PaymentType } from 'platform/constants/enums';
import { formatPrice } from 'platform/services/helper';
import Settings from 'platform/services/settings';

import { PaymentTypeItems } from '../../constants';
import IPay from './components/i-pay';
export interface IPaymentMethod {
  callback: (e: React.SyntheticEvent) => void;
}
const PaymentMethod = React.memo(({ callback }: IPaymentMethod) => {
  const [type, setType] = React.useState(PaymentType.Cash);
  const [loading, setLoading] = React.useState(false);

  const total = () => {
    const query = new URLSearchParams(window.location.search);
    const total = query.get('total');
    return Number(total);
  }

  const pay = (e: React.SyntheticEvent) => { setLoading(true); callback(e); };

  const chooseType = (type: PaymentType) => {
    setType(type);
    const query = new URLSearchParams(window.location.search);
    query.set('paymentType', type.toString());
    type && window.routerHistory.push(`${window.location.pathname}?${query.toString()}`);
  }

  const child = (type: PaymentType) => {
    const content = {
      [PaymentType.Cash]: null,
      [PaymentType.IPay]: <IPay />
    };
    return content[type];
  }
  return <div className="P-choose-payment-type-section">
    <div className="P-payment-types">
      {PaymentTypeItems.map((item, index) => <div key={index}>
        <Radio<PaymentType> callback={(type: PaymentType) => chooseType(type)} value={item.type} isChecked={type === item.type}>
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
