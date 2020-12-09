import * as React from 'react';
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
  return (
    <div className="P-empty-state">
      <div>
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
