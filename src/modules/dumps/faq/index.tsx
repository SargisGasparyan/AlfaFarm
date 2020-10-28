import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import ListItem from './components/list-item';
import { IFAQListResponseModel } from 'platform/api/faq/models/response';

import './style.scss';
import FAQController from 'platform/api/faq';

interface IState {
  data: IFAQListResponseModel[];
};

@byRoute(ROUTES.FAQ)
class FAQ extends HelperPureComponent<{}, IState> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    const result = await FAQController.GetList();
    this.safeSetState({ data: result.data });
  }

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-faq-page">
        <h1 className="G-page-title">{Settings.translations.faq}</h1>
        {data.map(item => <ListItem key={item.id} data={item} />)}
      </section>
    );
  }
};

export default FAQ;