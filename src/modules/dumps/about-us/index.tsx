import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import { AboutPagesEnum } from './constants/enums';
import AboutTheProject from './components/about-the-project';
import HowWeWork from './components/how-we-work';
import Adventages from './components/adventages';
import Delivery from './components/delivery';
import PageLeftMenu from 'components/page-left-menu';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState {
  choosed: AboutPagesEnum;
};

@byRoute(ROUTES.ABOUT)
class AboutUs extends HelperPureComponent<{}, IState> {

  public state: IState = {
    choosed: AboutPagesEnum.AboutTheProject,
  };

  private menuItems = [
    {
      display: Settings.translations.about_the_project,
      value: AboutPagesEnum.AboutTheProject,
    },
    {
      display: Settings.translations.how_we_work,
      value: AboutPagesEnum.HowWeWork,
    },
    {
      display: Settings.translations.the_advantages_of_cooperation,
      value: AboutPagesEnum.Adventages,
    },
    {
      display: Settings.translations.delivery,
      value: AboutPagesEnum.Delivery,
    },
  ];

  private changePage = (choosed: AboutPagesEnum) => this.safeSetState({ choosed })

  private Content = () => {
    const { choosed } = this.state;

    switch (choosed) {
      case AboutPagesEnum.AboutTheProject: return <AboutTheProject />;
      case AboutPagesEnum.HowWeWork: return <HowWeWork />;
      case AboutPagesEnum.Adventages: return <Adventages />;
      default: return <Delivery />;
    }
  }

  public render() {

    return (
      <section className="G-page P-about-page">
        <h1 className="G-page-title">{Settings.translations.about_us}</h1>
        <div className="P-about-page-content">
          <PageLeftMenu items={this.menuItems} onChange={this.changePage} />
          <div className="P-content">
            <this.Content />
          </div>
        </div>
      </section>
    );
  }
};

export default AboutUs;