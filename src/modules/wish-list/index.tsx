import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Storage from 'platform/services/storage';
import GuestList from './components/guest-list';
import UserLists from './components/user-lists';
import Invitation from './pages/invitation';
import HelperPureComponent from 'platform/classes/helper-pure-component';
// import LanguageEnum from 'platform/constants/enums';

import './style.scss';

@byRoute(ROUTES.WISH_LIST.MAIN)
class WishList extends HelperPureComponent<{}, {}> {
    public render() {

    return (
      <section className="G-page P-wish-list-page">
        {!!Storage.profile ? <UserLists /> : <GuestList />}
      </section>
    );
  }
};

export default { WishList, Invitation };