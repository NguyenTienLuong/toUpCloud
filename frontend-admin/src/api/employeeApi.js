// ===============================================
// src/api/employeeApi.js 
// ===============================================
import api from "./axiosConfig";

const BASE_PATH = "http://localhost:5001/api/admin/employee_management";

const mapEmployeeFromBackend = (employee) => {
  return {
    employee_id: employee.employee_id,
    name: employee.employee_name,
    role: employee.role_name,
    email: employee.email,
    salary: employee.salary,
    status: employee.status,
    branch_id: employee.branch_id,
  };
};

// ============= API FUNCTIONS =============
export const employeeApi = {
  // ============= GET ALL EMPLOYEES =============
  getAllEmployees: async (options = {}) => {
    try {
      const params = {};

      if (options.branchId) {
        params.branch_id = options.branchId;
      }

      if (options.status) {
        params.status = options.status;
      }

      const response = await api.get(`${BASE_PATH}/employee`, { params });

      const mappedData = Array.isArray(response.data)
        ? response.data.map(mapEmployeeFromBackend)
        : [];

      return {
        success: true,
        data: mappedData,
      };
    } catch (error) {
      console.error("Error fetching employees:", error);

      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.message ||
          "Lỗi khi tải danh sách nhân viên",
        data: [],
      };
    }
  },

  // ============= ADD EMPLOYEE =============
  addEmployee: async (employeeData) => {
    try {
      let branchId;

      if (!employeeData.branch_id || employeeData.branch_id === "") {
        throw new Error("Branch ID bị thiếu trong employeeData");
      }

      branchId = parseInt(String(employeeData.branch_id).trim());

      if (isNaN(branchId) || branchId <= 0) {
        throw new Error(
          `Branch ID không hợp lệ: "${employeeData.branch_id}". Vui lòng nhập số từ 1-5`
        );
      }

      if (!employeeData.password || employeeData.password.trim() === "") {
        throw new Error("Mật khẩu không được để trống");
      }

      const payload = {
        employee_id: null,
        employee_name: employeeData.name || "",
        role_name: employeeData.role || "",
        email: employeeData.email || "",
        password: employeeData.password,
        salary: parseFloat(employeeData.salary) || 9000000,
        status: employeeData.status || "Đang làm việc",
        branch_id: branchId,
      };

      if (!payload.employee_name || payload.employee_name.trim() === "") {
        throw new Error("Tên nhân viên không được để trống");
      }
      if (!payload.email || payload.email.trim() === "") {
        throw new Error("Email không được để trống");
      }
      if (!payload.role_name || payload.role_name === "") {
        throw new Error("Vai trò không được để trống");
      }
      if (!payload.password || payload.password.trim() === "") {
        throw new Error("Mật khẩu không được để trống");
      }
      if (!payload.branch_id || isNaN(payload.branch_id)) {
        throw new Error("Branch ID không hợp lệ");
      }

      const response = await api.post(`${BASE_PATH}/add_employee`, payload);

      return {
        success: true,
        message: response.data.message || "Thêm nhân viên thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("Error adding employee:", error);

      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.message ||
          "Lỗi khi thêm nhân viên",
      };
    }
  },

  // ============= UPDATE EMPLOYEE =============
  updateEmployee: async (employeeId, employeeData) => {
    try {
      if (!employeeData.branch_id) {
        throw new Error("Branch ID bị thiếu trong employeeData");
      }

      const branchId = parseInt(employeeData.branch_id);

      if (isNaN(branchId)) {
        throw new Error(`Branch ID không hợp lệ: ${employeeData.branch_id}`);
      }

      const payload = {
        employee_name: employeeData.name,
        role_name: employeeData.role,
        email: employeeData.email,
        salary: parseFloat(employeeData.salary),
        status: employeeData.status,
        branch_id: branchId,
      };

      const response = await api.put(
        `${BASE_PATH}/update_employee/${employeeId}`,
        payload
      );

      return {
        success: true,
        message: response.data.message || "Cập nhật nhân viên thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("Error updating employee:", error);

      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.message ||
          "Lỗi khi cập nhật nhân viên",
      };
    }
  },

  // ============= DELETE EMPLOYEE =============
  deleteEmployee: async (employeeId) => {
    try {
      const response = await api.delete(
        `${BASE_PATH}/delete_employee/${employeeId}`
      );

      return {
        success: true,
        message: response.data.message || "Xóa nhân viên thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("Error deleting employee:", error);

      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.message ||
          "Lỗi khi xóa nhân viên",
      };
    }
  },
};

export default employeeApi;