import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';
import { infinityScrollPageLimit } from 'platform/constants';
import { scrolledToBottom } from 'platform/services/helper';
import PageLoader from 'components/page-loader';
import { onlyForUsers } from 'platform/guards/routes';
import TenderController from 'platform/api/tender';
import { ITenderListResponseModel } from 'platform/api/tender/models/response';
import Details from './pages/details';

import './style.scss';
import EmptyState from 'components/empty-state';
import * as animationData from 'assets/animations/EmptyTender.json';

interface IState {
  data?: ITenderListResponseModel[];
  loading: boolean;
};

@byRoute([ROUTES.TENDERS.MAIN], [onlyForUsers])
class Tenders extends HelperComponent<{}, IState> {

  public state: IState = {
    loading: false,
  };

  private pageNo = 1;
  private lastPage = false;

  public componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.scroll);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
    if (!this.lastPage) {
      const body = {
        pageNumber: this.pageNo,
        pageSize: infinityScrollPageLimit,
      };

      const result = await TenderController.GetList(body);
      const data = this.state.data || [];

      this.safeSetState({ data: overwrite ? result.data.list : [...data, ...result.data.list], loading: false });
      this.lastPage = result.data.pageCount === this.pageNo;
    } else this.safeSetState({ loading: false });
  });

  private scroll = () => {
    const { loading } = this.state;
    
    if (!this.lastPage && scrolledToBottom() && !loading) {
      this.pageNo += 1;
      this.fetchData();
    }
  }

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-tenders-page">
        {data ? <>
          <h2 className="G-page-title">{Settings.translations.tenders.toUpperCase()}</h2>
          

          {!!data.length ? <div className="P-content">
            {data.map(item => <ListItem key={item.id} data={item} />)}
          </div> : <EmptyState animationData={animationData} text={Settings.translations.empty_tenders_list} />}
        </> : <PageLoader />}
      </section>
    );
  }
}

export default { Tenders, Details };