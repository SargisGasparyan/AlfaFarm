import * as React from 'react';
import HelperComponent from "platform/classes/helper-component";
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';
import { IContactUsBodyModel } from 'platform/api/support/models';
import { isValidEmail } from 'platform/services/validator';
import SupportController from 'platform/api/support';
import {validateForm} from './service/helper';
import Storage from 'platform/services/storage';
interface IState {
  body: IContactUsBodyModel;
  submited: boolean;
  submitLoading: boolean;
}
class Form extends HelperComponent<{}, IState> {

  public state: IState = {
    body: {
      name: Storage.profile ? `${Storage.profile.firstName} ${Storage.profile.lastName}` : '',
      email: Storage.profile ? Storage.profile.email : '',
      content: ''
    },
    submited: false,
    submitLoading: false
  }

  private get formValidation() {
    const { submited, body } = this.state;
    return validateForm.call(body, submited);
  }

  private change = (e: React.SyntheticEvent<any>) => {
    const { body } = this.state;
    body[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ body });
  }
  private apply = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { body } = this.state;
    this.safeSetState({ submited: true }, () => {
      !!this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const res = await SupportController.createRequest(body);
        if (res.success) {
          const alertify = await import('alertifyjs');
          alertify.success(Settings.translations.request_success);
          this.safeSetState({ submited: false }, () => {
            body.content = '';
            body.email = Storage.profile.email || '',
            body.name = (Storage.profile.firstName + Storage.profile.lastName) || '';
          });
          this.safeSetState({ body });
        }
        this.safeSetState({ submitLoading: false })
      });
    });
  }
  public render() {
    const { submitLoading, body } = this.state;
    return (
      <form className="G-main-form G-ml-auto G-mr-auto">
        <div className="G-main-form-field">
          <input
            placeholder={Settings.translations.name}
            className={`G-main-input ${this.formValidation.errors.name ? 'G-invalid-field' : ''}`}
            name="name"
            value={body.name}
            onChange={this.change}
          />
        </div>
        <div className="G-main-form-field">
          <input
            placeholder={Settings.translations.email}
            name="email"
            value={body.email}
            className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
            onChange={this.change}
          />
        </div>
        <div className="G-main-form-field">
          <textarea
            placeholder={Settings.translations.write_a_message}
            name="content"
            value={body.content}
            className={`G-main-textarea ${this.formValidation.errors.content ? 'G-invalid-field' : ''}`}
            onChange={this.change}
          />
        </div>
        <LoaderContent
          onClick={this.apply}
          loading={submitLoading}
          className="G-main-button P-form-button"
        >{Settings.translations.send}</LoaderContent>
      </form>
    );
  }
};
export default Form;
