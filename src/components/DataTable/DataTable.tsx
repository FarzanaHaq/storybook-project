import React, { useState, useMemo, useCallback } from 'react';

import { 
  TABLE_CLASSES, 
  CHECKBOX_CLASSES, 
  EMPTY_STATE_MESSAGES,
  LOADING_CONFIG 
} from './DataTable.constants';
import type { DataTableProps, SelectionState, SortConfig } from './DataTable.types';

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyText = EMPTY_STATE_MESSAGES.DEFAULT,
  className = '',
  rowKey = 'id' as keyof T,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedRows: new Set(),
    selectAll: false,
  });

  // Get unique row identifier
  const getRowKey = useCallback((record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? index;
  }, [rowKey]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      if (aValue == null) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (bValue == null) return sortConfig.direction === 'ascending' ? 1 : -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Handle sort
  const handleSort = useCallback((key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return { key, direction: 'ascending' };
    });
  }, []);

  // Handle row selection
  const handleRowSelect = useCallback((rowKey: string | number) => {
    setSelectionState(prev => {
      const newSelectedRows = new Set(prev.selectedRows);
      
      if (selectable === 'single') {
        newSelectedRows.clear();
        newSelectedRows.add(rowKey);
      } else if (selectable === 'multiple') {
        if (newSelectedRows.has(rowKey)) {
          newSelectedRows.delete(rowKey);
        } else {
          newSelectedRows.add(rowKey);
        }
      }

      const newState = {
        selectedRows: newSelectedRows,
        selectAll: newSelectedRows.size === data.length && data.length > 0,
      };

      // Notify parent component
      if (onRowSelect) {
        const selectedRecords = data.filter(record => 
          newSelectedRows.has(getRowKey(record, data.indexOf(record)))
        );
        onRowSelect(selectedRecords);
      }

      return newState;
    });
  }, [data, selectable, onRowSelect, getRowKey]);

  // Handle select all
  const handleSelectAll = useCallback(() => {
    setSelectionState(prev => {
      const newSelectAll = !prev.selectAll;
      const newSelectedRows = new Set<string | number>();

      if (newSelectAll) {
        data.forEach((record, index) => {
          newSelectedRows.add(getRowKey(record, index));
        });
      }

      const newState = {
        selectedRows: newSelectedRows,
        selectAll: newSelectAll,
      };

      // Notify parent component
      if (onRowSelect) {
        const selectedRecords = newSelectAll ? data : [];
        onRowSelect(selectedRecords);
      }

      return newState;
    });
  }, [data, onRowSelect, getRowKey]);

  // Check if row is selected
  const isRowSelected = useCallback((record: T, index: number) => {
    return selectionState.selectedRows.has(getRowKey(record, index));
  }, [selectionState.selectedRows, getRowKey]);

  // Render cell content
  const renderCellContent = useCallback((column: Column<T>, record: T, index: number) => {
    const value = record[column.dataIndex];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return value != null ? String(value) : '—';
  }, []);

  // Render loading skeleton
  const renderLoadingSkeleton = useMemo(() => {
    return Array.from({ length: LOADING_CONFIG.SKELETON_ROWS }, (_, rowIndex) => (
      <tr key={rowIndex} className={TABLE_CLASSES.loadingRow}>
        {selectable && (
          <td className={TABLE_CLASSES.td}>
            <div className={`${TABLE_CLASSES.skeleton} w-4 h-4`} />
          </td>
        )}
        {columns.map((column, colIndex) => (
          <td key={column.key} className={TABLE_CLASSES.td}>
            <div
              className={TABLE_CLASSES.skeleton}
              style={{ 
                width: LOADING_CONFIG.SKELETON_WIDTHS[
                  colIndex % LOADING_CONFIG.SKELETON_WIDTHS.length
                ] 
              }}
            />
          </td>
        ))}
      </tr>
    ));
  }, [columns, selectable]);

  // Render empty state
  const renderEmptyState = useMemo(() => (
    <tr>
      <td 
        colSpan={columns.length + (selectable ? 1 : 0)} 
        className="px-6 py-12 text-center text-gray-500"
      >
        {loading ? EMPTY_STATE_MESSAGES.LOADING : emptyText}
      </td>
    </tr>
  ), [columns.length, selectable, loading, emptyText]);

  return (
    <div className={`${TABLE_CLASSES.container} ${className}`}>
      <table className={TABLE_CLASSES.table}>
        <thead className={TABLE_CLASSES.thead}>
          <tr>
            {selectable && (
              <th className={TABLE_CLASSES.th} style={{ width: '40px' }}>
                {selectable === 'multiple' && (
                  <div className={CHECKBOX_CLASSES.container}>
                    <input
                      type="checkbox"
                      checked={selectionState.selectAll}
                      onChange={handleSelectAll}
                      className={`${CHECKBOX_CLASSES.input} ${
                        selectionState.selectAll && selectionState.selectedRows.size < data.length
                          ? CHECKBOX_CLASSES.indeterminate
                          : ''
                      }`}
                      aria-label="Select all rows"
                    />
                  </div>
                )}
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                className={`${TABLE_CLASSES.th} ${
                  column.sortable ? TABLE_CLASSES.thSortable : ''
                } ${sortConfig?.key === column.key ? TABLE_CLASSES.thSorted : ''}`}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                  cursor: column.sortable ? 'pointer' : 'default',
                }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center justify-between">
                  <span>{column.title}</span>
                  {column.sortable && sortConfig?.key === column.key && (
                    <span className="ml-2">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            renderLoadingSkeleton
          ) : sortedData.length === 0 ? (
            renderEmptyState
          ) : (
            sortedData.map((record, index) => {
              const key = getRowKey(record, index);
              const isSelected = isRowSelected(record, index);
              
              return (
                <tr
                  key={key}
                  className={`${TABLE_CLASSES.tr} ${isSelected ? TABLE_CLASSES.trSelected : ''}`}
                  onClick={() => selectable && handleRowSelect(key)}
                >
                  {selectable && (
                    <td className={TABLE_CLASSES.td}>
                      <div className={CHECKBOX_CLASSES.container}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelect(key)}
                          className={CHECKBOX_CLASSES.input}
                          onClick={e => e.stopPropagation()}
                          aria-label={`Select row ${index + 1}`}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={TABLE_CLASSES.td}
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {renderCellContent(column, record, index)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;