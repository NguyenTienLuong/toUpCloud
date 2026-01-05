// ===============================================
// Location: src/pages/Employee/hooks/useEmployee.js
// ===============================================

import { useState, useEffect, useMemo } from "react";
import { message } from "antd";
import { employeeApi } from "../../../api/employeeApi";
import { useAuth } from "../../../context/AuthContext";

export const useEmployee = () => {
  // ==================== AUTH CONTEXT ====================
  const {
    user,
    isSuperAdmin,
    isBranchAdmin,
    isViewingBranch,
    getCurrentBranch,
  } = useAuth();

  // ==================== STATE ====================
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ==================== GET CURRENT BRANCH ID ====================
  const currentBranchId = useMemo(() => {
    const branch = getCurrentBranch();
    const branchId = branch?.id ? parseInt(branch.id, 10) : null;

    console.log("Current viewing branch details:", {
      isSuperAdmin,
      isBranchAdmin,
      isViewingBranch,
      branch,
      branchId,
      type: typeof branchId,
    });

    return branchId;
  }, [user, getCurrentBranch, isSuperAdmin, isBranchAdmin, isViewingBranch]);

  // ==================== FETCH DATA ====================
  useEffect(() => {
    console.log("Fetching employees for branch_id:", currentBranchId);
    fetchEmployees();
  }, [currentBranchId, statusFilter]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const options = {};

      if (currentBranchId && typeof currentBranchId === "number") {
        options.branchId = currentBranchId;
        console.log("Filtering by branch_id:", currentBranchId);
      } else {
        console.log("Fetching all employees");
      }

      if (statusFilter !== "all") {
        options.status = statusFilter;
      }

      console.log("API call options:", options);
      const result = await employeeApi.getAllEmployees(options);

      if (result.success) {
        console.log("Employees fetched count:", result.data.length);
        if (result.data.length > 0) {
          console.log("Sample data record:", result.data[0]);
        }
        setEmployees(result.data);
      } else {
        console.error("Failed to fetch employees:", result.message);
        message.error(result.message || "Không thể tải danh sách nhân viên");
        setEmployees([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Đã xảy ra lỗi khi tải dữ liệu");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== FILTERED DATA ====================
  const filteredEmployees = useMemo(() => {
    let filtered = [...employees];

    if (activeRole !== "all") {
      const roleMap = {
        manager: "Quản lý",
        baker: "Thợ làm bánh",
        sales: "Bán hàng",
      };
      filtered = filtered.filter((emp) => emp.role === roleMap[activeRole]);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((emp) => {
        const name = emp.name?.toLowerCase() || "";
        const email = emp.email?.toLowerCase() || "";
        const id = emp.employee_id?.toString() || "";
        return (
          name.includes(query) || email.includes(query) || id.includes(query)
        );
      });
    }

    return filtered;
  }, [employees, activeRole, searchQuery]);

  // ==================== STATS ====================
  const stats = useMemo(() => {
    return {
      total: employees.length,
      active: employees.filter((e) => e.status === "Đang làm việc").length,
      inactive: employees.filter((e) => e.status === "Nghỉ việc").length,
    };
  }, [employees]);

  // ==================== ROLE COUNT ====================
  const roleCount = (roleId) => {
    if (roleId === "all") return employees.length;

    const roleMap = {
      manager: "Quản lý",
      baker: "Thợ làm bánh",
      sales: "Bán hàng",
    };

    return employees.filter((e) => e.role === roleMap[roleId]).length;
  };

  // ==================== CRUD OPERATIONS ====================
  const addEmployee = async (employeeData) => {
    try {
      console.log("Adding employee process:", employeeData);

      const dataToSubmit = {
        ...employeeData,
        branch_id: parseInt(employeeData.branch_id, 10),
      };

      if (isBranchAdmin && currentBranchId) {
        dataToSubmit.branch_id = currentBranchId;
      }

      if (isSuperAdmin && isViewingBranch && currentBranchId) {
        dataToSubmit.branch_id = dataToSubmit.branch_id || currentBranchId;
      }

      console.log("Data to submit:", dataToSubmit);

      const result = await employeeApi.addEmployee(dataToSubmit);

      if (result.success) {
        message.success(result.message || "Thêm nhân viên thành công");
        await fetchEmployees();
        return { success: true };
      } else {
        message.error(result.message || "Không thể thêm nhân viên");
        return { success: false };
      }
    } catch (error) {
      console.error("Add employee error:", error);
      message.error("Đã xảy ra lỗi khi thêm nhân viên");
      return { success: false };
    }
  };

  const updateEmployee = async (employeeId, employeeData) => {
    try {
      console.log("Updating employee process:", employeeId, employeeData);

      const dataToSubmit = {
        ...employeeData,
        branch_id: parseInt(employeeData.branch_id, 10),
      };

      const result = await employeeApi.updateEmployee(employeeId, dataToSubmit);

      if (result.success) {
        message.success(result.message || "Cập nhật nhân viên thành công");
        await fetchEmployees();
        return { success: true };
      } else {
        message.error(result.message || "Không thể cập nhật nhân viên");
        return { success: false };
      }
    } catch (error) {
      console.error("Update employee error:", error);
      message.error("Đã xảy ra lỗi khi cập nhật nhân viên");
      return { success: false };
    }
  };

  const deleteEmployee = async (employeeId, employeeName) => {
    try {
      console.log("Deleting employee ID:", employeeId);

      const result = await employeeApi.deleteEmployee(employeeId);

      if (result.success) {
        message.success(`Đã xóa nhân viên "${employeeName}"`);
        await fetchEmployees();
        return { success: true };
      } else {
        message.error(result.message || "Không thể xóa nhân viên");
        return { success: false };
      }
    } catch (error) {
      console.error("Delete employee error:", error);
      message.error("Đã xảy ra lỗi khi xóa nhân viên");
      return { success: false };
    }
  };

  // ==================== HEADER TEXT ====================
  const getHeaderTitle = () => {
    const branch = getCurrentBranch();
    if (branch) {
      return `Nhân viên - ${branch.name}`;
    }
    return "Quản lý nhân viên";
  };

  const getHeaderSubtitle = () => {
    const branch = getCurrentBranch();
    if (branch) {
      return `Danh sách ${stats.total} nhân viên tại chi nhánh này`;
    }
    return `Quản lý ${stats.total} nhân viên trên toàn hệ thống`;
  };

  // ==================== HANDLERS ====================
  const handleRoleChange = (roleId) => {
    setActiveRole(roleId);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // ==================== RETURN ====================
  return {
    // Data
    employees,
    filteredEmployees,
    stats,

    // State
    loading,
    activeRole,
    statusFilter,
    searchQuery,
    currentPage,

    // CRUD
    addEmployee,
    updateEmployee,
    deleteEmployee,

    // Helpers
    roleCount,
    getHeaderTitle,
    getHeaderSubtitle,

    // Setters & Handlers
    setCurrentPage,
    handleRoleChange,
    handleStatusChange,
    handleSearchChange,

    // Auth info
    isSuperAdmin,
    isBranchAdmin,
    currentBranchId,
  };
};