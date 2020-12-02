import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
import Settings from 'platform/services/settings';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import ShadowText from 'components/shadow-text';
import SearchInput from 'components/search-input';
import WholesalePromotionController from 'platform/api/wholesalePromotion';
import { IWholesalePromotionBrandListResponseModel, IWholesalePromotionListResponseModel  } from 'platform/api/wholesalePromotion/models/response';
import { getMediaPath } from 'platform/services/helper';
import Table from 'components/table';
import { Link } from 'react-router-dom';
import BasketController from 'platform/api/basket';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';

interface IState {
  data: IWholesalePromotionBrandListResponseModel[];
};

@byRoute(ROUTES.WHOLESALE_PROMOTIONS)
class WholesalePromotions extends HelperPureComponent<{}, IState> {

  public state: IState = {
    data: [],
  };

  public componentDidMount() { this.fetchData() }

  private columnConfig = [
    {
      name: Settings.translations.product,
      cell: (row: IWholesalePromotionListResponseModel) => <Link
        to={ROUTES.PRODUCTS.DETAILS.replace(':id', row.productId)}
        className="G-normal-link G-black-color"
      >{row.productTitle}</Link>,
    },
    {
      name: Settings.translations.order,
      cell: (row: IWholesalePromotionListResponseModel) => row.fromCount,
    },
    {
      name: Settings.translations.gift,
      cell: (row: IWholesalePromotionListResponseModel) => row.giftCount,
    },
    {
      name: '',
      cell: (row: IWholesalePromotionListResponseModel) => <button className="G-main-button P-add-to-cart" onClick={() => this.addToCart(row)}>{Settings.translations.add_to_cart}</button>,
    },
  ];

  private fetchData = async (search?: string) => {
    const result = await WholesalePromotionController.GetBrandsList(search);
    this.safeSetState({ data: result.data });
  }

  private addToCart = async (row: IWholesalePromotionListResponseModel) => {
    const body = {
      productId: row.productId,
      productQuantity: row.fromCount,
    };

    const result = await BasketController.Change(body);
    result.success && window.dispatchEvent(new CustomEvent(DispatcherChannels.CartItemsUpdate));
  }

  public render() {
    const { data } = this.state;

    return (
      <section className="G-page P-wholesale-promotions-page">
        <div className="P-header">
          <ShadowText>{Settings.translations.wholesale_promotions}</ShadowText>
        </div>

        <div className="P-search-block">
          <SearchInput withSubmit={true} onSubmit={this.fetchData} />
        </div>

        {data.map(item => <div key={item.brandId} className="P-brand-item">
          <div className="P-title">
            <div className="P-image" style={{ background: `url('${getMediaPath(item.brandPhoto)}') center/contain no-repeat` }} />
          </div>
          
          <Table<IWholesalePromotionListResponseModel>
            columnConfig={this.columnConfig}
            data={item.promotions}
          />
        </div>)}
      </section>
    );
  }
};

export default WholesalePromotions;