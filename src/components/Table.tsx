import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import type { Column } from "./DataTable/DataTable.types";
import DataTable from "./DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}


const Table = () => {

 const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      joinDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "inactive",
      joinDate: "2024-01-10",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "active",
      joinDate: "2024-01-16",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Viewer",
      status: "inactive",
      joinDate: "2024-01-12",
    },
  ]);

  // Define columns
  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Full Name",
      dataIndex: "name",
      sortable: true,
      width: 200,
    },
    {
      key: "email",
      title: "Email Address",
      dataIndex: "email",
      sortable: true,
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      sortable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "joinDate",
      title: "Join Date",
      dataIndex: "joinDate",
      sortable: true,
      align: "center",
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "id",
      align: "center",
      render: (value: number, record: User) => (
        <div className="flex space-x-2">
          <button
            className="pl-1 py-1 text-[#8653D2] rounded text-[20px]"
            onClick={() => handleEdit(record)}
          >
            <FaEdit />
          </button>
          <button
            className=" py-1  text-[#8653D2] rounded text-[22px]"
            onClick={() => handleDelete(record.id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  // Handle row selection
  const handleRowSelect = (selectedRows: User[]) => {
    console.log("Selected rows:", selectedRows);
    // You can set state or perform actions with selected rows
  };

  // Example action handlers
  const handleEdit = (user: User) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Simulate loading state
  const [loading, setLoading] = useState(false);

  // Simulate data fetch
  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // You would set your data here
    }, 2000);
  };


  return (
            <div className="max-w-6xl mx-auto mt-20">
          <div className="bg-white/30 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Users List</h2>
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-[#8653D2] text-white rounded "
              >
                Refresh Data
              </button>
            </div>

            {/* DataTable Component with Props */}
            <DataTable<User>
              data={users}
              columns={columns}
              loading={loading}
              selectable="multiple"
              onRowSelect={handleRowSelect}
              emptyText="No users found. Click refresh to load data."
              className="border border-gray-200 rounded-lg"
              rowKey="id"
            />
          </div>
        </div>
  )
}

export default Table