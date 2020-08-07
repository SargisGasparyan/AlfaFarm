import * as React from 'react';

import Modal from 'components/modal';
import Settings from 'platform/services/settings';
import WishController, { IWishListDetails } from 'platform/api/wish';
import { getUserName } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IProps {
  data: IWishListDetails;
  onClose(updateList?: boolean): void;
  onDataChange(data: IWishListDetails): void;
};

interface IState { loading: boolean; };

class ModifyInvitedModal extends HelperComponent<IProps, IState> {

  public state: IState = { loading: false };

  private closeModal = () => this.props.onClose();
  private deleteMember = (id: string) => {
    const data = {...this.props.data};
    const body = {
      wishListId: data._id,
      memberIdList: [id],
    };
    this.safeSetState({ loading: true }, async () => {
      const result = await WishController.DeleteMember(body);
      if (result.success) {
        const member = data.members.find(item => item.id === id);
        if (member) {
          const memberIndex = data.members.indexOf(member);
          data.members.splice(memberIndex, 1);
          this.props.onDataChange(data);
          this.safeSetState({ loading: false });
        }
      }
    });
  }

  public render() {
    const { data } = this.props;
    const { loading } = this.state;

    return (
      <Modal onClose={this.closeModal} className="P-wish-list-modify-modal">
        <h2>{Settings.translations.edit_invited_list}</h2>
        <div className="P-invited" key={data.creator.id}>
          <h3>{getUserName(data.creator)}</h3>
          <span>{Settings.translations.owner}</span>
        </div>
        {data.members.map(item => <div className="P-invited" key={item.id}>
          <h3>{getUserName(item)}</h3>
          <i className="icon-close" onClick={() => this.deleteMember(item.id)} />
        </div>)}
        {loading && <PageLoader />}
      </Modal>
    );
  }
};

export default ModifyInvitedModal;