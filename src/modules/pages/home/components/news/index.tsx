import * as React from 'react';
import { Link } from 'react-router-dom';

import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import ROUTES from 'platform/constants/routes';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';

import './style.scss';

class News extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-home-news">
        <ShadowText className="G-text-center">{Settings.translations.news}</ShadowText>

        <div className="P-list-wrapper">
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
        </div>

        <Link
          to={ROUTES.NEWS.LIST}
          className="G-main-ghost-button G-auto-margin-left G-auto-margin-right"
        >{Settings.translations.show_all}</Link>
      </section>
    );
  }
};

export default News;