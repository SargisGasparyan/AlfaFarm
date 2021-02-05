import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import Modal from 'components/modal';
import NotificationController from 'platform/api/notification';

import './style.scss';
import { INotificationAnswerResponseModel, INotificationListResponseModel } from 'platform/api/notification/models/response';
import { NotificationChoiceTypeEnum } from 'platform/constants/enums';
import Settings from 'platform/services/settings';

interface IProps {
  onClose(): void;
  selectedItem: INotificationListResponseModel; 
};

interface IState {
  data: INotificationAnswerResponseModel | null;
};

class NotificationAnswer extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    data: null,
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await NotificationController.GetCustom(this.props.selectedItem.dataId as number);
    this.safeSetState({ data: result.data });
  }

  private confirm = async (type: NotificationChoiceTypeEnum) => {
    await NotificationController.Answer(this.props.selectedItem.dataId as number, type);
    this.props.onClose();
  }

  public render() {
    const { data } = this.state;
    const { onClose } = this.props;

    return !!data && (
      <Modal onClose={() => onClose()} className="P-confirm-modal">
      <div className="G-fields-form">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        {data.answerType ? 
          <span className="P-answer-text">{Settings.translations.answer_text} {data.answerType === NotificationChoiceTypeEnum.UserCanceled ? data.cancelText : data.confirmText}</span>
        :
          <div className="G-flex">
            <span onClick={() => this.confirm(NotificationChoiceTypeEnum.UserCanceled)}>{data.cancelText}</span>
            <span onClick={() => this.confirm(NotificationChoiceTypeEnum.UserConfirmed)} className="G-form-button P-answer-main-btn">{data.confirmText}</span>
          </div>
        }
        
      </div>
      </Modal>
    );
  }
}

export default NotificationAnswer;