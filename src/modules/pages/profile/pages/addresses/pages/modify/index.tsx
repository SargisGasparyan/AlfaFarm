import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import { byPrivateRoute } from 'platform/decorators/routes';
import ROUTES from 'platform/constants/routes';
import Layout from '../../../../components/layout';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { validateForm } from './services/helper';
import { IUserAddressModifyRequestModel } from 'platform/api/userAddress/models/request';
import UserAddressController from 'platform/api/userAddress';
import generic from 'platform/decorators/generic';
import { IYandexPlace } from 'platform/constants/interfaces';
import { trimForm } from 'platform/services/helper';
import YandexAutocomplete from 'components/yandex-autocomplete';

import './style.scss';

interface IState {
  form: IUserAddressModifyRequestModel;
  submited: boolean;
  submitLoading: boolean;
};

interface IRouteParams {
  id: string;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byPrivateRoute([ROUTES.PROFILE.ADDRESSES.CREATE, ROUTES.PROFILE.ADDRESSES.UPDATE])
class Modify extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    form: {
      name: '',
      addressText: '',
      addressLat: 0,
      addressLng: 0,
    },
  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const { id } = this.props.match.params;

    if (id) {
      const result = await UserAddressController.GetDetails(+id);
      const { form } = this.state;
      form.name = result.data.name;
      form.building = result.data.building;
      form.apartment = result.data.apartment;
      form.entrance = result.data.entrance;
      form.floor = result.data.floor;
      form.addressText = result.data.addressText;
      form.addressLat = result.data.addressLat;
      form.addressLng = result.data.addressLng;
      this.safeSetState({ form });
    }
  }

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

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submited: true }, async () => {
      this.formValidation.valid && this.safeSetState({ submitLoading: true }, async () => {
        const { id } = this.props.match.params;
        const { form } = this.state;
        const trimedForm = trimForm<IUserAddressModifyRequestModel>(form);
        const result = id ? await UserAddressController.Update(+id, trimedForm) : await UserAddressController.Create(trimedForm);

        if (result.data) window.routerHistory.push(ROUTES.PROFILE.ADDRESSES.MAIN);
        else this.safeSetState({ submitLoading: false });
      });
    });
  }

  private onAddressChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    console.log('mtav');
    form.addressText = e.currentTarget.value;
    form.addressLat = 0;
    form.addressLng = 0;
    this.safeSetState({ form })
  }

  private onAddressSelect = (place: IYandexPlace) => {
    const { form } = this.state;
    form.addressText = place.name;
    form.addressLat = place.position[0];
    form.addressLng = place.position[1];
    this.safeSetState({ form });
  }

  public render() {
    const { form, submitLoading } = this.state;

    return (
      <Layout>
        <div className="G-flex G-flex-wrap P-profile-addresses-modify">
          {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
          <form className="G-main-form P-form-block G-mr-20">
            <span className="P-page-title">{ this.props.match.params.id ? Settings.translations.edit_address: Settings.translations.add_address }</span>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.name}</p>
              <input
                name="name"
                value={form.name}
                className={`G-main-input ${this.formValidation.errors.name ? 'G-invalid-field' : ''}`}
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.address}</p>
              <YandexAutocomplete
                value={form.addressText || ''}
                onChange={this.onAddressChange}
                className={`G-main-input ${this.formValidation.errors.address ? 'G-invalid-field' : ''}`}
                onPlaceSelect={this.onAddressSelect}
              />
            </div>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.building}</p>
              <input
                name="building"
                value={form.building || ''}
                className="G-main-input"
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.entrance}</p>
              <input
                name="entrance"
                value={form.entrance || ''}
                className="G-main-input"
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.floor}</p>
              <input
                name="floor"
                value={form.floor || ''}
                className="G-main-input"
                onChange={this.changeField}
              />
            </div>
            <div className="G-main-form-field">
              <p className="G-input-top-label">{Settings.translations.apartment}</p>
              <input
                name="apartment"
                value={form.apartment || ''}
                className="G-main-input"
                onChange={this.changeField}
              />
            </div>
            <LoaderContent
              className="G-main-button G-mt-1"
              loading={submitLoading}
              onClick={this.submit}
            >{Settings.translations.save}</LoaderContent>
          </form>
        </div>
      </Layout>
    );
  }
}

export default Modify;