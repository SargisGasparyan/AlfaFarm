import * as React from 'react';


import ROUTES from 'platform/constants/routes';
import { byPrivateRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import PageLeftMenu from 'components/page-left-menu';
import EmptyState from 'components/empty-state';
import PageLoader from 'components/page-loader';
import OrderController, { IOrder, OrderTypeEnum, OrderStatusEnum } from 'platform/api/order';
import { paginationPageLimit, currency } from 'platform/constants';
import { IPagination } from 'platform/constants/interfaces';
import { scrolledToBottom, getViewEnum, formatDate } from 'platform/services/helper';
import Details from './components/details';
import { orderStatusClass } from './services/helper';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import * as OrdersAnimationJSON from 'assets/animations/empty_orders.json';

import './style.scss';

interface IState {
  activeDetailsId: null | string;
  chosen: OrderTypeEnum | null;
  loading: boolean;
  activeData: IPagination<IOrder> | null;
  completedData: IPagination<IOrder> | null;
};

@byPrivateRoute(ROUTES.PROFILE.MY_ORDERS)
class MyOrders extends HelperPureComponent<{}, IState> {

  public state: IState = {
    chosen: null,
    loading: false,
    activeData: null,
    completedData: null,
    activeDetailsId: null,
  };

  private menuItems = [
    {
      display: Settings.translations.active,
      value: OrderTypeEnum.Active,
    },
    {
      display: Settings.translations.completed,
      value: OrderTypeEnum.Completed,
    },
  ];

  private statusViewEnum = getViewEnum(OrderStatusEnum);
  private activeCurrentPage = 1;
  private completedCurrentPage = 1;

  public componentDidMount() {
    this.fetchData();
    this.checkQuery();
    window.addEventListener('scroll', this.scroll);
    
    if (!sessionStorage.getItem('activeTab')) {
      sessionStorage.setItem('activeTab', 'Active')
    }
    if (sessionStorage.getItem('activeTab') === 'Completed') {
      this.safeSetState({ chosen: OrderTypeEnum.Completed })
    }
    if (sessionStorage.getItem('activeTab') === 'Active') {
      this.safeSetState({ chosen: OrderTypeEnum.Active })
    }
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('scroll', this.scroll);
  }

  private checkQuery = () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('active');

    id && this.safeSetState({ activeDetailsId: id });
  }

  private fetchData = () => this.safeSetState({ loading: true }, async () => {
    const { chosen, activeData, completedData } = this.state;
    if (chosen === OrderTypeEnum.Active) {
      const result = await OrderController.List(this.activeCurrentPage, paginationPageLimit, true);
      if (activeData) result.data.itemList = [...activeData.itemList, ...result.data.itemList];
      this.safeSetState({ loading: false, activeData: result.data });
    } else {
      const result = await OrderController.List(this.completedCurrentPage, paginationPageLimit, false);
      if (completedData) result.data.itemList = [...completedData.itemList, ...result.data.itemList];
      this.safeSetState({ loading: false, completedData: result.data });
    }
  });

  private changePage = (chosen: OrderTypeEnum) => this.safeSetState({ chosen }, () => {
    const { activeData, completedData } = this.state;
    const fetchActive = chosen === OrderTypeEnum.Active && !activeData;
    const fetchCompleted = chosen === OrderTypeEnum.Completed && !completedData;
    if (fetchActive || fetchCompleted) this.fetchData();
  });

  private scroll = () => {
    const { chosen, activeData, completedData, loading } = this.state;
    const fetchActive = chosen === OrderTypeEnum.Active && activeData && activeData.pagesLeft;
    const fetchCompleted = chosen === OrderTypeEnum.Completed && completedData && completedData.pagesLeft;
    if (scrolledToBottom() && !loading) {
      if (fetchActive) {
        this.activeCurrentPage += 1;
        this.fetchData();
      } else if (fetchCompleted && !loading) {
        this.completedCurrentPage += 1;
        this.fetchData();
      }
    }
  }
  
  private Content = () => {
    const { chosen, activeData, completedData } = this.state;
    const data = chosen === OrderTypeEnum.Active ? activeData : completedData;
    
    if (chosen === OrderTypeEnum.Completed) {
      sessionStorage.setItem('activeTab', 'Completed');
    } else if (chosen === OrderTypeEnum.Active){
      sessionStorage.setItem('activeTab', 'Active');
    }

    if (!data || !data.itemList.length) return (
      <EmptyState
        animation={OrdersAnimationJSON}
        text={Settings.translations.no_orders}
      />
    );

    return <>
      {data.itemList.map(item => <div className="P-item" key={item._id} onClick={() => this.openDetails(item._id)}>
        <div className="P-item-content">
          <h3>
            {Settings.translations.order_id} #{item.nid}
            <span className={`P-request-status ${orderStatusClass(item.status)}`}>&bull; {Settings.translations[this.statusViewEnum[item.status]]}</span>
          </h3>
          {item.deliveryDate && <h4>
            {Settings.translations.delivery_date} {formatDate(item.deliveryDate)}
          </h4>}
          <hr />
          {item.products.slice(0, 2).map(product => <div key={product._id} className="P-product">
            <div className="P-image">
              <div style={{ background: `url("${product.image}") center/cover` }} />
            </div>
            <h3 className="P-texts">
              {product.name}
              <span>{product.count} x {product.price} {currency}</span>
            </h3>
          </div>)}
          <br />
          <h3>{Settings.translations.quantity} {item.productCount}</h3>
          <h4 className="P-total">{Settings.translations.total} {item.total} {currency}</h4>
        </div>
      </div>)}
    </>;
  }

  private openDetails = (id: string) => {
    this.safeSetState({ activeDetailsId: id });
    window.routerHistory.replace(`${ROUTES.PROFILE.MY_ORDERS}?active=${id}`);
  }

  private closeDetails = (updateData?: boolean) => {
    if (updateData) {
      this.activeCurrentPage = 1;
      this.safeSetState({
        activeData: null,     
        activeDetailsId: null,
      }, this.fetchData);
    } else this.safeSetState({ activeDetailsId: null });
    window.routerHistory.replace(ROUTES.PROFILE.MY_ORDERS);
  }


  public render() {
    const { loading, activeDetailsId, chosen, activeData, completedData } = this.state;
    const data = chosen === OrderTypeEnum.Active ? activeData : completedData;

    return (
      <section className="G-page P-my-orders-page">
        <h1 className="G-page-title">{Settings.translations.my_orders}</h1>
        <div className="P-page-content">
          <PageLeftMenu items={this.menuItems} onChange={this.changePage} />
          {!loading || data ? <div className="P-content G-page-min-height">
            <this.Content />
          </div> : <PageLoader />}
        </div>
        {activeDetailsId && <Details id={activeDetailsId} active={chosen === OrderTypeEnum.Active} onClose={this.closeDetails} />}
      </section>
    );
  }
};

export default MyOrders;