// ===============================================
// FILE: src/api/superAdminApi.js -
// ===============================================
import api from "./axiosConfig";

const BASE_PATH = "http://localhost:5001/api/api";

export const superAdminApi = {
  // ==========================================
  // QUẢN LÝ NHÂN VIÊN TOÀN HỆ THỐNG
  // ==========================================

  /**
   * Thêm nhân viên mới - CHỈ SUPER ADMIN
   * POST /api/employees
   */
  addEmployee: async (employeeData) => {
    try {
      const payload = {
        employee_id: null,
        employee_name: employeeData.employee_name,
        role_name: employeeData.role_name,
        email: employeeData.email,
        password: employeeData.password,
        salary: parseFloat(employeeData.salary) || 9000000,
        status: employeeData.status || "Active",
        branch_id: parseInt(employeeData.branch_id),
      };

      const response = await api.post(`${BASE_PATH}/employees`, payload);

      return {
        success: response.data.success || true,
        message: response.data.message || "Thêm nhân viên thành công",
        id: response.data.id,
      };
    } catch (error) {
      console.error("Error adding employee:", error);

      if (error.response?.status === 403) {
        return {
          success: false,
          message: "Chỉ Super Admin mới có quyền thêm nhân viên",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi thêm nhân viên",
      };
    }
  },

  /**
   * Cập nhật nhân viên - CHỈ SUPER ADMIN
   * PUT /api/employees/:id
   */
  updateEmployee: async (employeeId, employeeData) => {
    try {
      const payload = {
        employee_name: employeeData.employee_name,
        role_name: employeeData.role_name,
        email: employeeData.email,
        salary: parseFloat(employeeData.salary),
        status: employeeData.status,
        branch_id: parseInt(employeeData.branch_id),
      };

      if (employeeData.password && employeeData.password.trim()) {
        payload.password = employeeData.password;
      }

      const response = await api.put(
        `${BASE_PATH}/employees/${employeeId}`,
        payload
      );

      return {
        success: response.data.success || true,
        message: response.data.message || "Cập nhật nhân viên thành công",
      };
    } catch (error) {
      console.error("Error updating employee:", error);

      if (error.response?.status === 403) {
        return {
          success: false,
          message: "Chỉ Super Admin mới có quyền cập nhật nhân viên",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi cập nhật nhân viên",
      };
    }
  },

  // ==========================================
  // QUẢN LÝ VOUCHER TOÀN HỆ THỐNG
  // ==========================================

  /**
   * Tạo voucher mới - CHỈ SUPER ADMIN
   * POST /api/coupons
   */
  createVoucher: async (voucherData) => {
    try {
      const payload = {
        description: voucherData.description,
        discount_percent:
          voucherData.discount_type === "Percent"
            ? parseFloat(voucherData.discount_percent)
            : null,
        discount_value:
          voucherData.discount_type === "Fixed"
            ? parseFloat(voucherData.discount_value)
            : null,
        discount_type: voucherData.discount_type,
        min_purchase: parseFloat(voucherData.min_purchase) || 0,
        max_discount: parseFloat(voucherData.max_discount) || null,
        begin_date: voucherData.begin_date,
        end_date: voucherData.end_date,
        status: voucherData.status || "Active",
      };

      const response = await api.post(`${BASE_PATH}/coupons`, payload);

      return {
        success: response.data.success || true,
        message: response.data.message || "Tạo voucher thành công",
        id: response.data.id,
      };
    } catch (error) {
      console.error("Error creating voucher:", error);

      if (error.response?.status === 403) {
        return {
          success: false,
          message: "Chỉ Super Admin mới có quyền tạo voucher",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi tạo voucher",
      };
    }
  },

  /**
   * Cập nhật voucher - CHỈ SUPER ADMIN
   * PUT /api/coupons/:id
   */
  updateVoucher: async (voucherId, voucherData) => {
    try {
      const payload = {
        description: voucherData.description,
        discount_percent:
          voucherData.discount_type === "Percent"
            ? parseFloat(voucherData.discount_percent)
            : null,
        discount_value:
          voucherData.discount_type === "Fixed"
            ? parseFloat(voucherData.discount_value)
            : null,
        discount_type: voucherData.discount_type,
        min_purchase: parseFloat(voucherData.min_purchase) || 0,
        max_discount: parseFloat(voucherData.max_discount) || null,
        begin_date: voucherData.begin_date,
        end_date: voucherData.end_date,
        status: voucherData.status,
      };

      const response = await api.put(
        `${BASE_PATH}/coupons/${voucherId}`,
        payload
      );

      return {
        success: response.data.success || true,
        message: response.data.message || "Cập nhật voucher thành công",
      };
    } catch (error) {
      console.error("Error updating voucher:", error);

      if (error.response?.status === 403) {
        return {
          success: false,
          message: "Chỉ Super Admin mới có quyền cập nhật voucher",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi cập nhật voucher",
      };
    }
  },
};

export default superAdminApi;