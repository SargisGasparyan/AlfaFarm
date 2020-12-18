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
    const item = query.get('total');
    return Number(item);
  }

  const pay = (e: React.SyntheticEvent) => { setLoading(true); callback(e); };

  const chooseType = (item: PaymentType) => {
    setType(item);
    const query = new URLSearchParams(window.location.search);
    query.set('paymentType', item.toString());
    item && window.routerHistory.push(`${window.location.pathname}?${query.toString()}`);
  }

  const child = (item: PaymentType) => {
    const content = {
      [PaymentType.Cash]: null,
      [PaymentType.IPay]: <IPay />
    };
    return content[item];
  }
  return <div className="P-choose-payment-type-section">
    <div className="P-payment-types">
      {PaymentTypeItems.map((item, index) => <div key={index}>
        <Radio<PaymentType> callback={(x: PaymentType) => chooseType(x)} value={item.type} isChecked={type === item.type}>
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
