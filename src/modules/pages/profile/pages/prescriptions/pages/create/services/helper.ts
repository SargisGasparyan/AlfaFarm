import { IPrescriptionModifyRequestModel } from 'platform/api/prescription/models/request';

export function validateForm(this: IPrescriptionModifyRequestModel, submited?: boolean) {
  let valid = true;

  const errors = {
    name: false,
    doctorName: false,
    medicalInstitution: false,
    description: false,
  };

  if (submited && !this.name) {
    errors.name = true;
    valid = false;
  }

  if (submited && !this.description) {
    errors.description = true;
    valid = false;
  }

  if (submited && !this.doctorName) {
    errors.doctorName = true;
    valid = false;
  }

  if (submited && !this.medicalInstitution) {
    errors.medicalInstitution = true;
    valid = false;
  }

  return {
    errors,
    valid,
  };
}