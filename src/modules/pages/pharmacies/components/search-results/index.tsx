import * as React from 'react';

import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';

import './style.scss';

class SearchResults extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <section className="G-page P-pharmacies-search-results">
        <ShadowText className="G-text-center">{Settings.translations.search_results}</ShadowText>

        <div className="P-content">
          <div className="P-list">
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
            <h3>Մաշտոց {Math.round(Math.random() * 100)}</h3>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97583.88432369805!2d44.418527387344774!3d40.15350050870056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da526a!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1593078450542!5m2!1sen!2s"
            tabIndex={0}
            frameBorder={0}
            className="P-maps"
            allowFullScreen={true}
            aria-hidden={false}
          />
        </div>
      </section>
    );
  }
};

export default SearchResults;