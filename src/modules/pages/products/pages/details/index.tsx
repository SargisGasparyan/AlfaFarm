import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import generic from 'platform/decorators/generic';
import ROUTES from 'platform/constants/routes';
import { byRoute } from 'platform/decorators/routes';
// import PageLoader from 'components/page-loader/';
import ProductController, { IProduct } from 'platform/api/product';
import Actions from './components/actions';
import Info from './components/info';
import Images from './components/images';
import Similar from './components/similar';
import HelperComponent from 'platform/classes/helper-component';
import './style.scss';

interface IRouteParams { id: string };

interface IProps  {
  productId: string,
  opacity?: boolean,
}

interface IState {
  details: IProduct | null;
  initialDetails: IProduct | null;
  choosedImage: string | null;
};

@generic<RouteComponentProps<IRouteParams>>(withRouter)
@byRoute(ROUTES.PRODUCTS.DETAILS)
class Details extends HelperComponent<IProps & RouteComponentProps<IRouteParams>, IState> {

  public state: IState = {
    details: null,
    initialDetails: null,
    choosedImage: null,
  };

  public componentDidMount() {
    this.fetchData();
  }

  public componentWillReceiveProps(nextProps: RouteComponentProps<IRouteParams>) {
    const { id } = nextProps.match.params;
    id !== this.props.match.params.id && this.safeSetState({
      details: null,
      initialDetails: null,
      choosedImage: null,
    }, () => this.fetchData(id));
  }

  private fetchData = async (id? : string) => {
    
    const result = await ProductController.Details(this.props.productId || this.props.match.params.id);

    if (result.success) {
      result.data.priceAmounts = result.data.priceAmounts.sort((first, second) => second.fromCount - first.fromCount);
      !result.data.images.length && window.routerHistory.push(ROUTES.HOME.MAIN);

      this.safeSetState({
        details: result.data,
        initialDetails: result.data,
        choosedImage: result.data.images[0]._id,
      });
    }
  }

  private changeImage = (id: string) => this.safeSetState({ choosedImage: id });
  private updateDetails = (details: IProduct, checkAttributes?: boolean) => {
    if (this.state.details) {
      const newDetails = {...details};
      if (checkAttributes) {
        const { attributes } = this.state.details;
        if (attributes) {
          const attributesKeys = Object.keys(attributes);
          attributesKeys.map(item => {
            attributes[item].options.map(option => {
              if (details.attributes) {
                const newAttribute = details.attributes[item];
                option.disabled = !newAttribute.options.find(newOption => newOption._id === option._id);  
              }
            });
          });
        }
        
        newDetails.attributes = attributes;  
      }
      this.safeSetState({ details: newDetails });
    }
  }

  public render() {
    const { details, initialDetails, choosedImage } = this.state;
    return (
      <section className={`P-product-details-page ${this.props.match.params.id ? "G-page" : ""}`}>
        {details && initialDetails ?
           <>

          {choosedImage && <Images details={details} currentImage={choosedImage} onChange={this.changeImage} />}
          <Actions
            details={details}
            initialDetails={initialDetails}
            onDetailsUpdate={this.updateDetails}
            onImageChange={this.changeImage}
          />
          <Info details={details} />
          <Similar opacity={this.props.opacity || false} details={details} />
        </> 
        
        : null}
         {/* <PageLoader /> */}
      </section>
    );
  }
};

export default withRouter(Details);