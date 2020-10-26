import { IUserAddressModifyRequestModel } from 'platform/api/userAddress/models/request';

export function validateForm(this: IUserAddressModifyRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    name: false,
    address: false,
  };

  if (submited && !this.name) {
    errors.name = true;
    valid = false;
  }

  if (submited && (!this.addressText || !this.addressLat || !this.addressLng)) {
    errors.address = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}