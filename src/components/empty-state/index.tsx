import * as React from 'react';
import './style.scss';
import Lottie from 'react-lottie';

interface IProps {
  buttonText?: string;
  iconClass?: string;
  text: string;
  height?: number;
  width?: number;
  animationData: {};
  onClick?(e: React.SyntheticEvent): void;
  animation?: { [key: string]: any };
};



const EmptyState = React.memo(({ buttonText, text, animationData, onClick, height , width }: IProps) => {
  const def = 'default';

  const buttonStyle = {
    display: 'block',
    margin: '10px auto'
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData[def],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="P-empty-state">
      <div className="P-empty-state-align">
        <div className='P-empty-list'>
        <Lottie options={defaultOptions} height={height ? height : 150} width={width ? width : 150}/>
          <p className='P-desc'>{text}</p>
        </div>
        {buttonText && <button onClick={onClick}>{buttonText}</button>}
      </div>
    </div>
  );
})

export default EmptyState;
