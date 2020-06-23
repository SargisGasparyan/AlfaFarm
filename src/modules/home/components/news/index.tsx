import * as React from 'react';

import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';

class News extends HelperComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-home-news">
        <ShadowText className="G-text-center">{Settings.translations.news}</ShadowText>
      </section>
    );
  }
};

export default News;