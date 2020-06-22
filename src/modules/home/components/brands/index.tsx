import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Settings from 'platform/services/settings';
import { IPagination } from 'platform/constants/interfaces';
import BrandController, { IBrand } from 'platform/api/brand';
import PageLoader from 'components/page-loader';
import ROUTES from 'platform/constants/routes';
import { BackArrow, NextArrow } from 'components/slider-arrows';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import Screen from 'components/screen';

import './style.scss';

interface IState {
  data: IPagination<IBrand> | null;
  loading: boolean;
  currentPage: number;
};

class Brands extends HelperPureComponent<{}, IState> {

  public state: IState = {
    data: null,
    loading: false,
    currentPage: 1,
  };

  private limit = 30;
  
  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => this.safeSetState({ loading: true }, async () => {
    const { data, currentPage } = this.state;
    const result = await BrandController.List(currentPage, this.limit);
    if (data) result.data.itemList = [...data.itemList, ...result.data.itemList];
    this.safeSetState({ data: result.data, loading: false });
  });
  
  private slide = (slideIndex: number) => {
    const { data, currentPage } = this.state;
    const nextClicked = slideIndex + 1 >= currentPage;
    if (data && data.pagesLeft && nextClicked) {
      this.safeSetState({ currentPage: currentPage + 1 }, this.fetchData);  
    }
  }

  private Content = ({ itemCount }: { itemCount: number }) => {
    const { data, loading } = this.state;

    return data && <Slider
      className="variable-width P-brands"
      infinite={true}
      rows={2}
      slidesPerRow={itemCount}
      draggable={false}
      afterChange={this.slide}
      prevArrow={<BackArrow />}
      nextArrow={!loading ? <NextArrow /> : undefined}
    >
      {data.itemList.map((item, index) => <Link
        key={item._id}
        className="P-brand"
        to={`${ROUTES.PRODUCTS.LIST}?brands=${JSON.stringify([item._id])}&brandsDefaultLimit=${index + 1}`}
        title={item.name}
      >
        <div style={{ background: `url("${item.logo}") center/contain no-repeat` }} />
      </Link>)}
    </Slider>;
  }

  public render() {
    const { data } = this.state;

    return data && data.itemList.length ? <>
      <h2 className="P-G-page-title">{Settings.translations.brands}</h2>

      <Screen.Desktop>
        <this.Content itemCount={5} />
      </Screen.Desktop>

      <Screen.SmallDesktop_Tablet>
        <this.Content itemCount={4} />
      </Screen.SmallDesktop_Tablet>

      <Screen.Tablet_Mobile>
        <this.Content itemCount={3} />
      </Screen.Tablet_Mobile>

      <Screen.Mobile>
        <this.Content itemCount={2} />
      </Screen.Mobile>
    </> : !data ? <PageLoader /> : null;
  }
};

export default Brands;