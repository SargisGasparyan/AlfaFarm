import * as React from 'react';

import LoaderContent from 'components/loader-content';
import AuthController, { IChoosePasswordRequestModel } from 'platform/api/auth';
import PageLoader from 'components/page-loader';
import Settings from 'platform/services/settings';
import { IAuthQueryData } from '../../constants/interfaces';
import { OSTypeEnum } from 'platform/constants/enums';
import ROUTES from 'platform/constants/routes';
import HelperComponent from 'platform/classes/helper-component';

interface IProps {
  onClose(): void;
  onError(value: string): void;
  data: IAuthQueryData;
};

interface IState {
  loading: boolean;
  submited: boolean;
  form: IChoosePasswordRequestModel;
};

class SignUpVerify extends HelperComponent<IProps, IState> {

  public state: IState = {
    loading: false,
    submited: false,
    form: {
      language: Settings.language,
      osType: OSTypeEnum.Web,
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
  };

  public componentDidMount() {
    
    const { data } = this.props;
    this.safeSetState({ loading: true }, async () => {
      const result = await AuthController.Verify({ email: data.email, code: data.code });
      if (result.success) this.safeSetState({ loading: false });
      else {
        window.routerHistory.push(ROUTES.HOME.MAIN);
        this.props.onClose();
      }
    });
  }

  private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (!submited) this.safeSetState({ submited: true }, this.checkForSubmit);
    else this.checkForSubmit();
  }

  private checkForSubmit = () => {
    const { data } = this.props;
    const form = {...this.state.form};
    if (form.password && form.confirmPassword === form.password) {
      this.safeSetState({ loading: true }, async () => {
        delete form.confirmPassword;
        form.email = data.email;
        form.code = data.code;
        const result = await AuthController.Register(form);

        if (result.success) {
          Settings.token = result.data.token;
          if (result.data.bonusCount) sessionStorage.setItem('giftBonusCount', result.data.bonusCount.toString());
          else sessionStorage.removeItem('giftBonusCount');
          window.routerHistory.push(ROUTES.HOME.MAIN);
          window.location.reload();
        } else {
          this.props.onError(result.message);
          this.safeSetState({ loading: false });
        }
      })
    }
  };

  public render() {
    const { loading, form, submited } = this.state;

    return <>
      <form className="G-fields-form">
        <div className={`G-field ${submited && !form.password ? 'G-invalid-field' : ''}`}>
          <input
            name="password"
            type="password"
            value={form.password}
            placeholder={Settings.translations.password}
            onChange={this.change}
          />
        </div>
        <div className={`G-field ${submited && (!form.password || form.password !== form.confirmPassword) ? 'G-invalid-field' : ''}`}>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            placeholder={Settings.translations.confirm_password}
            onChange={this.change}
          />
        </div>
        <LoaderContent
          loading={false}
          onClick={this.submit}
          className="G-form-button"
        >
          {Settings.translations.next}
        </LoaderContent>
      </form>
      {loading && <PageLoader />}
    </>;
  }
}

export default SignUpVerify;