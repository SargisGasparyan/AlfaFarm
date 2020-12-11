import * as React from 'react';

import Settings from 'platform/services/settings';

import HelperComponent from 'platform/classes/helper-component';

import './style.scss';
import HelperPureComponent from 'platform/classes/helper-pure-component';

interface IState {
  search: string;
};

interface IProps {
  withSubmit?: boolean;
  onChange?(value: string): void;
  onSubmit?(value: string): void;
};

class SearchInput extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    search: '',
  };

  private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    
    this.safeSetState({ search: e.currentTarget.value });
    onChange && onChange(e.currentTarget.value);
  }

  private submit = (e: React.SyntheticEvent) => {
    const { search } = this.state;
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit && search && onSubmit(search.trim());
  }

  public render() {
    const { withSubmit } = this.props;

    return (
      <form  className={`P-search-input ${withSubmit ? 'P-search-input-submit' : ''}`}>
        <input
          className="G-main-input"
          placeholder={Settings.translations.search}
          onChange={this.change}
        />
        
        {withSubmit && <button onClick={this.submit}>
          <i className="icon-Group-5502" />
        </button>}
      </form>
    );
  }
}

export default SearchInput;