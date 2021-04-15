import * as React from 'react';
import './style.scss';
import Lottie from 'react-lottie';

interface IProps {
  buttonText?: string;
  iconClass?: string;
  text: string;
  animationData: {};
  onClick?(e: React.SyntheticEvent): void;
  animation?: { [key: string]: any };
};



const EmptyState = React.memo(({ buttonText, text, animationData, onClick }: IProps) => {
  const buttonStyle = {
    display: 'block',
    margin: '10px auto'
  };
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData['default'],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="P-empty-state">
      <div>
        <div className='P-empty-list'>
        <Lottie options={defaultOptions} height={150} width={150}/> 
          <p className='P-desc'>{text}</p>
        </div>
        {buttonText && <button onClick={onClick}>{buttonText}</button>}
      </div>
    </div>
  );
})

export default EmptyState;
