import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Settings from 'platform/services/settings';

import HelperComponent from 'platform/classes/helper-component';

import './style.scss';
import HelperPureComponent from 'platform/classes/helper-pure-component';
import LoaderContent from 'components/loader-content';

interface IState {
  search: string;
};

interface IProps extends RouteComponentProps<any> {
  withSubmit?: boolean;
  disableRemoveOnNavigate?: boolean;
  loading?: boolean;
  onClick?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onFocus?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onBlur?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onChange?(value: string): void;
  onSubmit?(value: string): void;
};

class SearchInput extends HelperPureComponent<IProps, IState> {

  public state: IState = {
    search: '',
  };
  public componentDidUpdate = (prevProps: any) => {
    if (!prevProps.disableRemoveOnNavigate) {
      if (prevProps.location.pathname !== this.props.location.pathname || prevProps.location.search !== this.props.location.search) {
        this.removeText()
      }
    }
  }

  private change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    
    this.safeSetState({ search: e.currentTarget.value });
    onChange && onChange(e.currentTarget.value);
  }

  private removeText = () => {
    const { onChange } = this.props;
    
    this.safeSetState({ search: '' });
    onChange && onChange('');
  }

  private submit = (e: React.SyntheticEvent) => {
    const { search } = this.state;
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit && onSubmit(search);
  }

  public render() {
    const { withSubmit, loading, onClick, onFocus, onBlur } = this.props;
    const { search } = this.state;

    return (
      <form  className={`P-search-input ${withSubmit ? 'P-search-input-submit' : ''}`}>
        <input
          className="G-main-input"
          value={search}
          placeholder={Settings.translations.search}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={this.change}
        />
        {search && <span className="P-remove-text" onClick={this.removeText}>
          <i className="icon-Group-5032" />
        </span>}
        
        {withSubmit && <button type="button" onClick={this.submit}>
          <LoaderContent color="#F26D26" loading={loading} className="G-form-button"><i className="icon-Group-5502" /></LoaderContent>
        </button>}
      </form>
    );
  }
}

export default withRouter(SearchInput);