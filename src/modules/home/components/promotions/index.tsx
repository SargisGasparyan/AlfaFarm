import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Settings from 'platform/services/settings';
import PromotionController, { IPromotion, PromotionTypeEnum } from 'platform/api/promotion';
import { IPagination } from 'platform/constants/interfaces';
import ROUTES from 'platform/constants/routes';
import { BackArrow, NextArrow } from 'components/slider-arrows';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState {
  data: IPagination<IPromotion> | null;
  loading: boolean;
  currentPage: number;
};

class Promotions extends HelperPureComponent<{}, IState> {

  public state: IState = {
    data: null,
    loading: false,
    currentPage: 1,
  };

  private currentSlide = 0;
  private limit = 12;
  
  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => this.safeSetState({ loading: true }, async () => {
    const { data, currentPage } = this.state;
    const result = await PromotionController.List(currentPage, this.limit);
    if (data) result.data.itemList = [...data.itemList, ...result.data.itemList];
    this.safeSetState({ data: result.data, loading: false });
  });

  private promotionLink = (item: IPromotion) => {
    switch (item.type) {
      case PromotionTypeEnum.Product:
         return `${ROUTES.PRODUCTS.LIST}?promotion=${item._id}`;
      default:
         return `${ROUTES.PRODUCTS.LIST}?category=${item.category}`;
    };
  }
  
  private slide = (slideIndex: number) => {
    const { data } = this.state;
    const nextClicked = slideIndex > this.currentSlide;
    if (data && data.itemList.length - (slideIndex + 1) < 3 && data.pagesLeft && nextClicked) {
      const { currentPage } = this.state;
      this.safeSetState({ currentPage: currentPage + 1 }, this.fetchData);  
    }
    this.currentSlide = slideIndex;
  }

  public render() {
    const { data, loading } = this.state;

    return data && data.itemList.length ? <>
      <h2 className="G-page-title">{Settings.translations.promotions}</h2>
      <Slider
        className="variable-width P-promotions"
        infinite={true}
        variableWidth={true}
        draggable={false}
        afterChange={this.slide}
        prevArrow={!loading ? <BackArrow /> : undefined}
        nextArrow={!loading ? <NextArrow /> : undefined}
      >
        {data.itemList.map(item => <Link
          key={item._id}
          className="P-promotion"
          to={this.promotionLink(item)}
          title={item.name}
        >
          <div
            className={loading ? 'P-loading' : ''}
            style={{ background: `url("${item.cover}") center/cover` }}
          />
          <p>{item.name}</p>
        </Link>)}
      </Slider>
    </> : null;
  }
};

export default Promotions;