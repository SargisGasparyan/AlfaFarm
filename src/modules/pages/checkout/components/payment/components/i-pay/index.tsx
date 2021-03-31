import * as React from 'react';
import PaymentController from 'platform/api/payment';
import { IUserCardListModel } from 'platform/api/payment/models/response';
import Radio from 'components/radio';
import Settings from 'platform/services/settings';

import './index.scss';

const IPay = React.memo(() => {
  const [list, setList] = React.useState<IUserCardListModel[]>();
  const [card, setCard] = React.useState<number>();

  const apply = (id?: number) => {
    const query = new URLSearchParams(window.location.search);
    id ? query.set('card', id.toString()) : query.delete('card');
    window.routerHistory.push(`${window.location.pathname}?${query.toString()}`);
  }

  const choose = (id?: number) => { setCard(id); apply(id); };

  const createCard = async () => {
    const res = await PaymentController.registerCard(true);
    if (res && res.success) {
      window.location.href = res.data.formUrl;
    }
  }

  React.useEffect(() => {
    PaymentController.getUserCards().then(result => {
      setList(result.data);
      if (!!result.data.length) {
        setCard(result.data[0].id);
        apply(result.data[0].id);
      }
    });
  }, []);

  return <>
    <div className="P-online-pay-icons" ><div className="P-arca" /><div className="P-visa" /><div className="P-master" /></div>
    <div className="G-flex G-flex-column">
      {list && list.map((item, index) => <Radio<number> callback={(value: number) => choose(value)} value={item.id} isChecked={card === item.id} key={index}>
        {item.pan}
      </Radio>)}
      {/* <Radio<number | null> callback={() => choose()} value={card || null} isChecked={card == null}>
        {Settings.translations.pay_with_credit_card}
      </Radio> */}
      <a className="P-ipay-button G-mt-20" onClick={createCard}>{Settings.translations.add_credit_card}</a>
    </div>
  </>
});
export default IPay;
