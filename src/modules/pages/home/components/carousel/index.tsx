import * as React from 'react';
import Slider from 'react-slick';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';
import BannerController from 'platform/api/banner';
import { IBannerListResponseModel } from 'platform/api/banner/models/response';

import { BannerTypeEnum } from 'platform/api/banner/constants/enums';
import ROUTES from 'platform/constants/routes';

import './style.scss';
import { BackArrow, NextArrow } from 'components/slider-arrows';

interface IState {
  data: IBannerListResponseModel[];
}

class Carousel extends HelperPureComponent<{}, IState> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await BannerController.GetList();
    this.safeSetState({ data: result.data });
  }

  private onItemClick = (item: IBannerListResponseModel) => {
    const urls = {
      [BannerTypeEnum.Blog]: ROUTES.BLOG.DETAILS.replace(':id', item.dataId),
      [BannerTypeEnum.News]: ROUTES.NEWS.DETAILS.replace(':id', item.dataId),
      [BannerTypeEnum.Product]: ROUTES.PRODUCTS.DETAILS.replace(':id', item.dataId),
      [BannerTypeEnum.Category]: `${ROUTES.PRODUCTS.MAIN}?categoryIds=${item.dataId}`,
      [BannerTypeEnum.Brand]: `${ROUTES.PRODUCTS.MAIN}?brandIds=${item.dataId}`,
      [BannerTypeEnum.ActiveIngredient]: `${ROUTES.PRODUCTS.MAIN}?activeIngredientIds=${item.dataId}`
    };

    window.routerHistory.push(urls[item.type]);
  }

  public render() {
    const { data } = this.state;

    return (
      <Slider
        dots={true}
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={true}
        className="G-page P-home-carousel-slider">
        {data.map(item => <div key={item.id}>
          {console.log("------------",item)}
          <div className="G-page P-home-carousel-slide" style={{ background: `url('${item.photoPath}') center/cover` }}>
            <ShadowText className="P-shadow-text-without-offset">{item.title}</ShadowText>
            {!!item.type && item.dataId && <button className="G-main-button" onClick={() => this.onItemClick(item)}>{Settings.translations.see_more}</button>}
          </div>
        </div>)}
      </Slider>
    );
  };
};

export default Carousel;
