import * as React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../../components/layout';
import Settings from 'platform/services/settings';
import { byPrivateRoute } from 'platform/decorators/routes';
import { onlyForUsers } from 'platform/guards/routes';
import ROUTES from 'platform/constants/routes';
import LoaderContent from 'components/loader-content';
import { IPrescriptionModifyRequestModel } from 'platform/api/prescription/models/request';
import { validateForm } from './services/helper';
import HelperComponent from 'platform/classes/helper-component';
import PrescriptionController from 'platform/api/prescription';
import SuccessModal from 'components/success-modal';

import './style.scss';
import ImageCarouselModal from 'components/image-carousel-modal';

interface IState {
  form: IPrescriptionModifyRequestModel;
  images: { file: File, url: string }[];
  imageModalOpen: boolean;
  submited: boolean;
  submitLoading: boolean;
  showSuccess: boolean;
};

@byPrivateRoute(ROUTES.PROFILE.PRESCRIPTIONS.CREATE, [onlyForUsers])
class Create extends HelperComponent<{}, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    showSuccess: false,
    images: [],
    imageModalOpen: false,
    form: {
      name: '',
      description: '',
      doctorName: '',
      medicalInstitution: '',
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private goBack = () => window.routerHistory.goBack();

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value; 
    this.safeSetState({ form });
  }

  private uploadImage = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { images } = this.state;
    const { files } = e.currentTarget;

    if (files && files[0]) {
      images.push({
        file: files[0],
        url: URL.createObjectURL(files[0]),
      });

      this.safeSetState({ images });
    }
  }

  private toggleImageModal = () => {
    const { imageModalOpen } = this.state;
    this.safeSetState({ imageModalOpen: !imageModalOpen });
  }

  private deleteImage = (e: React.SyntheticEvent, index: number) => {
    e.stopPropagation();
    const { images } = this.state;
    images.splice(index, 1);
    this.safeSetState({ images });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submitLoading: true, submited: true }, async () => {
      if (this.formValidation.valid) {
        const { form } = this.state;
        const result = await PrescriptionController.Create(form);
        if (result.success) this.sendImages(result.data);
        else this.safeSetState({ submitLoading: false, submited: false });
      }
    });
  }

  private sendImages = async (id: number) => {
    const { images } = this.state;
    if (images.length) {
      const form = new FormData();
      images.forEach(item => form.append('files', item.file));

      const result = await PrescriptionController.UploadFile(id, form);
      result.success && this.toggleSuccessModal();
    } else this.toggleSuccessModal();
  }

  private toggleSuccessModal = () => {
    const { showSuccess } = this.state;
    showSuccess ? window.routerHistory.push(ROUTES.HOME) : this.safeSetState({ showSuccess: true });
  }

  public render() {
    const { images, imageModalOpen, showSuccess } = this.state;
    
    return (
      <Layout>
        <div className="P-profile-prescriptions-create">
          <h3>
            {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
            {Settings.translations.add_prescription}
          </h3>

          <form className="G-main-form P-form">
            <div className="G-main-form-half-field">
              <p className="G-input-top-label">{Settings.translations.prescription}</p>
              <input
                name="name"
                className={`G-main-input ${this.formValidation.errors.name ? 'G-invalid-field' : ''}`}
                onChange={this.changeField}
              />
            </div>

            <div className="G-main-form-half-field">
              <p className="G-input-top-label">{Settings.translations.medical_institution}</p>
              <input
                name="medicalInstitution"
                className={`G-main-input ${this.formValidation.errors.medicalInstitution ? 'G-invalid-field' : ''}`}
                onChange={this.changeField}
              />
            </div>

            <div className="G-main-form-half-field">
              <p className="G-input-top-label">{Settings.translations.doctor}</p>
              <input
                name="doctorName"
                className={`G-main-input ${this.formValidation.errors.doctorName ? 'G-invalid-field' : ''}`}
                onChange={this.changeField}
              />
            </div>

            <div className="G-main-form-half-field P-upload-part">
              {images.map((item, index) => <span
                key={index}
                className="P-uploaded"
                style={{ background: `url('${item.url}') center/cover` }}
                onClick={this.toggleImageModal}
              >
                <i className="icon-Group-5032" onClick={e => this.deleteImage(e, index)} />
              </span>)}

              <div className="P-upload-button">
                <label className="G-main-button">
                  <i className="icon-Group-5543 G-mr-0" />
                  {Settings.translations.upload_image}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.uploadImage}
                  />
                </label>
              </div>
            </div>

            <div className="G-main-form-half-field">
              <p className="G-input-top-label">{Settings.translations.description}</p>
              <input
                name="description"
                className={`G-main-input ${this.formValidation.errors.description ? 'G-invalid-field' : ''}`}
                onChange={this.changeField}
              />
            </div>
            
            <div className="G-flex G-flex-justify-center G-mt-20">
              <LoaderContent
                className="P-submit G-main-button"
                onClick={this.submit}
              >{Settings.translations.send}</LoaderContent>
            </div>
          </form>
        </div>

        {imageModalOpen && <ImageCarouselModal images={images.map(item => item.url)} onClose={this.toggleImageModal} />}        

        {showSuccess && <SuccessModal onClose={this.toggleSuccessModal}>
          <h3>{Settings.translations.prescription_success}</h3>
          <Link className="G-main-button G-normal-link G-mt-30" to={ROUTES.PROFILE.PRESCRIPTIONS.MAIN}>{Settings.translations.prescriptions}</Link>
        </SuccessModal>}
      </Layout>
    );
  }
}

export default Create;