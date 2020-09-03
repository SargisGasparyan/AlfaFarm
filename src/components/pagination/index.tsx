import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import Connection from 'platform/services/connection';
import { IPagination } from 'platform/constants/interfaces';

import './style.scss';

interface IState {
  pageCount: number;
  selectedPage: number;
  numberValue: number;
};

interface IProps<Data> {
  count?: boolean;
  interval: number;
  fetchData: (page: number) => Promise<IPagination<Data>>;
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
    const page = Number(query.get('page'));

    this.setState({ selectedPage: page || 1 }, async () => {
      await this.getList();
      this.checkSelectedPage();
    });
  }

  private get interval() { return this.props.interval + 1; }

  private checkSelectedPage = () => {
    const { pageCount } = this.state;
    const query = new URLSearchParams(window.location.search);
    const x = Number(query.get('page'));

    x > pageCount && this.selectPage(1);
    this.setState({ selectedPage: x || 1 });
  }

  public getList = async () => {
    const { selectedPage } = this.state;
    const { fetchData } = this.props;

    Connection.AbortAll();
    const result = await fetchData(selectedPage);
    result && this.setState({ pageCount: result.pageCount });
  }

  public selectPage = (selectedPage: number) => this.setState({ selectedPage }, async () => {
    const query = new URLSearchParams(window.location.search);
    query.set('page', selectedPage.toString());

    window.history.replaceState({ path: window.location.pathname }, '', `?${query}`);
    this.getList();
  });

  public getByNumber = (e: React.SyntheticEvent<HTMLInputElement>) => this.setState({ numberValue: Math.round(+e.currentTarget.value) });

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

  // private prevPage = () => {
  //   const { selectedPage } = this.state;
  //   const prevPage = selectedPage - 1;
  //   prevPage && this.selectPage(prevPage);
  // }

  // private nextPage = () => {
  //   const { selectedPage, pageCount } = this.state;
  //   const nextPage = selectedPage + 1;
  //   nextPage <= pageCount && this.selectPage(nextPage);
  // };

  public render() {
    const { selectedPage, pageCount } = this.state;
    const { count } = this.props;

    return (
      <div className="ABM-pagination-wrap">
        {/* <div className="ABM-button ABM-left" onClick={this.prevPage}>prev</div> */}
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
        {/* <div className="ABM-button ABM-right" onClick={this.nextPage}>next</div> */}
      </div>
    );
  }
}

export default Pagination;