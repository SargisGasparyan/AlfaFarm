import * as React from 'react';

import HelperComponent from "platform/classes/helper-component";
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';
import { validateForm } from '../../services/helper';

interface IState {
  form: {
    name: string;
    email: string;
    text: string;
  };
  submited: boolean;
  submitLoading: boolean;
};

class Form extends HelperComponent<{}, {}> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      name: '',
      email: '',
      text: '',
    },
  };

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, () => {
      this.formValidation.valid && window.location.reload();
    });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return (
      <form className="G-main-form G-ml-auto G-mr-auto">
        <div className="G-main-form-field">
          <input
            name="name"
            value={form.name || ''}
            className={`G-main-input ${this.formValidation.errors.name ? 'G-invalid-field' : ''}`}
            placeholder={Settings.translations.name}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <input
            name="email"
            value={form.email || ''}
            className={`G-main-input ${this.formValidation.errors.email ? 'G-invalid-field' : ''}`}
            placeholder={Settings.translations.email}
            onChange={this.changeField}
          />
        </div>
        <div className="G-main-form-field">
          <input
            name="text"
            value={form.text || ''}
            className={`G-main-input ${this.formValidation.errors.text ? 'G-invalid-field' : ''}`}
            placeholder={Settings.translations.message}
            onChange={this.changeField}
          />
        </div>
        <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.submit}
        >{Settings.translations.send}</LoaderContent>
      </form>
    );
  }
};

export default Form;