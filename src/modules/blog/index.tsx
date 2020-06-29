import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import FirstItem from './components/first-item';
import ListItem from './components/list-item';

import './style.scss';

@byRoute([ROUTES.BLOG])
class Blog extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-blog-page">
        <ShadowText className="G-page-title">{Settings.translations.blog}</ShadowText>
        <FirstItem data={{}} />
        
        <div className="P-list-wrapper">
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
          <ListItem data={{}} />
        </div>
      </section>
    );
  }
}

export default Blog;