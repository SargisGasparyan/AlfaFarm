// import * as React from 'react';

// import HelperComponent from 'platform/classes/helper-component';
// import { Shared } from 'modules';
// import ROUTES from 'platform/constants/routes';
// import { byRoute } from 'platform/decorators/routes';
// import { IProductListResponseModel } from 'platform/api/product/models/response';
// import { infinityScrollPageLimit } from 'platform/constants';
// import { scrolledToBottom } from 'platform/services/helper';
// import ProductController from 'platform/api/product';
// import PageLoader from 'components/page-loader';
// import Slider from "react-slick";
// import { RouteComponentProps } from 'react-router-dom';

// import './style.scss';
// import Settings from 'platform/services/settings';

// interface IState {
//   loading: boolean;
//   data?: IProductListResponseModel[];
// };

// interface IRouteParams { id: string; }

// @byRoute([ROUTES.PRODUCTS.SIMILAR])
// class SimilarList extends HelperComponent<RouteComponentProps<IRouteParams>, IState> {

//   public state: IState = {
//     loading: false,
//   };

//   public settings = {
//     dots: false,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 766,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1
//         }
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }

//     ]
//   }

//   private pageNo = 1;
//   private lastPage = false;

//   private goBack = () => window.routerHistory.goBack();

//   public componentDidMount() {
//     this.fetchData();
//     window.addEventListener('scroll', this.scroll);
//   }

//   public componentWillUnmount() {
//     super.componentWillUnmount();
//     window.removeEventListener('scroll', this.scroll);
//   }

//   private fetchData = (overwrite?: boolean) => this.safeSetState({ loading: true }, async () => {
//     if (!this.lastPage) {
//       const { id } = this.props.match.params;
//       const body = {
//         pageNumber: this.pageNo,
//         pageSize: infinityScrollPageLimit,
//       };

//       const result = await ProductController.GetRelated(+id, body);
//       const data = this.state.data || [];

//       this.safeSetState({ data: overwrite ? result.data.list : [...data, ...result.data.list], loading: false });
//       this.lastPage = result.data.pageCount === this.pageNo;
//     } else this.safeSetState({ loading: false });
//   });

//   private scroll = () => {
//     const { loading } = this.state;

//     if (!this.lastPage && scrolledToBottom() && !loading) {
//       this.pageNo += 1;
//       this.fetchData();
//     }
//   }

//   public render() {
//     const { data } = this.state;

//     return data ? (
//       <section className="G-page P-products-similar-list-page">
//         <h2 className="G-page-title">{Settings.translations.similar_products}</h2>
//         <div className="P-list-wrapper">
//           <Slider
//             {...this.settings}
//             arrows={true}
//             swipe={false}
//           >
//             {data.map(item => <div key={item.id}>
//               <Shared.Products.ListItem data={item} />
//             </div>)}
//           </Slider>
//           {/* {data.map(item => <Shared.Products.ListItem key={item.id} data={item} />)} */}
//         </div>
//       </section>
//     ) : <PageLoader />;
//   }
// };

// export default SimilarList;
