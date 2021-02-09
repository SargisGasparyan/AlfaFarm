import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { IVacancyListResponseModel } from 'platform/api/vacancy/models/response';
import { IVacancyCareerRequestModel } from 'platform/api/vacancy/models/request';
import { validateForm } from './services/helper';
import VacancyController from 'platform/api/vacancy';
import SuccessModal from 'components/success-modal';
import ROUTES from 'platform/constants/routes';

import './style.scss';

interface IProps {
  data: IVacancyListResponseModel;
};

interface IState {
  form: IVacancyCareerRequestModel;
  successModalOpen: boolean;
  uploadedCV?: File;
  submited: boolean;
  submitLoading: boolean;
};

class Form extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    successModalOpen: false,
    form: {
      vacancyId: 0,
      firstName: '',
      lastName: '',
      email: '',
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private uploadCV = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.currentTarget.files && e.currentTarget.files[0] && this.safeSetState({ uploadedCV: e.currentTarget.files[0] });
  }

  private deleteCV = () => this.safeSetState({ uploadedCV: null });

  private closeSuccessModal = () => window.routerHistory.push(ROUTES.HOME);

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      const { form, uploadedCV } = this.state;
      const { data } = this.props;
      
      form.vacancyId = data.id;

      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const result = await VacancyController.ApplyCareer(form);
        
        if (result.data && uploadedCV) {
          const formData = new FormData();
          formData.append('file', uploadedCV);
          await VacancyController.UploadCV(result.data, formData);
        }

        this.safeSetState({ submitLoading: false, successModalOpen: true });
      });
    });
  }

  public render() {
    const { uploadedCV, submitLoading, successModalOpen } = this.state;

    return (
      <form className="G-main-form P-vacancies-apply-form">
        <div className="G-main-form-field">
          <input
            name="firstName"
            className={`G-main-input ${this.formValidation.errors.firstName ? 'G-invalid-field' : ''}`}
            placeholder={Settings.translations.name}
            onChange={this.changeField}
          />
        </div>

        <div className="G-main-form-field">
          <input
            name="lastName"
            className={`G-main-input ${this.formValidation.errors.lastName ? 'G-invalid-field' : ''}`}
            placeholder={Settings.translations.surname}
            onChange={this.changeField}
          />
        </div>

        <div className="G-main-form-field">
          <input
            name="email"
            className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
            placeholder={Settings.translations.email}
            onChange={this.changeField}
          />
        </div>

        <div className="G-main-form-field P-upload-part">
          <div className="P-upload-button">
            <label className="G-main-button">
              <i className="icon-Group-5543 G-mr-0" />
              {Settings.translations.upload} CV
              <input
                type="file"
                accept="image/*"
                onChange={this.uploadCV}
              />
            </label>
          </div>
          {uploadedCV && <span>
            {uploadedCV.name}
            <i className="icon-Group-5032" onClick={this.deleteCV} />
          </span>}
        </div>

        <LoaderContent loading={submitLoading} onClick={this.submit} className="G-main-button">{Settings.translations.apply}</LoaderContent>
        {successModalOpen && <SuccessModal onClose={this.closeSuccessModal}>
          <h3>{Settings.translations.career_apply_success}</h3>
        </SuccessModal>}
      </form>
    );
  }
}

export default Form;