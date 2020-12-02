import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import Storage from 'platform/services/storage';
import ROUTES from 'platform/constants/routes';
import { leftSideOptions } from './constants/routes';
import { getMediaPath } from 'platform/services/helper';
import Settings from 'platform/services/settings';
import UserController from 'platform/api/user';

import PersonImage from 'assets/images/person.png';
import CameraImage from 'assets/images/camera.png';

import './style.scss';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import Broadcast from 'platform/services/broadcast';
import {IPagingResponse} from "../../../../../platform/constants/interfaces";
import {IPrescriptionListResponseModel} from "../../../../../platform/api/prescription/models/response";

interface IState {
  photoPath?: string;
}

class LeftSide extends HelperPureComponent<{}, {}> {

  private uploadInput = React.createRef<HTMLInputElement>();

  private options = leftSideOptions();

  public state: IState = {
    photoPath: Storage.profile.photoPath
  };

  private openUpload = () => {
    const { current } = this.uploadInput;
    current && current.click();
  }

  private uploadEnd = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('file', files[0]);

      const result = await UserController.UploadCover(formData);

      if (result.success) {
        Storage.profile.photoPath = result.data;
        Broadcast.dispatch(DispatcherChannels.StorageUpdate);
        this.safeSetState({ photoPath: result.data });
      }
    }
  }

  public componentDidMount() {
    Broadcast.subscribe(DispatcherChannels.StorageUpdate, this.storageUpdate);
  }

  private storageUpdate = () => {
    this.forceUpdate();
  }

  private logout = () => {
    window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm, { detail: Settings.translations.log_out_question }));
    window.addEventListener(DispatcherChannels.UserConfirmed, Settings.logout);
    window.addEventListener(DispatcherChannels.UserCanceled, this.logoutCanceled);
  }

  private logoutCanceled = () => {
    window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm));
    window.removeEventListener(DispatcherChannels.UserConfirmed, Settings.logout);
    window.removeEventListener(DispatcherChannels.UserCanceled, this.logoutCanceled);
  }

  public render() {
    const { photoPath } = this.state;

    return (
      <aside className="P-profile-left-side">
        <div className="P-main-info">
          <div
            className="P-image"
            style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
          >
            <div className="P-upload-camera" onClick={this.openUpload}>
              <img src={CameraImage} alt="camera" />
              <input ref={this.uploadInput} type="file" accept="image/*" onChange={this.uploadEnd} />
            </div>
          </div>

          <h2>
            {Storage.profile.firstName} {Storage.profile.lastName}
            <Link
              to={ROUTES.PROFILE.MAIN}
            ><i className="icon-Group-5545" /></Link>
          </h2>

          <Link to={ROUTES.PROFILE.PRESCRIPTIONS.MAIN} className="P-prescription-button G-main-ghost-button">{Settings.translations.prescription}</Link>
        </div>

        {this.options.map(item => <NavLink
          to={item.path}
          key={item.path}
          className="P-link"
          activeClassName="P-active"
        >
          {item.name}
        </NavLink>)}

        <div onClick={this.logout} className="P-link">
          {Settings.translations.log_out}
        </div>
      </aside>
    );
  }
}

export default LeftSide;
