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
  changable?: boolean;
  placeholder?: React.ReactChild | string;
  disabled?: boolean;
  onNewClick?(e: React.MouseEvent<HTMLLIElement>): void;
  className?: string;
  emptyText?: string;
  onChange?(value: IDropdownOption<Value> | null): void;
  withNew?: boolean;
  defaultValue?: Value;
  value?: Value | null;
  options: IDropdownOption<Value>[];
};

class YandexAutocomplete<Value extends string | number | null | {}> extends HelperPureComponent<IProps<Value>, IState<Value>> {

  public state: IState<Value> = {
    isOpen: false,
    value: null,
  }

  public static defaultProps = {
    className: '',
    onChange: null,
    onNewClick: null,
    withNew: false,
    changable: true,
    disabled: false,
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

  private get htmlTitle() {
    const { changable } = this.props;
    const value = this.getCurrentValue();
    return value && changable && typeof value.name === 'string' ? value.name : undefined
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

    return <ul className="P-yandex-autocomplete-body">
      {showingOptions.length ? showingOptions.map((item, index) => <li
        key={typeof item.value === 'number' ? item.value : index}
        onClick={() => this.chooseItem(item)}
        title={typeof item.name === 'string' ? item.name : undefined}
      >
        {typeof item.name === 'function' ? (item.name as DropdownNameFunctionType)() : item.name}
      </li>) : <li className="P-yandex-autocomplete-empty-label">{emptyText || Settings.translations.no_options}</li>}
      
      {withNew && <li
        className="P-yandex-autocomplete-new-label"
        onClick={onNewClick && onNewClick}
      >{Settings.translations.new}</li>}      
    </ul>;
  }

  private getCurrentValue = () => {
    const { options, value } = this.props;
    return (value || value === 0) ? options.find(item => item.value === value) : this.state.value;
  }

  public render() {
    const {
      disabled,
      className,
      placeholder,
    } = this.props;
    
    const { isOpen } = this.state;
    const value = this.getCurrentValue();

    return (
      <ClickOutside className={className} onClickOutside={() => this.toggleState(false)}>
        <div className={`P-yandex-autocomplete ${disabled ? 'P-disabled' : ''}`}>
          <div className={`P-yandex-autocomplete-header ${isOpen ? 'P-yandex-autocomplete-open' : ''}`} onClick={() => this.toggleState(!isOpen)} title={this.htmlTitle}>
            <input className="G-main-input" placeholder={`${placeholder}`} />
          </div>
          {isOpen && !disabled &&  <this.Options />}
        </div>
      </ClickOutside>
    );
  }
}

export default YandexAutocomplete;
