import * as React from 'react';
import {Link} from 'react-router-dom';

import HelperComponent from 'platform/classes/helper-component';
import Settings from 'platform/services/settings';
import ListItem from './components/list-item';
import ROUTES from 'platform/constants/routes';
import {IProductListResponseModel} from 'platform/api/product/models/response';

import './style.scss';
import ProductController from 'platform/api/product';
import MultiCarousel from "../../../../../components/carousel";

interface IState {
	data: IProductListResponseModel[];
};

class DiscountedProducts extends HelperComponent<{}, IState> {
	
	public state: IState = {
		data: [],
	};
	
	public componentDidMount() {
		this.fetchData();
	}
	
	private fetchData = async () => {
		const result = await ProductController.GetList({pageNumber: 1, pageSize: 10, hasDiscount: true});
		//console.log(result);
		this.safeSetState({data: result.data.list});
	}
	
	public render() {
		const {data} = this.state;
		
		return data.length ? (
			<section className="G-page P-home-discounted-products">
				<h2 className="G-page-title">{Settings.translations.discounted_products}</h2>
				<div className="P-list-wrapper">
					<MultiCarousel>
						{data.map(item => <div key={item.id}>
							<ListItem data={item} />
						</div>)}
					</MultiCarousel>
				</div>
				<Link
					to={ROUTES.PRODUCTS.MAIN}
					className="G-main-ghost-button G-ml-auto G-mr-auto"
				>{Settings.translations.show_all}</Link>
			</section>
		) : null;
	}
};

export default DiscountedProducts;
