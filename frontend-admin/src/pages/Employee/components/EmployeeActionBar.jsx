// ===============================================
// Location: src/pages/Employee/components/EmployeeActionBar.jsx
// ===============================================
import React from "react";
import { FiSearch, FiDownload, FiPlus } from "react-icons/fi";
import { ROLE_TABS } from "../utils/employeeConstants";

const EmployeeActionBar = ({
  activeRole,
  searchQuery,
  roleCount,
  employees,
  loading,
  loadingBranches,
  branchError,
  onRoleChange,
  onSearchChange,
  onExport,
  onAdd,
}) => {
  return (
    <div className="tabs-action-bar">
      {/* Role Tabs */}
      <div className="role-tabs">
        {ROLE_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`role-tab ${activeRole === tab.id ? "active" : ""}`}
            onClick={() => onRoleChange(tab.id)}
          >
            {tab.label} <span className="tab-count">({roleCount(tab.id)})</span>
          </div>
        ))}
      </div>

      {/* Right Actions */}
      <div className="right-actions">
        {/* Search Box */}
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo tên, email, ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Export Button */}
        <button
          className="export-btn"
          onClick={onExport}
          disabled={employees.length === 0 || loading}
        >
          <FiDownload />
          Export
        </button>

        {/* Add Button */}
        <button
          className="add-btn"
          onClick={onAdd}
          disabled={loading || loadingBranches || branchError !== null}
        >
          <FiPlus />
          Thêm nhân viên
        </button>
      </div>
    </div>
  );
};

export default EmployeeActionBar;