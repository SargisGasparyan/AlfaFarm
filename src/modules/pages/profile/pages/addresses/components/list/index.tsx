import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from '../../../../../../../platform/services/settings';

import { IUserAddressListResponseModel } from '../../../../../../../platform/api/userAddress/models/response';
import DoneImage from '../../../../../../../assets/images/done.svg';
import ROUTES from '../../../../../../../platform/constants/routes';

import './style.scss';

interface IProps {
  data: IUserAddressListResponseModel[];

  onEditDefault?(id: number): Promise<void>;

  onRemove?(id: number): Promise<void>;
};

const List = React.memo(({ data, onEditDefault, onRemove }: IProps) => {
    const config = {
      name: {
        name: '',
        cell: (row: IUserAddressListResponseModel) => <>
          {row.isDefault && <img className="P-done-icon" src={DoneImage}/>}
          {row.name}
        </>
      },
      address: {
        name: Settings.translations.address,
        cell: (row: IUserAddressListResponseModel) => row.addressText
      },
      default: {
        name: '',
        cell: (row: IUserAddressListResponseModel) => <>
          {row.isDefault && <span className="G-clr-main">{Settings.translations.default}</span>}
          {!row.isDefault && <button
            className="P-make-default"
            onClick={() => onEditDefault && onEditDefault(row.id)}
          >{Settings.translations.make_default}</button>}
        </>
      },
      edit: {
        name: '',
        style: { minWidth: 150, maxWidth: 150 },
        cell: (row: IUserAddressListResponseModel) => <>
          <Link to={ROUTES.PROFILE.ADDRESSES.UPDATE.replace(':id', row.id)}>
            <i
              className="icon-Group-5545 G-back-icon G-clr-main G-mr-40 G-fs-26"
            />
          </Link>

          <i
            className="icon-Group-5032 G-clr-orange G-cursor-pointer G-fs-24"
            onClick={() => onRemove && onRemove(row.id)}
          />
        </>
      }
    };
    console.log(data);

    return (<>
      {data && data.map((item: IUserAddressListResponseModel, index: number) =>
        <div className="P-list-item  G-my-20" key={index}>
          <div className="P-address-action G-flex G-flex-justify-between">
            {item.isDefault && <p>
              <img className="P-done-icon" src={DoneImage}/>
              <span className="G-clr-main"> { Settings.translations.default}
              </span>
            </p>}
            {!item.isDefault && <p>
              <button
                className="P-make-default"
                onClick={() => onEditDefault && onEditDefault(item.id)}
              >{Settings.translations.make_default}</button>
            </p>}
            <div className="G-flex P-edit-del">
              <p className="P-edit">
                <Link to={ROUTES.PROFILE.ADDRESSES.UPDATE.replace(':id', `${item.id}`)}>
                  <i className="icon-Group-5545 G-back-icon G-clr-main G-mr-40 G-fs-22"/>
                </Link>
              </p>
              <p>
                <i className="icon-Group-5032 G-clr-orange G-cursor-pointer G-fs-22"
                   onClick={() => onRemove && onRemove(item.id)}/>
              </p>
            </div>
          </div>

          <hr className="G-my-15" />

          <div className="G-flex G-flex-column P-address-det">
            <p className="G-flex G-flex-justify-between G-mb-10">
              <span>
                {Settings.translations.name}
              </span>
              <span>
                {item.name}
              </span>
            </p>
            <p className="G-flex P-address-name G-flex-justify-between">
              <span>
                {Settings.translations.address}
              </span>
              <span>
                {item.addressText}
              </span>
            </p>
          </div>
        </div>)}

    </>);
  }
);

export default List;
