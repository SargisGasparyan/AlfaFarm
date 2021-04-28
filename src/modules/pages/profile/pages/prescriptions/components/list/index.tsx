import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from '../../../../../../../platform/services/settings';

import ROUTES from '../../../../../../../platform/constants/routes';

import './style.scss';
import HelperComponent from '../../../../../../../platform/classes/helper-component';
import { IPrescriptionListResponseModel } from '../../../../../../../platform/api/prescription/models/response';
import { formatDate, getViewEnum } from '../../../../../../../platform/services/helper';
import { PrescriptionStatusEnum } from '../../../../../../../platform/api/prescription/constants/enums';
import {statusColorClassNames, statusColorPrescriptionsClassNames} from "../../../orders/constants";

interface IProps {
  data: IPrescriptionListResponseModel[];
};


class List extends HelperComponent<IProps, {}> {

  private statusViewEnum = getViewEnum(PrescriptionStatusEnum);

  public render() {
    const { data } = this.props;
    return (<>
      {data && data.map((item: IPrescriptionListResponseModel, index: number) =>
        <div className="P-list-item  G-my-20" key={index}>
          <div className="P-main-info G-flex G-flex-column">
            <p className="G-flex G-flex-justify-between G-mb-10">
              <span className="G-text-bold">{Settings.translations.date}</span>
              <span>{formatDate(item.createdDate)}</span>
            </p>
            <p className="G-flex G-flex-justify-between G-mb-10">
              <span className="G-text-bold">{Settings.translations.status}</span>
              <span className={statusColorPrescriptionsClassNames[item.status]}>{Settings.translations[this.statusViewEnum[item.status]]}</span>
            </p>
            <p className="G-flex G-flex-justify-between G-mb-10">
              <span className="G-text-bold">{Settings.translations.medical_institution}</span>
              <span>{item.medicalInstitution}</span>
            </p>
            <p className="G-flex G-flex-justify-between G-mb-10">
              <span className="G-text-bold">{Settings.translations.doctor}</span>
              <span>{item.doctorName}</span>
            </p>
            <p className="G-flex G-flex-justify-between G-mb-10">
              <span className="G-text-bold">{Settings.translations.deciphered_prescription}</span>
              <span>{item.name}</span>
            </p>
            <p className="G-flex G-flex-justify-end">
              <span>
                {item.status === PrescriptionStatusEnum.Success && <Link
                  to={ROUTES.PROFILE.PRESCRIPTIONS.DECIPHERED.replace(':id', item.id)}
                  className="P-see-more-label"
                >
                  {Settings.translations.see_more}
                </Link>}
              </span>
            </p>

            {/*</div>*/}
            {/*<hr/>*/}
            {/*<div>*/}
            {/*  <p></p>*/}
            {/*  <p></p>*/}
          </div>
        </div>)}
    </>);
  }

}


export default List;
