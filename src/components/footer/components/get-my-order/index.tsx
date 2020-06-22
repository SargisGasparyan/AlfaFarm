import * as React from 'react';

import OrderController, { IOrderGuestRequestModel } from 'platform/api/order';
import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';
import { isValidEmail } from 'platform/services/validator';
import OrderDetails from 'modules/profile/pages/my-orders/components/details';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  queryData: IOrderGuestRequestModel | null;
  onClose(): void;
};

interface IState {
  form: IOrderGuestRequestModel;
  submited: boolean;
  orderId: string | null;
  submitLoading: boolean;
};

class GetMyOrder extends HelperComponent<IProps, IState> {

  public state: IState = {
    submited: false,
    submitLoading: false,
    orderId: null,
    form: {
      email: '',
      code: '',
    },
  };

  public componentDidMount() {
    const { form } = this.state;
    const { queryData } = this.props;

    queryData && !form.email && this.safeSetState({ form: queryData }, this.checkForSend);
  }

  private changeField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { form } = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.safeSetState({ form });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submited } = this.state;

    if (!submited) this.safeSetState({ submited: true }, this.checkForSend);
    else this.checkForSend();
  }

  private checkForSend = () => {
    const { form } = this.state;

    if (isValidEmail(form.email) && form.code) this.safeSetState({ submitLoading: true }, async () => {
      const result = await OrderController.Guest(form);
      this.safeSetState({ orderId: result.data, submitLoading: false });
    });
  }

  public render() {
    const { onClose } = this.props;
    const { form, orderId, submited, submitLoading } = this.state;

    return !orderId ? (
      <Modal onClose={onClose} className="P-get-my-order-modal">
        <h2>{Settings.translations.get_my_order}</h2>
        <p>{Settings.translations.get_my_order_text}</p>
        <form className="P-G-fields-form">
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.email}</h4>
            <div className={`P-G-field ${submited && !isValidEmail(form.email) ? 'P-G-invalid-field' : ''}`}>
              <input
                name="email"
                value={form.email}
                onChange={this.changeField}
              />
            </div>
          </div>
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.code}</h4>
            <div className={`P-G-field ${submited && !form.code ? 'P-G-invalid-field' : ''}`}>
              <input
                name="code"
                value={form.code}
                onChange={this.changeField}
              />
            </div>
          </div>
          <LoaderContent
            loading={submitLoading}
            onClick={this.submit}
            className="P-G-form-button"
          >
            {Settings.translations.ok}
          </LoaderContent>
        </form>
      </Modal>
    ) : <OrderDetails id={orderId} active={true} onClose={onClose} />;
  }
}

export default GetMyOrder;