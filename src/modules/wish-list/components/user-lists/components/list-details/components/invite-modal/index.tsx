import * as React from 'react';
import copy from 'copy-text-to-clipboard';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import WishController from 'platform/api/wish';
import PageLoader from 'components/page-loader';
import ROUTES from 'platform/constants/routes';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  id: string;
  onClose(): void;
};

interface IState {
  data: string;
};

class InviteModal extends HelperComponent<IProps, IState> {

  public state: IState = { data: '' };

  public async componentDidMount() {
    const { id } = this.props;
    const { data } = await WishController.Invite({ id });
    this.configData(data);
  }

  private configData = (data: string) => {
    const splited = data.split('/');
    const code = splited[splited.length - 1];
    const url = `${window.location.origin}${ROUTES.WISH_LIST.INVITATION.replace(':code', code)}`;
    this.safeSetState({ data: url });
  }

  private copyURL = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const alertify = await import('alertifyjs');
    const { data } = this.state;

    copy(data);
    alertify.success(Settings.translations.copied_to_clipboard);
  }

  public render() {
    const { data } = this.state;
    const { onClose } = this.props;

    return data ? (
      <Modal onClose={onClose} className="P-wish-list-invite-modal">
        <h2>{Settings.translations.invite}</h2>
        <form className="P-G-fields-form">
          <div className="P-G-field-wrap">
            <h4>{Settings.translations.url}</h4>
            <div className="P-G-field">
              <input defaultValue={data} readOnly={true} />
            </div>
          </div>
          <button className="P-G-form-button" onClick={this.copyURL}>{Settings.translations.copy}</button>
        </form>
      </Modal>
    ) : <PageLoader />;
  }
};

export default InviteModal;