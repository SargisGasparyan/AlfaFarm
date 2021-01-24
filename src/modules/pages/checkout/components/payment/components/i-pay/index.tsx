import * as React from 'react';
import PaymentController from 'platform/api/payment';
import { IUserCardListModel } from 'platform/api/payment/models/response';
import Radio from 'components/radio';
import { Link } from 'react-router-dom';
import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';
import './index.scss';

const IPay = React.memo(() => {
  const [list, setList] = React.useState<IUserCardListModel[]>();
  const [card, setCard] = React.useState<number>();

  const apply = (id: number | undefined) => {
    if (id) {
      const query = new URLSearchParams(window.location.search);
      query.set('card', id.toString());
      id && window.routerHistory.push(`${window.location.pathname}?${query.toString()}`);
    }
  }

  const choose = (id: number) => { setCard(id); apply(id); };

  React.useEffect(() => {
    PaymentController.getUserCards().then(result => {
      setList(result.data);
      if (!!result.data.length) {
        setCard(result.data[0].id);
        apply( result.data[0].id);
      } 
    });
  }, []);

  return <>
    <div className="P-online-pay-icons" ><div className="P-arca" /><div className="P-visa" /><div className="P-master" /></div>
    <div>
      {list && list.map((item, index) => <Radio<number> callback={(value: number) => choose(value)} value={item.id} isChecked={card === item.id} key={index}>
        {item.pan}
      </Radio>)}
      <Link to={ROUTES.PROFILE.MY_WALLET} className="G-main-button P-ipay-button">{Settings.translations.add}</Link>
    </div>
  </>
});
export default IPay;
