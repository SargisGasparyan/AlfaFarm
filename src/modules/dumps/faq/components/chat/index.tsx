import * as React from 'react';

import Settings from 'platform/services/settings';
import ConversationController, { IConversationMessage, ConversationMessageTypeEnum } from 'platform/api/conversation';
import Socket from 'platform/services/socket';
import Modal from 'components/modal';
import { IPagination } from 'platform/constants/interfaces';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IState {
  currentMessage: string;
  fileModalData: string | null;
  loading: boolean;
  data: IPagination<IConversationMessage> | null;
};

class Chat extends HelperComponent<{}, IState> {

  public state: IState = {
    currentMessage: '',
    fileModalData: null,
    data: null,
    loading: false,
  };
  
  private pageNo = 1;
  private limit = 15;
  private messagesBox = React.createRef<HTMLDivElement>();

  public async componentDidMount() {
    Socket.connection.on('newMessage', () => {
      this.pageNo = 1;
      this.fetchMessages(true);
    });
    this.fetchMessages();
  }

  private fetchMessages = async (overwrite: boolean = false) => this.safeSetState({ loading: true }, async () => {
    const { data } = this.state;
    const { List, WebGuest } = ConversationController;
    const result = Settings.token ? await List(this.pageNo, this.limit) : await WebGuest(this.pageNo, this.limit);
    result.data.itemList.reverse();
    if (data && !overwrite) result.data.itemList = [...result.data.itemList, ...data.itemList];
    this.safeSetState({ data: result.data, loading: false }, this.scrollToBottom);
  });

  private scrollToBottom = () => {
    if (this.pageNo === 1 && this.messagesBox.current) {
      const element = this.messagesBox.current;
      element.scrollTop = element.scrollHeight;
    }
  }

  private submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { currentMessage } = this.state;
    if (currentMessage) {
      const form = new FormData();
      form.append('message', currentMessage);
      const { Send, SendWeb } = ConversationController;
      const result = Settings.token ? await Send(form) : await SendWeb(form);
      if (result.success) {
        this.safeSetState({ currentMessage: '' });
        this.pageNo = 1;
        this.fetchMessages(true);
      }  
    }
  };

  private changeMessage = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.safeSetState({ currentMessage: value });
  }

  private fileUpload = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const [file] = Array.from(e.currentTarget.files);
      const form = new FormData();
      form.append('file', file);
      const { Send, SendWeb } = ConversationController;
      const result = Settings.token ? await Send(form) : await SendWeb(form);
      if (result.success) {
        this.pageNo = 1;
        this.fetchMessages(true);
      }
    }
  }

  private onScroll = (e: React.SyntheticEvent) => {
    const { data, loading } = this.state;
    if (e.currentTarget.scrollTop < 300 && !loading && data && data.pagesLeft) {
      this.pageNo += 1;
      this.fetchMessages();
    }
  }

  private openFileModal = (path: string | null) => this.safeSetState({ fileModalData: path });
  private closeFileModal = () => this.safeSetState({ fileModalData: null });

  private Messages = () => {
    const { data } = this.state;

    return (
      <div className="P-messages" ref={this.messagesBox} onScroll={this.onScroll}>
        {data && data.itemList.map((item, index) => <div
          key={item._id || index}
          className={`${item.filePath ? 'P-file' : ''} ${item.messageType === ConversationMessageTypeEnum.Admin ? 'P-admin' : ''}`}
        >
          {item.message || <div
            style={{ background: `url("${item.filePath}") center/cover` }}
            onClick={() => this.openFileModal(item.filePath)}
          />}
        </div>)}
      </div>
    );
  }

  public render() {
    const { currentMessage, fileModalData } = this.state;

    return (
      <div className="P-chat">
        <this.Messages />
        <form className="G-fields-form">
          <label>
            <input type="file" onChange={this.fileUpload} accept="image/*"/>
            <i className="icon-attach" />
          </label>
          <div className="G-field">
            <input
              placeholder={Settings.translations.message}
              value={currentMessage}
              onChange={this.changeMessage}
            />
            <button onClick={this.submit}><i className="icon-sent" /></button>
          </div>
        </form>
        {fileModalData && <Modal onClose={this.closeFileModal}>
          <div style={{ background: `url("${fileModalData}") center/contain no-repeat` }}  className="P-chat-details" />
        </Modal>}
      </div>
    );
  }
};

export default Chat;