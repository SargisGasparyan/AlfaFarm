import * as React from 'react';
import { IProductListItem } from 'platform/api/product';
import Settings from 'platform/services/settings';
import Pricing from './components/pricing';
import './style.scss';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import Modal from 'react-modal';
import Details from '../../pages/details/index';

interface IProps {
  product: IProductListItem;
  opacity?: boolean;
};

interface IState {
  modal: boolean,
  isOpened?: boolean
};

class ProductItem extends HelperPureComponent<IProps, IState> {
  public state = {
    modal: false,
    isOpened: false
  }
  
  public componentDidMount() {
    window.addEventListener('popup', (e: CustomEvent)=>{
      this.safeSetState({modal: e.detail});
    })
  }
  public onClose = () => {
    this.safeSetState({ modal: false, isOpened: false })
    document.body.style.overflow = 'auto';
    window.dispatchEvent(new CustomEvent('popup', { detail: false }));
  }
  public onOpen = () => {
      this.safeSetState({ modal: true, isOpened: true })
      document.body.style.overflow = 'hidden';
  }

  public render() {
    const { product } = this.props;
    const { modal } = this.state;

    return <>
      <div className="P-product-item" onClick={this.onOpen}>
        {!!product.maxDiscount && <span className="G-discount-label">{product.sameDiscount ? '-' : <i className="icon-back" />}{product.maxDiscount}%</span>}
        <div style={{ background: `url(${product.imagePath}) center/contain no-repeat` }} className="P-image" />
        <h3>{product.name}</h3>
        <Pricing details={product} />
        {(!!product.minBonus || !!product.preparingDayCount) && <h4>
          {!!product.minBonus && <>
            <span className="G-info-span">i</span>
            <span className="P-bonus-text">{product.minBonus === product.maxBonus ? `${product.minBonus}%` : `${product.minBonus}-${product.maxBonus} %`}</span>
          </>}
          {!!product.preparingDayCount && <><i className="icon-products P-preparing-days" /> {product.preparingDayCount} {Settings.translations.days}</>}
        </h4>}
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={this.onClose}
        style={{
          overlay: {
            backgroundColor: this.props.opacity ? 'transparent' : 'rgba(0,0,0,.5)'
          },
          content: {
            padding: "30px",
            height: "90%",
            width: "85%",
            display: "flex",
            flexDirection: "column",
          }
        }}
      >
        <Details opacity={this.state.isOpened} productId={product._id}/>
      </Modal>
    </>
  }

}

export default ProductItem;


