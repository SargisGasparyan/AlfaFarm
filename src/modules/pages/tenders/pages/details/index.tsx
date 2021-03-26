import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import generic from 'platform/decorators/generic';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Info from './components/info';
import Images from './components/images';
import HelperComponent from 'platform/classes/helper-component';
import PageLoader from 'components/page-loader';
import TenderController from 'platform/api/tender';
import { onlyForUsers } from 'platform/guards/routes';
import { ITenderDetailsResponseModel } from 'platform/api/tender/models/response';
import Settings from 'platform/services/settings';

import './style.scss';

interface IRouteParams { id: string };

interface IState {
  data?: ITenderDetailsResponseModel;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byRoute(ROUTES.TENDERS.DETAILS, [onlyForUsers])
class Details extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {};

  public componentDidMount() { this.fetchData(); }

  private goBack = () => window.routerHistory.goBack();

  private fetchData = async () => {
    const { id } = this.props.match.params;
    const result = await TenderController.GetDetails(+id);
    this.safeSetState({ data: result.data });
  }

  private downloadRelated = () => {
    const { data } = this.state;
    data && data.relatedFiles.map(async item => {
      const result = await fetch(item.path).then(res => res.blob());
      const a = document.createElement('a');
      a.setAttribute('href', URL.createObjectURL(result));
      a.setAttribute('download', '');
      a.click();
    });
  }

  public render() {
    const { data } = this.state;

    return data ? (
      <section className="G-page P-tender-details-page">
        {window.routerHistory.length > 2 && <i className="G-back-icon icon-Group-5529" onClick={this.goBack} />}
        <div className="P-content">
          <Images data={data} />
          <Info data={data} />
          <p className="P-description" dangerouslySetInnerHTML={{ __html: data.description }} />
          {!!data.relatedFiles.length && <button
            className="G-main-button G-ml-auto G-mt-20"
            onClick={this.downloadRelated}
          >{Settings.translations.download_application}</button>}
        </div>
      </section>
    ) : <PageLoader />;
  }
};

export default Details;
