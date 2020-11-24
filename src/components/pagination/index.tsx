import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import Connection from 'platform/services/connection';
import { IPagingResponse } from 'platform/constants/interfaces';

import './style.scss';

interface IState {
  pageCount: number;
  selectedPage: number;
  numberValue: number;
};

interface IProps<Data> {
  page?: number;
  count?: boolean;
  interval: number;
  fetchData: (page: number) => Promise<IPagingResponse<Data>>;
  pageChangeListener?: string;
};

class Pagination<Data> extends HelperComponent<IProps<Data>, IState> {

  public state: IState = {
    pageCount: 1,
    selectedPage: 1,
    numberValue: 1
  }

  public static defaultProps = {
    interval: 3,
  };

  public componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const { page, pageChangeListener } = this.props;

    pageChangeListener && window.addEventListener(pageChangeListener, this.outsidePageChange);

    this.safeSetState({ selectedPage: page || Number(query.get('page')) || 1 }, async () => {
      await this.getList();
      this.checkSelectedPage();
    });
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    const { pageChangeListener } = this.props;
    pageChangeListener && window.removeEventListener(pageChangeListener, this.outsidePageChange);
  }

  private outsidePageChange = async (e: CustomEvent) => {
    await this.selectPage(e.detail, true);
    this.checkSelectedPage();
  }

  private get interval() { return this.props.interval + 1; }

  private checkSelectedPage = () => {
    const { pageCount } = this.state;
    const query = new URLSearchParams(window.location.search);
    const x = Number(query.get('page'));

    if (x > (pageCount || 1)) {
      this.selectPage(pageCount);
      this.safeSetState({ selectedPage: pageCount });
    } else this.safeSetState({ selectedPage: x || 1 });
  }

  public getList = async (outside = false) => {
    const { selectedPage, pageCount } = this.state;
    const { fetchData } = this.props;

    pageCount > 1 && !outside && Connection.AbortAll();
    const result = await fetchData(selectedPage);
    result && this.safeSetState({ pageCount: result.pageCount });
  }

  public selectPage = async (selectedPage: number, outside = false) => this.safeSetState({ selectedPage }, async () => {
    const query = new URLSearchParams(window.location.search);
    query.set('page', (selectedPage || 1).toString());

    window.history.replaceState({ path: window.location.pathname }, '', `?${query}`);
    await this.getList(outside);
  });

  public getByNumber = (e: React.SyntheticEvent<HTMLInputElement>) => this.safeSetState({ numberValue: Math.round(+e.currentTarget.value) });

  public confirmNumber = (e: any) => {
    const { pageCount, numberValue } = this.state;
    e.key === 'Enter' && pageCount >= numberValue && numberValue >= 1 && this.selectPage(numberValue);
  }

  private get ranges() {
    const arr = [];
    const { selectedPage, pageCount } = this.state;

    for (let i = 1; i <= pageCount; i++) {
      const cond1 = i === selectedPage || ((i > selectedPage - this.interval) && (i < selectedPage + this.interval));
      const cond2 = selectedPage < this.interval && i <= 5;
      const cond3 = (selectedPage > pageCount - this.interval) && i > pageCount - 5;
      (cond1 || cond2 || cond3) && arr.push(i);
    }

    return arr;
  }

  public render() {
    const { selectedPage, pageCount } = this.state;
    const { count } = this.props;

    return (
      <div className="ABM-pagination-wrap">
        {pageCount > 1 && <div className="ABM-pages-wrap">
          {this.ranges.map((item, index) => <div
            key={index}
            className={`ABM-page ${selectedPage === item ? 'ABM-selected' : ''}`}
            onClick={() => this.selectPage(item)}
          >{item}</div>)}

          {!!count && <input
            type="number"
            className="ABM-count-input"
            onChange={this.getByNumber}
            onKeyPress={this.confirmNumber}
          />}
        </div>}
      </div>
    );
  }
}

export default Pagination;