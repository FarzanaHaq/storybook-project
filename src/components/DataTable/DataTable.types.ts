import type { ReactNode } from "react";


export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: 'single' | 'multiple' | false;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyText?: string;
  className?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

export interface SortConfig {
  key: string;
  direction: 'ascending' | 'descending';
}

export interface SelectionState {
  selectedRows: Set<string | number>;
  selectAll: boolean;
}