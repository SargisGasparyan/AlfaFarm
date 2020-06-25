import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import ListItem from './components/list-item';

import './style.scss';

class News extends HelperComponent<{}, {}> {

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

        <a className="G-main-ghost-button G-auto-margin-left G-auto-margin-right">{Settings.translations.show_all}</a>
      </section>
    );
  }
};

export default News;