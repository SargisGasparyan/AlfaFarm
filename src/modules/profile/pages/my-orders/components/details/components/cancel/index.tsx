import * as React from 'react';

import Modal from 'components/modal';
import OrderController, { IOrderCancelRequestModel } from 'platform/api/order';
import Settings from 'platform/services/settings';
import LoaderContent from 'components/loader-content';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  id: string;
  onClose(canceled: boolean): void;
};

interface IState {
  submitLoading: boolean;

  form: IOrderCancelRequestModel;
};

class Cancel extends HelperComponent<IProps, IState> {

  public state: IState = {
    submitLoading: false,
    form: {
      id: '',
      reason: '',
    },
  };

  private changeReason = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { form } = this.state;
    form.reason = e.currentTarget.value;
    this.safeSetState({ form });
  };

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.safeSetState({ submitLoading: true }, async () => {
      const { id, onClose } = this.props;
      const { form } = this.state;
      form.id = id;
      const result = await OrderController.Cancel(form);
      if (result.success) onClose(true);
      else this.safeSetState({ submitLoading: false });
    })
  }

  public render() {
    const { submitLoading } = this.state;
    const { onClose } = this.props;

    return (
      <Modal onClose={() => onClose(false)} className="P-order-cancel-modal">
        <h2>{Settings.translations.reason}</h2>
        <form className="P-G-fields-form">
          <div className="P-G-field P-G-field-textarea">
            <textarea placeholder={Settings.translations.write} onChange={this.changeReason} />
          </div>
          <LoaderContent loading={submitLoading} className="P-G-form-button" onClick={this.submit}>
            {Settings.translations.confirm}
          </LoaderContent>
        </form>
      </Modal>
    );
  }
};

export default Cancel;