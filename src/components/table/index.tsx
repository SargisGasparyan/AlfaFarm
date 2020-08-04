import * as React from 'react';
import { Link }   from 'react-router-dom';
import CheckBox from 'rc-checkbox';

import { ITableColumnConfig } from './constants/interfaces';

import './style.scss';

interface IProps<Data extends object> {
  onRowClick?(row: Data, index?: number): void;
  rowClassname?(row: Data, index?: number): string;
  hoverButtons?(row: Data, index?: number): HTMLElement | React.ReactNode;
  columnConfig: ITableColumnConfig<Data>[];
  useCheckbox?(row: Data, index?: number): boolean;
  checkBoxState?(row: Data, index?: number): boolean;
  data: Data[];
  redirectUrl?(row: Data, index?: number): string;
};

class Table<Data extends { id: number }> extends React.Component<IProps<Data>, {}> {

  public static defaultProps = {
    onRowClick: null,
    hoverButtons: null,
  }

  private getRowTitle = (column: ITableColumnConfig<Data>, item: Data, index: number) => {
    const value = column.cell(item, index);
    if (typeof value === 'string' ||
        typeof value === 'number') return value.toString();

    return;
  }

  public render() {
    const { columnConfig, data, onRowClick, redirectUrl, hoverButtons, rowClassname, useCheckbox, checkBoxState } = this.props;
    const Row = redirectUrl ? Link : 'ul';

    return (
      <div className="P-data-table">
        <this.Header />
        {!!data && <div className="P-data-table-body">
          {data.map((item, rowIndex) => 
            <Row
              to={redirectUrl ? redirectUrl(item, rowIndex) : ''}
              onClick={() => onRowClick && onRowClick(item, rowIndex)}
              key={item.id + '' + rowIndex}
              className={`
                ${rowClassname ? rowClassname(item, rowIndex) : ''}
                ${(useCheckbox && useCheckbox(item)) || (!useCheckbox && onRowClick) ? 'P-pointer' : ''}
              `}>

              {(useCheckbox && useCheckbox(item, rowIndex)) && <span className="P-table-checkbox">
                <CheckBox checked={checkBoxState ? checkBoxState(item, rowIndex) : false} />
              </span>}

              {columnConfig.map((childItem, index) => <li
                key={index}
                title={this.getRowTitle(childItem, item, rowIndex)}
                style={childItem.style || {}}
              >
                <div className={childItem.wrapperClass && childItem.wrapperClass(item, rowIndex)}>
                  {childItem.cell(item, rowIndex)}
                </div>
              </li>)}

              <li className="P-data-table-actions">{hoverButtons && hoverButtons(item, rowIndex)}</li>
            </Row>
          )}
        </div>}
      </div>
    );
  }

  private Header = () => {
    const { columnConfig } = this.props;

    return <ul className="P-data-table-header">
      {columnConfig.map((item, index) => <li
        title={item.name as string}
        className={item.className}
        key={index}
        style={item.style || {}}
      >{item.name}</li>)}
    </ul>;
  }
}

export default Table;
