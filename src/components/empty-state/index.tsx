import * as React from 'react';
// import Lottie from 'react-lottie';

import './style.scss';
import EmptyViewSvg from "../../assets/images/emptyView.svg";

interface IProps {
  buttonText?: string;
  iconClass?: string;
  text: string;
  onClick?(e: React.SyntheticEvent): void;
  animation?: { [key: string]: any };
};

const EmptyState = React.memo(({ buttonText, text, onClick }: IProps) => {
  // const animConfig = animation ? {
  //   loop: true,
  //   autoPlay: true,
  //   animationData: animation.default,
  // } : null;

  return (
    <div className="P-empty-state">
      <div>
        {/* {animConfig ? <Lottie options={animConfig} isClickToPauseDisabled={true}/> : <i className={iconClass} />} */}
        <div className='G-no-data'>
          <img src={EmptyViewSvg} alt="empty"/>
          <p className='P-desc'>{text}</p>
        </div>
        {buttonText && <button onClick={onClick}>{buttonText}</button>}
      </div>
    </div>
  );
})

export default EmptyState;
