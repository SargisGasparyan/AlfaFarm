import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import WishController, { IModifyWishListRequestModel, IWishListItem } from 'platform/api/wish';
import LoaderContent from 'components/loader-content';
import { IDropdownOption } from 'platform/constants/interfaces';
import CompanyController from 'platform/api/company';
import Select from 'components/select';
import PageLoader from 'components/page-loader';
import ROUTES from 'platform/constants/routes';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  data: IWishListItem | null;
  onClose(updateList?: boolean): void;
};

interface IState {
  submited: boolean;
  submitLoading: boolean;
  form: IModifyWishListRequestModel;
  payerDropdown: Array<IDropdownOption<string | null>>;
};

class ModifyListModal extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    payerDropdown: [],
    form: { name: '' },
  };

  public async componentDidMount() {
    const result = await CompanyController.Short();
    const meOption = {
      name: Settings.translations.i,
      value: null,
    };
    if (result.data.length) this.safeSetState({ payerDropdown: [
      meOption,
      ...result.data.map(item => ({ name: item.name, value: item._id })),
    ]}); else this.safeSetState({ payerDropdown: [meOption] });

    this.checkForEdit();
  }

  private checkForEdit = () => {
    const { data } = this.props;
    if (data) this.safeSetState({ form: {
      id: data._id,
      name: data.name,
    }});
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;
    if (!submited) this.safeSetState({ submited: true }, this.checkForSend);
    else this.checkForSend();
  }

  private checkForSend = () => {
    const form = { ...this.state.form };
    if (form.name) {
      this.safeSetState({ submitLoading: true }, async () => {
        const { Add, Edit } = WishController;
        const result = this.props.data ? await Edit(form) : await Add(form);
        if (result.success) {
          this.props.onClose(true);
          window.dispatchEvent(new CustomEvent('addNewList'));
        }
        else this.safeSetState({ submitLoading: false });
      });
    }
  }

  private closeModal = () => this.props.onClose();

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      const { form } = this.state;
      form[e.currentTarget.name] = e.currentTarget.value;
      this.safeSetState({ form });
    }
  }

  private changePayer = (option: IDropdownOption<string | null>) => {
    const { form } = this.state;
    if (option.value) form.companyId = option.value;
    else delete form.companyId;

    this.safeSetState({ form });
  }

  private companyNewClick = () => window.routerHistory.push(ROUTES.PROFILE.MY_COMPANY);
  public render() {
    const { data } = this.props;
    const { submited, submitLoading, form, payerDropdown } = this.state;

    return payerDropdown.length ? (
      <Modal onClose={this.closeModal} className="P-wish-list-modify-modal">
        <h2>{data ? Settings.translations.edit_list : Settings.translations.add_list}</h2>
        <form className="G-fields-form">
          <div className="G-field-wrap">
            <h4>{Settings.translations.name}</h4>
            <div className={`G-field ${submited && !form.name ? 'G-invalid-field' : ''}`}>
              <input name="name" value={form.name} onChange={this.changeField} />
            </div>
          </div>
          {!data && <div className="G-field-wrap">
            <h4>{Settings.translations.payer}</h4>
            <Select<string | null>
              options={payerDropdown}
              value={form.companyId || null}
              withNew={true}
              onNewClick={this.companyNewClick}
              emptyText={Settings.translations.no_companies}
              onChange={this.changePayer}
            />
          </div>}
          <LoaderContent
            loading={submitLoading}
            className="G-form-button"
            onClick={this.submit}
          >
            {Settings.translations.save}
          </LoaderContent>
        </form>
      </Modal>
    ) : <PageLoader />;
  }
};

export default ModifyListModal;