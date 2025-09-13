export const SORT_DIRECTION = {
  ASC: 'ascending',
  DESC: 'descending',
} as const;

export const SELECTION_TYPE = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  NONE: false,
} as const;

export const LOADING_CONFIG = {
  SKELETON_ROWS: 5,
  SKELETON_WIDTHS: [60, 120, 80, 100, 140],
};

export const EMPTY_STATE_MESSAGES = {
  DEFAULT: 'No data available',
  LOADING: 'Loading...',
  FILTERED: 'No matching records found',
};

export const TABLE_CLASSES = {
  container: 'w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm',
  table: 'w-full border-collapse',
  thead: 'bg-white/30',
  th: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors bg-white/10',
  thSortable: 'hover:bg-gray-100',
  thSorted: 'bg-gray-100',
  td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-t border-gray-200',
  tr: 'transition-colors hover:bg-gray-50',
  trSelected: 'bg-blue-50 hover:bg-blue-100',
  loadingRow: 'animate-pulse',
  skeleton: 'bg-gray-200 rounded h-4',
};

export const CHECKBOX_CLASSES = {
  container: 'flex items-center',
  input: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500',
  indeterminate: 'text-blue-600 bg-blue-100 border-blue-300',
};