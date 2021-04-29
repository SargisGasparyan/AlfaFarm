import * as React from 'react';

import Settings from '../../../../../../../platform/services/settings';

import './style.scss';
import { IClinicRegistrationListResponseModel } from '../../../../../../../platform/api/clinicRegistration/models/response';
import { formatDate, formatPrice, getViewEnum } from '../../../../../../../platform/services/helper';
import { statusColorClassNames } from '../../../orders/constants';
import { OrderStatusEnum } from '../../../../../../../platform/api/order/constants/enums';

interface IProps {
  data: IClinicRegistrationListResponseModel[];
  cancel(id: number): void;
};

const List = React.memo(({ data, cancel }: IProps) => {
  const statusViewEnum = getViewEnum(OrderStatusEnum);

    return (<>
      {data && data.map((item: IClinicRegistrationListResponseModel, index: number) =>
        <div className="P-list-item-appointment  G-mb-40" key={index}>
          <span className="P-appointment-cancel" onClick={() => cancel(item.id)}>{Settings.translations.cancel}</span>
          <p className="G-flex G-flex-justify-between G-mb-10">
            <span className="G-text-bold P-info-title">
              {Settings.translations.service}
            </span>
            <span className="G-text-right">
              {item.serviceName}
            </span>
          </p>
          <p className="G-flex G-flex-justify-between G-mb-10">
            <span className="G-text-bold P-info-title">
              {Settings.translations.doctor}
            </span>
            <span className="G-text-right">
              {item.doctorName || ' - '}
            </span>
          </p>
          <p className="G-flex G-flex-justify-between G-mb-10">
            <span className="G-text-bold P-info-title">
              {Settings.translations.price}
            </span>
            <span className="G-text-right">
              {formatPrice(item.servicePrice)}
            </span>
          </p>
          <p className="G-flex G-flex-justify-between">
            <span className="G-text-bold G-clr-gray P-info-title">
              {formatDate(item.startDate)}
            </span>
            <span className={statusColorClassNames[item.status] + ' G-text-right'}>
              {Settings.translations[statusViewEnum[item.status]]}
            </span>
          </p>
        </div>)}

    </>);
  }
);

export default List;
