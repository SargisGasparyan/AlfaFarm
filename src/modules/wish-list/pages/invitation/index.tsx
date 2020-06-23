import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ROUTES from 'platform/constants/routes';
import ConfirmModal from 'components/confirm-modal';
import { byRoute } from 'platform/decorators/routes';
import generic from 'platform/decorators/generic';
import WishController from 'platform/api/wish';
import Login from 'modules/login';
import Storage from 'platform/services/storage';
import HelperPureComponent from 'platform/classes/helper-pure-component';

interface IRouteParams { code: string };

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byRoute(ROUTES.WISH_LIST.INVITATION)
class Invitation extends HelperPureComponent<RouteComponentProps<IRouteParams>, {}> {

  public componentDidMount() {
    if (navigator.userAgent.match(/Android/i)) this.android();
    else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) this.ios();
  }

  private android = () => {
    const { code } = this.props.match.params;
    const action = 'armboldmind.ineed.invitation';
    const defaultCategory = 'android.intent.category.DEFAULT';
    const browsableCategory = 'android.intent.category.BROWSABLE';
    window.location.href = `intent:#Intent;action=${action};category=${defaultCategory};category=${browsableCategory};S.code=${code};end`;
  }

  private ios = () => {
    const { code } = this.props.match.params;
    window.location.href = `ineedarmenia://ineed.am/${code}`;
  }

  private home = () => window.routerHistory.push(ROUTES.HOME.MAIN);
  private confirm = async () => {
    const { code } = this.props.match.params;
    const result = await WishController.Join({ code });
    result.success && window.routerHistory.push(ROUTES.WISH_LIST.MAIN);
  };

  public render() {

    return (
      <section className="G-page">
        {Storage.profile ?
          <ConfirmModal onClose={this.home} onConfirm={this.confirm} /> :
          <Login onClose={this.home} />}
      </section>
    );
  }
};

export default Invitation;