import * as React from 'react';

import ClickOutside from '../click-outside';
import { IDropdownOption } from 'platform/constants/interfaces';
import Settings from 'platform/services/settings';
import { DropdownNameFunctionType } from 'platform/constants/types';
import HelperPureComponent from 'platform/classes/helper-pure-component';

import './style.scss';

interface IState<Value> {
  isOpen: boolean;
  value: IDropdownOption<Value> | null;
};

interface IProps<Value> {
  placeholderOpacity?: boolean;
  changable?: boolean;
  placeholder?: React.ReactChild | string;
  onNewClick?(e: React.MouseEvent<HTMLLIElement>): void;
  className?: string;
  emptyText?: string;
  onChange?(value: IDropdownOption<Value> | null): void;
  withNew?: boolean;
  defaultValue?: Value;
  useValue?: boolean;
  value?: Value | null;
  options: Array<IDropdownOption<Value>>;
  clear?: boolean;
};

class Select<Value extends string | number | null | {}> extends HelperPureComponent<IProps<Value>, IState<Value>> {

  public state: IState<Value> = {
    isOpen: false,
    value: null,
  }

  public static defaultProps = {
    placeholder: 'Select...',
    className: '',
    onChange: null,
    onNewClick: null,
    withNew: false,
    changable: true,
    useValue: false,
    value: null,
    options: [],
  }

  public componentDidMount() {
    
    let value: IDropdownOption<string | number | null | {}> | null = null;
    this.props.options.map(item => {
      if (!value && item.value === this.props.defaultValue) {
        value = item;
      }
      return true;
    });

    if (value) this.safeSetState({ value });
  }

  private toggleState = (isOpen: boolean) => this.safeSetState({ isOpen });

  private chooseItem = (item: IDropdownOption<Value>) => {
    const { onChange, changable } = this.props;
    this.safeSetState({ value: !changable ? item : null, isOpen: false });
    onChange && onChange(item || null);
  }

  private clearValue = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { onChange } = this.props;
    this.safeSetState({ value: null, isOpen: false });
    onChange && onChange(null);
  }

  private Options = () => {
    const { options, withNew, onNewClick, emptyText } = this.props;
    const option = this.getCurrentValue();
    const showingOptions = options.filter(item => option ? item.value !== option.value : item.value !== '//cr');

    // const elem = options.find(item => item.value === 6);
    // const elemIndex = options.findIndex(item => item.value === 6);

    // if (elem) {
    //   options[elemIndex] = options[0];
    //   options[0] = elem;
    // }

    return <ul className="P-select-body">
      {showingOptions.length ? showingOptions.map((item, index) => <li
        key={typeof item.value === 'number' ? item.value : index}
        onClick={() => this.chooseItem(item)}
        title={typeof item.name === 'string' ? item.name : undefined}
      >{typeof item.name === 'function' ? (item.name as DropdownNameFunctionType)() : item.name}</li>) : <li className="P-select-empty-label">{emptyText || Settings.translations.no_options}</li>}
      {withNew && <li className="P-select-new-label" onClick={onNewClick && onNewClick}>{Settings.translations.new}</li>}      
    </ul>
  }

  private getCurrentValue = () => {
    const { useValue, options } = this.props;
    return useValue ? options.find(item => item.value === this.props.value) : this.state.value;
  }

  public render() {
    const {
      placeholderOpacity,
      changable,
      placeholder,
      className,
      clear,
    } = this.props;
    const { isOpen } = this.state;
    const value = this.getCurrentValue();
    

    return (
      <ClickOutside className={className} onClickOutside={() => this.toggleState(false)}>
        <div className="P-select">
          <div className={`P-select-header${isOpen ? ' P-select-open' : ''}`} onClick={() => this.toggleState(!isOpen)} title={value && changable && typeof value.name === 'string' ? value.name : undefined}>
            <span className={!value && placeholderOpacity ? 'P-select-placeholder' : ''}>{value && changable ? value.name : placeholder}</span>
            {clear && value && <i className="icon-close" onClick={this.clearValue} />}
            <i className="icon-Group-5504" />
          </div>
          {isOpen &&  <this.Options />}
        </div>
      </ClickOutside>
    );
  }
}

export default Select;
