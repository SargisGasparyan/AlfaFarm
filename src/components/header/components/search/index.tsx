import * as React from 'react';

import Settings from 'platform/services/settings';
import ProductController, { IProductSearchItem } from 'platform/api/product';
import Connection from 'platform/services/connection';

import HelperComponent from 'platform/classes/helper-component';

import './style.scss';

interface IState {
  search: string;
  products: IProductSearchItem[];
  open: boolean,
};

interface IProps {
  onSearch?(): void;
};

class Search extends HelperComponent<IProps, IState> {

  public state: IState = {
    search: '',
    products: [],
    open: true,
  };


  public render() {

    return (
      <form  className="P-header-search">
        <input
          className="G-main-input"
          placeholder={Settings.translations.search}
        />
        
        <button>
          <i className="icon-Group-5502" />
        </button>
      </form>
    );
  }
}

export default Search;