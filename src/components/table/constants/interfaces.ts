import { TableCellType } from './types';

export interface ITableColumnConfig<Data extends object> {
  cell(row: Data, index: number): TableCellType;
  wrapperClass?(row: Data, index?: number): string;
  className?: string;
  name?: string | number | HTMLElement | React.ReactNode;
  style?: React.CSSProperties;
};
