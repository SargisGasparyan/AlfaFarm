import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import Storage from 'platform/services/storage';
import ROUTES from 'platform/constants/routes';
import { leftSideOptions } from './constants/routes';
import { getMediaPath } from 'platform/services/helper';
import Settings from 'platform/services/settings';

import PersonImage from 'assets/images/person.png';

import './style.scss';

class LeftSide extends HelperPureComponent<{}, {}> {

  public render() {
    return (
      <aside className="P-profile-left-side">
        <div className="P-main-info">
          <div
            className="P-image"
            style={{ background: `url('${Storage.profile.photoPath ? getMediaPath(Storage.profile.photoPath) : PersonImage}') center/cover` }}
          />

          <h2>
            {Storage.profile.fullName}
            <Link
              to={ROUTES.PROFILE.MAIN}
            ><i className="icon-Group-5545" /></Link>
          </h2>
        </div>

        {leftSideOptions().map(item => <NavLink
          to={item.path}
          key={item.path}
          className="P-link"
          activeClassName="P-active"
        >
          {item.name}
        </NavLink>)}

        <div onClick={Settings.logout} className="P-link">
          {Settings.translations.log_out}
        </div>
      </aside>
    );
  }
}

export default LeftSide;