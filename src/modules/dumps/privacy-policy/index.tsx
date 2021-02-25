import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperPureComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import { IStaticResponseModel } from 'platform/api/static/models/response';
import StaticController from 'platform/api/static';

import './style.scss';

interface IState {
  data?: IStaticResponseModel;
}

@byRoute([ROUTES.PRIVACY_POLICY])
class PrivacyPolicy extends HelperPureComponent<{}, IState> {

  public state: IState = {};

  public async componentDidMount() {
    const result = await StaticController.GetPrivacyPolicy();
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-privacy-policy-page">
        <h2 className="G-page-title">{Settings.translations.privacy_policy.toUpperCase()}</h2>

        {data && <div className="P-content" dangerouslySetInnerHTML={{ __html: data.content }} />}
      </section>
    );
  }
}

export default PrivacyPolicy;