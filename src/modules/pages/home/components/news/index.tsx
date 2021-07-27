import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';
import ListItem from './components/list-item';
import Slider from "react-slick";
import { INewsListResponseModel } from 'platform/api/news/models/response';
import NewsController from 'platform/api/news';
import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IState {
  data: INewsListResponseModel[];
  showAll: boolean;
}

class News extends HelperComponent<{}, IState> {

  public state: IState = {
    data: [],
    showAll: false,
  };

  public settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  }

  public componentDidMount() { this.fetchData(); }

  private fetchData = async () => {
    const result = await NewsController.GetList({ pageNumber: 1, pageSize: 4 });
    this.safeSetState({ data: result.data.list, showAll: result.data.pageCount > 1 });
  }

  public render() {
    const { data, showAll } = this.state;

    return data.length ? (
      <section className="G-page P-home-news">
        <h2 className="G-page-title">{Settings.translations.news}</h2>
        <div className="P-list-wrapper">
          <Slider
            {...this.settings}
            arrows={true}
            swipe={false}
          >
            {data.map(item => <div key={item.id}>
              <ListItem data={item} />
            </div>)}
          </Slider>
        </div>

        {showAll && <Link
          to={ROUTES.NEWS.MAIN}
          className="G-main-ghost-button G-ml-auto G-mr-auto"
        >{Settings.translations.show_all}</Link>}
      </section>
    ) : null;
  }
};

export default News;
