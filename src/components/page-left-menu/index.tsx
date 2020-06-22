import * as React from 'react';

import './style.scss';

export interface ILeftMenuItem {
  display: string;
  value: string | number;
};

interface IProps {
  items: ILeftMenuItem[];
  className?: string;
  defaultChosen?: string | number | null;
  onChange(choosed: string | number): void;
};

const PageLeftMenu = ({ items, onChange, className, defaultChosen }: IProps) => {
  const [choosed, setChoosed] = React.useState<string | number>(defaultChosen || items[0] && items[0].value);
  const chosenIndex = defaultChosen ? items.findIndex(item => item.value === defaultChosen) : 0;
  const [choosedIndex, setChoosedIndex] = React.useState<number>(chosenIndex || 0);

  React.useEffect(() => {
    setChoosedIndex(chosenIndex)

    if (sessionStorage.getItem('activeTab') === 'Completed') {
      setChoosed(items[1].value);
      setChoosedIndex(1);
    }
    if (sessionStorage.getItem('activeTab') === 'Active') {
      setChoosed(items[0].value);
      setChoosedIndex(0);
    }
  }, [items, choosedIndex]);

  const changeTab = (value: string | number, index: number) => {    
    if (choosed !== value) {
      setChoosed(value);
      setChoosedIndex(index);
      onChange(value);
    }
  }

  return (
    <aside className={`P-page-left-tabs ${className || ''}`}>
      <span style={{ top: choosedIndex + 1 > items.length ? (items.length - 1) * 50 : choosedIndex * 50 }} />
      {items.map((item, index) => (
        <h3
          key={item.value}
          title={item.display}
          onClick={() => changeTab(item.value, index)}
          className={choosed === item.value ? 'P-choosed' : ''}
        >{item.display}</h3>
      ))}
    </aside>
  );
};

export default React.memo(PageLeftMenu);