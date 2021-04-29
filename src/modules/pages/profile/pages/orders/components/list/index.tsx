import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  IOrderListResponseModel,
  IOrderDetailsResponseModel
} from '../../../../../../../platform/api/order/models/response';
import Settings from '../../../../../../../platform/services/settings';
import { formatDate, formatPrice, getViewEnum } from '../../../../../../../platform/services/helper';
import { statusColorClassNames } from '../../constants';
import { OrderStatusEnum } from '../../../../../../../platform/api/order/constants/enums';

import './style.scss';

interface IProps {
  data: IOrderListResponseModel[];

  redirectUrl?(row: IOrderDetailsResponseModel, index?: number): string;
};

const List = React.memo(({ data, redirectUrl }: IProps) => {
    const statusViewEnum = getViewEnum(OrderStatusEnum);

    return (<>
      {data && data.map((item: IOrderDetailsResponseModel, index: number) =>
        <Link key={index} to={redirectUrl ? redirectUrl(item, index) : ''} className="G-mb-40 P-order-item-box">
          <div className="P-list-item G-flex">
            <div className="P-orders-det">
              <p className="P-order-id G-mb-5">
                {Settings.translations.order_number} - {item.id}
              </p>
              <p className="P-order-price G-mb-10">
                {formatPrice(item.totalPrice)}
              </p>
              <p className="P-order-date">
                 {formatDate(item.createdDate)}
              </p>
              {/*<p className="P-order-date">*/}
              {/*   {Settings.translations.used_bonus} - {item.usedBonus}*/}
              {/*</p>*/}
            </div>

            <div className="P-order-status">
        <span
          className={statusColorClassNames[item.status]}>{Settings.translations[statusViewEnum[item.status]]}</span>
            </div>
          </div>
        </Link>)}

    </>);
  }
);

export default List;
