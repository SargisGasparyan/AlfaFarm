import * as React from 'react';
import scrollIntoView from 'scroll-into-view';

import Modal from 'components/modal';
import RequestItem from '../request-item';
import RequestController, { IRequestAddModel } from 'platform/api/request';
import LoaderContent from 'components/loader-content';
import Settings from 'platform/services/settings';
import { productRequestFormValid, productRequestToFormData } from '../../services/helper';
import RequestContact from '../request-contact';
import { RequestSendTypeEnum } from 'platform/api/request';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  onClose(): void;
};

interface IState {
  type: RequestSendTypeEnum;
  forms: Array<IRequestAddModel | null>;
  onlyFilesForm: IRequestAddModel | null;
  submited: boolean;
  orderIds: string[] | null,
  submitLoading: boolean;
};

class RequestModal extends HelperComponent<IProps, IState> {

  public state: IState = {
    type: RequestSendTypeEnum.Form,
    forms: [null],
    onlyFilesForm: null,
    submited: false,
    orderIds: null,
    submitLoading: false,
  };

  private addProductRequest = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { forms, type } = this.state;
    const isValid = !forms.find(item => !productRequestFormValid(item, type));

    if (isValid) {
      forms.push(null);
      this.safeSetState({ forms, submited: false  });
    } 
  }

  private get disabled() {
    const { forms, type } = this.state;
    const isValid = !forms.find(item => !productRequestFormValid(item, type));

    if (isValid) return false
    else return true
  }

  private changeProductRequest = (form: IRequestAddModel, index: number) => {
    const { forms } = this.state;
    forms[index] = form;
    this.safeSetState({ forms });
  }

  private changeOnlyFiles = (form: IRequestAddModel) => {
    this.safeSetState({ onlyFilesForm: form })
  };

  private removeProductRequest = (index: number) => {
    const { forms } = this.state;
    forms.splice(index, 1);
    this.safeSetState({ forms });
  }

  private submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!this.state.submited) this.safeSetState({ submited: true }, this.checkForOrder);
    else this.checkForOrder();
  }

  private checkForOrder = () => {
    const { type, onlyFilesForm } = this.state;
    if (type === RequestSendTypeEnum.Form) {
      const invalidFields = document.getElementsByClassName('G-invalid-field');
      invalidFields.length && scrollIntoView(invalidFields[0]);
  
      const { forms } = this.state;
      const isValid = !forms.find(item => !productRequestFormValid(item, type));
  
      if (isValid) this.safeSetState({ submitLoading: true }, async () => {
        const checkedForms = forms.filter(item => !!item) as IRequestAddModel[];
        const results = await Promise.all(
          checkedForms.map(item => {
            const form = productRequestToFormData(item, type);
            return RequestController.Add(form);
          })
        );
  
        this.safeSetState({ orderIds: results.map(item => item.data), submitLoading: false });
      });  
    } else if (productRequestFormValid(onlyFilesForm, type)) this.safeSetState({ submitLoading: true, }, async () => {
      if (onlyFilesForm) {
        const form = productRequestToFormData(onlyFilesForm, type);
        const result = await RequestController.AddFiles(form);
        
        this.safeSetState({ orderIds: [result.data._id], submitLoading: false });  
      }

    });
  }

  private setType = (type: RequestSendTypeEnum) => type !== this.state.type && this.safeSetState({ type, submited: false });

  private closeContactModal = (endRequest: boolean) => {
    if (endRequest) this.props.onClose();
    else this.safeSetState({ orderIds: null });
  }

  public render() {
    const { type, forms, onlyFilesForm, submited, orderIds, submitLoading } = this.state;
    const { onClose } = this.props;

    return !orderIds ? (
      <Modal className="P-product-request-modal P-modal-static" onClose={onClose}>
        <h2>{Settings.translations.create_request}</h2>
        <div className={`P-choose-request-type ${type === RequestSendTypeEnum.Form ? 'P-choosed-form' : 'P-chosen-only-files'}`}>
          <button onClick={() => this.setType(RequestSendTypeEnum.Form)}>{Settings.translations.form}</button>
          <button onClick={() => this.setType(RequestSendTypeEnum.OnlyFiles)}>{Settings.translations.only_files}</button>
        </div>
        <form className="G-fields-form">
          {type === RequestSendTypeEnum.Form ? <>
            {forms.map((item, index) => <RequestItem
              key={index}
              submited={submited}
              form={item}
              type={type}
              onChange={form => this.changeProductRequest(form, index)}
              onDelete={index ? () => this.removeProductRequest(index) : null}
            />)}
            <button
              onClick={this.addProductRequest}
              disabled={this.disabled}
              className="G-fields-form-add"
            >
              <h4>{Settings.translations.add}</h4>
            </button>
          </> : <>
            <RequestItem
              submited={submited}
              form={onlyFilesForm}
              type={type}
              onChange={this.changeOnlyFiles}
            />
            <p>{Settings.translations.only_files_request_text}</p>
          </>}
          <LoaderContent
            disabled={type === RequestSendTypeEnum.OnlyFiles && !productRequestFormValid(onlyFilesForm, type)}
            loading={submitLoading}
            className="G-form-button"
            onClick={this.submit}
          >
            {Settings.translations.order}
          </LoaderContent>
        </form>
      </Modal>
    ) : <RequestContact ids={orderIds} onClose={this.closeContactModal} />;
  }
};

export default RequestModal;
