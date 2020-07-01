import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';
import Select from 'components/select';

import HomeImage from 'assets/images/home_background.png';

import './style.scss';

class SearchOptions extends HelperPureComponent<{}, {}> {

  public render() {

    return (
      <div className="G-page P-pharmacies-search-options" style={{ background: `url('${HomeImage}') center/cover` }}>
        <ShadowText>{Settings.translations.pharmacies}</ShadowText>
        <form className="G-main-form">
          <div className="G-main-form-half-field">
            <Select
              options={[]}
            />
          </div>
          <div className="G-main-form-half-field">
            <Select
              options={[]}
            />
          </div>
          <button className="G-main-button">{Settings.translations.search}</button>
        </form>
      </div>
    );
  };
};

export default SearchOptions;