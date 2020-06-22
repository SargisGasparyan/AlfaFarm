import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byPrivateRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import PageLeftMenu from 'components/page-left-menu';
import EmptyState from 'components/empty-state';
import PageLoader from 'components/page-loader';
import RequestController, { IRequest, RequestTypeEnum, RequestSendTypeEnum, RequestPackStatusEnum } from 'platform/api/request';
import { paginationPageLimit } from 'platform/constants';
import { IPagination } from 'platform/constants/interfaces';
import { scrolledToBottom, getViewEnum } from 'platform/services/helper';
import { configedMoment } from 'platform/services/helper';
import Details from './components/details';
import { requestStatusClass } from 'modules/request/services/helper';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import * as RequestsAnimationJSON from 'assets/animations/empty_requests.json';

import './style.scss';

interface IState {
  activeDetailsId: null | string;
  chosen: RequestTypeEnum;
  loading: boolean;
  activeData: IPagination<IRequest> | null;
  completedData: IPagination<IRequest> | null;
};

@byPrivateRoute(ROUTES.PROFILE.MY_REQUESTS)
class MyRequests extends HelperPureComponent<{}, IState> {

  public state: IState = {
    chosen: RequestTypeEnum.Active,
    loading: false,
    activeData: null,
    completedData: null,
    activeDetailsId: null,
  };

  private menuItems = [
    {
      display: Settings.translations.active,
      value: RequestTypeEnum.Active,
    },
    {
      display: Settings.translations.completed,
      value: RequestTypeEnum.Completed,
    },
  ];

  private statusViewEnum = getViewEnum(RequestPackStatusEnum);
  private activeCurrentPage = 1;
  private completedCurrentPage = 1;

  public componentDidMount() {
    this.fetchData();
    this.checkQuery();
    window.addEventListener('scroll', this.scroll);
    sessionStorage.removeItem('activeTab')
  }

  private checkQuery = () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('active');

    id && this.safeSetState({ activeDetailsId: id });
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private fetchData = () => this.safeSetState({ loading: true }, async () => {
    const { chosen, activeData, completedData } = this.state;
    if (chosen === RequestTypeEnum.Active) {
      const result = await RequestController.List(this.activeCurrentPage, paginationPageLimit, chosen);
      if (activeData) result.data.itemList = [...activeData.itemList, ...result.data.itemList];
      this.safeSetState({ loading: false, activeData: result.data });
    } else {
      const result = await RequestController.List(this.completedCurrentPage, paginationPageLimit, chosen);
      if (completedData) result.data.itemList = [...completedData.itemList, ...result.data.itemList];
      this.safeSetState({ loading: false, completedData: result.data });
    }
  });

  private changePage = (chosen: RequestTypeEnum) => this.safeSetState({ chosen }, () => {
    const { activeData, completedData } = this.state;
    const fetchActive = chosen === RequestTypeEnum.Active && !activeData;
    const fetchCompleted = chosen === RequestTypeEnum.Completed && !completedData;
    if (fetchActive || fetchCompleted) this.fetchData();
  });

  private scroll = () => {
    const { chosen, activeData, completedData, loading } = this.state;
    const fetchActive = chosen === RequestTypeEnum.Active && activeData && activeData.pagesLeft;
    const fetchCompleted = chosen === RequestTypeEnum.Completed && completedData && completedData.pagesLeft;
    if (scrolledToBottom() && !loading) {
      if (fetchActive) {
        this.activeCurrentPage += 1;
        this.fetchData();
      } else if (fetchCompleted) {
        this.completedCurrentPage += 1;
        this.fetchData();
      }
    }
  }

  private Content = () => {
    const { chosen, activeData, completedData } = this.state;
    const data = chosen === RequestTypeEnum.Active ? activeData : completedData;
    if (!data || !data.itemList.length) return (
      <EmptyState
        animation={RequestsAnimationJSON}
        text={Settings.translations.no_requests}
      />
    );

    return <>
      {data.itemList.map(item => <div className="P-request-item" key={item._id} onClick={() => this.openDetails(item._id)}>
        <div className="P-request-icon">
          <i className={item.type === RequestSendTypeEnum.Form ? 'icon-orders' : 'icon-attach'} />
        </div>
        <div className="P-request-content">
          <h3>
            {item.type === RequestSendTypeEnum.Form ?
              Settings.translations.request_forms :
              Settings.translations.request_files} #{item.nid}
            {chosen !== RequestTypeEnum.Active &&
              <span className={`P-request-status ${requestStatusClass(item.status)}`}>&bull; {Settings.translations[this.statusViewEnum[item.status]]}</span>}
          </h3>
          <h4>
            {configedMoment(item.createdDt).fromNow()} &nbsp; 
            {item.type === RequestSendTypeEnum.Form ?
              <><i className="icon-orders" /> {item.requestCount}</> :
              <><i className="icon-attach" /> {item.fileCount}</>}
          </h4>
        </div>
      </div>)}
    </>;
  }

  private openDetails = (id: string) => {
    this.safeSetState({ activeDetailsId: id });
    window.routerHistory.replace(`${ROUTES.PROFILE.MY_REQUESTS}?active=${id}`);
  }

  private closeDetails = () => {
    this.safeSetState({ activeDetailsId: null });
    window.routerHistory.replace(ROUTES.PROFILE.MY_REQUESTS);
  }

  private listUpdate = () => this.safeSetState({ activeDetailsId: null, activeData: null }, this.fetchData);

  public render() {
    const { chosen, loading, activeDetailsId, activeData, completedData } = this.state;
    const data = chosen === RequestTypeEnum.Active ? activeData : completedData;

    return (
      <section className="P-G-page P-my-requests-page">
        <h1 className="P-G-page-title">{Settings.translations.my_requests}</h1>
        <div className="P-page-content">
          <PageLeftMenu items={this.menuItems} onChange={this.changePage} />
          {!loading || data ? <div className="P-content P-G-page-min-height">
            <this.Content />
          </div> : <PageLoader />}
        </div>
        {activeDetailsId && <Details id={activeDetailsId} onClose={this.closeDetails} onListUpdate={this.listUpdate} />}
      </section>
    );
  }
};

export default MyRequests;