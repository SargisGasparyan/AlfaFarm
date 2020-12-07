import * as React from 'react';

import Settings from 'platform/services/settings';
import ShadowText from 'components/shadow-text';
import Form from './components/form';
import AboutDelivery from './components/about-delivery';
import AboutBonusCard from './components/about-bonus-card';
import AboutMobileApp from './components/about-mobile-app';
import Maps, { IMarkerProps } from 'components/maps';
import HelperComponent from 'platform/classes/helper-component';
import PharmacyBranchController from 'platform/api/pharmacyBranch';

import './style.scss';

interface IState {
  branches: IMarkerProps[];
};

class ContactUs extends HelperComponent<{}, IState> {

  public state: IState = {
    branches: [],
  };

  public componentDidMount() { this.fetchData() }

  private fetchData = async () => {
    const result = await PharmacyBranchController.GetList({
      pageSize: 200,
      pageNumber: 1,
    });

    this.safeSetState({
      branches: result.data.list.map(item => ({
        position: { lat: item.addressLat, lng: item.addressLng },
      }))
    });
  }

  public render() {
    const { branches } = this.state;

    return (
      <section className="G-page P-home-contact-us">
        <ShadowText className="G-text-center">{Settings.translations.contact_us}</ShadowText>
        <Form />

        <Maps markers={branches} className="P-maps" />

        <div className="P-bottom">
          <AboutDelivery />
          <AboutBonusCard />
          <AboutMobileApp />
        </div>
      </section>
    );
  }
}

export default ContactUs;
