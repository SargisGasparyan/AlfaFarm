import * as React from 'react';

import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import HelperComponent from 'platform/classes/helper-component';
import { IRegisterRequestModel } from 'platform/api/user/models/request';
import { validateForm } from './services/helper';
import { ModalContentEnum } from '../../constants/enums';
import UserController from 'platform/api/user';


interface IProps {
  onTypeChange(type: ModalContentEnum): void;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: IRegisterRequestModel;
};

class SignUp extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      fullName: '',
      password: '',
    },
  };

  private get formValidation() {
    const { submited, form } = this.state;
    return validateForm.call(form, submited);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form })
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const { form } = this.state;

        const result = await UserController.Register(form);
        if (result.data) window.location.reload();
        else this.safeSetState({ submitLoading: false });
      });
    });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return <>
      <h3 className="G-main-color G-text-center">{Settings.translations.choose_password}</h3>
      <form className="G-main-form">
        <div className="G-main-form-field">
          <input
            name="fullName"
            value={form.fullName}
            placeholder={Settings.translations.full_name}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.fullName ? 'G-invalid-field' : ''}`}
          />
        </div>
        <div className="G-main-form-field">
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder={Settings.translations.password}
            onChange={this.changeField}
            className={`G-main-input ${this.formValidation.errors.password ? 'G-invalid-field' : ''}`}
          />
        </div>
        <LoaderContent
          className="G-main-button"
          loading={submitLoading}
          onClick={this.submit}
        >{Settings.translations.confirm}</LoaderContent>
      </form>
    </>;
  }
}

export default SignUp;
