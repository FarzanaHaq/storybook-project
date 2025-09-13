import React, { useState } from 'react';
import DataTable from './DataTable';
import type { Column, DataTableProps } from './DataTable.types';
import type { Meta, StoryFn } from '@storybook/react-vite';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const mockData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-16' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-01-12' },
];
const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    ),
  },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

const Template: StoryFn<DataTableProps<User>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  
  return (
    <div>
      <DataTable {...args} onRowSelect={setSelectedRows} />
      {selectedRows.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Rows ({selectedRows.length}):</h3>
          <pre className="text-sm">{JSON.stringify(selectedRows, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: mockData,
  columns,
};

export const WithSelection = Template.bind({});
WithSelection.args = {
  data: mockData,
  columns,
  selectable: 'multiple',
};

export const SingleSelection = Template.bind({});
SingleSelection.args = {
  data: mockData,
  columns,
  selectable: 'single',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  data: [],
  columns,
  loading: true,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
  columns,
  emptyText: 'No users found. Try adjusting your search filters.',
};

export const CustomRowKey = Template.bind({});
CustomRowKey.args = {
  data: mockData,
  columns,
  rowKey: 'email',
};

const statusOrder = { active: 1, inactive: 2 };
const customColumns: Column<User>[] = [
  ...columns,
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'id',
    align: 'center',
    render: (value: number) => (
      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
        Edit
      </button>
    ),
  },
];

export const CustomRendering = Template.bind({});
CustomRendering.args = {
  data: mockData,
  columns: customColumns,
};