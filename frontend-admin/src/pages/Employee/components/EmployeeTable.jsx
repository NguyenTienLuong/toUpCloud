// ===============================================
// Location: src/pages/Employee/components/EmployeeTable.jsx
// ===============================================
import React from "react";
import { Tag, Space, Button, Tooltip } from "antd";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import DataTable from "../../../components/Table/Table";
import {
  formatCurrency,
  getRoleColor,
  getBranchName,
} from "../utils/employeeConstants";

const EmployeeTable = ({
  employees,
  loading,
  branches,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "employee_id",
      key: "employee_id",
      width: 80,
      align: "center",
      fixed: "left",
      render: (id) => (
        <span style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>
          {id}
        </span>
      ),
    },
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (name) => (
        <span style={{ fontWeight: "600", color: "#1e293b", fontSize: "14px" }}>
          {name}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
      render: (email) => (
        <span style={{ color: "#475569", fontSize: "13px" }}>{email}</span>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 150,
      align: "center",
      render: (role) => (
        <Tag
          color={getRoleColor(role)}
          style={{ fontWeight: "600", fontSize: "13px" }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      width: 150,
      align: "right",
      render: (salary) => (
        <span style={{ fontWeight: "600", color: "#059669", fontSize: "14px" }}>
          {formatCurrency(salary)}
        </span>
      ),
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch_id",
      key: "branch_id",
      width: 200,
      render: (branchId) => (
        <span style={{ color: "#64748b", fontSize: "13px" }}>
          {getBranchName(branchId, branches)}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      align: "center",
      render: (status) => (
        <Tag color={status === "Đang làm việc" ? "success" : "default"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<FiEdit2 />}
              onClick={() => onEdit(record)}
              style={{ color: "#3b82f6" }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<FiTrash2 />}
              onClick={() => onDelete(record)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={employees}
      loading={loading}
      pagination={pagination}
      onChange={onPageChange}
      rowKey="employee_id"
      scroll={{ x: 1400 }}
      emptyText="Không có nhân viên nào"
    />
  );
};

export default EmployeeTable;