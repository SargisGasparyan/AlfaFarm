import * as React from 'react';
import scrollToElement from 'scroll-to-element';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import HelperComponent from 'platform/classes/helper-component';
import SearchOptions from './components/search-options';
import SearchResults from './components/search-results';
import { IPharmacyBranchListResponseModel } from 'platform/api/pharmacyBranch/models/response';
import PharmacyBranchController from 'platform/api/pharmacyBranch';

import './style.scss';

interface IState {
  data?: IPharmacyBranchListResponseModel[];
};

@byRoute([ROUTES.PHARMACIES])
class Pharmacies extends HelperComponent<{}, IState> {

  public state: IState = {};

  private regionChange = async (regionId: number) => {
    if (regionId) {
      const result = await PharmacyBranchController.GetByRegion(regionId);
      this.safeSetState({ data: result.data }, () => 
        setTimeout(() => scrollToElement('#pharmacy-search-results', {
          duration: 400,
          align: 'top'
        }), 0)
      );
    } else this.safeSetState({ data: undefined });
  }

  public render() {
    const { data } = this.state;

    return (
      <section className="P-pharmacies-page">
        <SearchOptions onChange={this.regionChange} />
        {data && <SearchResults data={data} />}
      </section>
    );
  }
}

export default Pharmacies;