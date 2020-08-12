import * as React from 'react';
import { Link } from 'react-router-dom';
import scrollToElement from 'scroll-to-element';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import Settings from 'platform/services/settings';
import ROUTES from 'platform/constants/routes';

import ClinicImage from 'assets/images/clinic_background.png';
import CardiogramRed from 'assets/images/cardiogram_red.png';

import './style.scss';
import RouteService from 'platform/services/routes';

class Options extends HelperPureComponent<{}, {}> {

  private linkClicked = () => {
    setTimeout(() => scrollToElement('#clinic-content', {
      duration: 400,
      align: 'top',
      offset: -160,
    }), 0)
  }

  public render() {

    return (
      <div className="G-page P-clinic-options" style={{ background: `url('${ClinicImage}') center/cover` }}>
        <ShadowText className="P-shadow-text-without-offset">{Settings.translations.clinic}</ShadowText>
        <Link to={ROUTES.CLINIC.DOCTORS} onClick={this.linkClicked} className="G-main-ghost-button">{Settings.translations.doctors}</Link>
        <Link to={ROUTES.CLINIC.LABORATORY} onClick={this.linkClicked} className="G-main-ghost-button">{Settings.translations.laboratory}</Link>
        <Link to={ROUTES.CLINIC.PRICE_LIST} onClick={this.linkClicked} className="G-main-ghost-button">{Settings.translations.price_list}</Link>
        <Link to={ROUTES.CLINIC.ABOUT_US} onClick={this.linkClicked} className="G-main-ghost-button">{Settings.translations.about_us}</Link>

        {!RouteService.isRoute(ROUTES.CLINIC.MAIN) && <div className="P-cardiogram">
          <img src={CardiogramRed} />
        </div>}
      </div>
    );
  };
};

export default Options;