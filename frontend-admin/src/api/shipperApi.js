// ===============================================
// src/api/shipperApi.js - FINAL CLEAN
// ===============================================
import api from "./axiosConfig";

const BASE_PATH = "http://localhost:5001/api/admin/shipper_management";

const mapShipperFromBackend = (shipper) => {
  if (!shipper) return null;
  
  return {
    shipper_id: shipper.shipper_id || 0,
    name: shipper.shipper_name || shipper.name || 'N/A',
    email: shipper.email || '',
    phone: shipper.phone || '',
    status: shipper.status || 'Đang hoạt động',
    branch_id: shipper.branch_id || null,
    rating: shipper.rating || 0,
    total_success: shipper.total_success || 0,
    salary: shipper.salary || 8000000,
  };
};

export const shipperApi = {
  /**
   * Lấy danh sách shipper theo branch
   */
  getAllShippers: async (branchId) => {
    try {
      const url = branchId
        ? `${BASE_PATH}/infomation?branch_id=${branchId}`
        : `${BASE_PATH}/infomation`;

      const response = await api.get(url);

      const mappedData = Array.isArray(response.data)
        ? response.data.map(mapShipperFromBackend)
        : [];

      return {
        success: true,
        data: mappedData,
      };
    } catch (error) {
      console.error("Error fetching shippers:", error);
      return {
        success: false,
        message: error.response?.data?.error || error.message,
        data: [],
      };
    }
  },

  /**
   * Thêm shipper
   */
  addShipper: async (shipperData) => {
    try {
      let branchId;

      if (!shipperData.branch_id || shipperData.branch_id === "") {
        throw new Error("Branch ID bị thiếu trong shipperData");
      }

      branchId = parseInt(String(shipperData.branch_id).trim());

      if (isNaN(branchId) || branchId <= 0) {
        throw new Error(`Branch ID không hợp lệ: "${shipperData.branch_id}"`);
      }

      if (!shipperData.password || shipperData.password.trim() === "") {
        throw new Error("Mật khẩu không được để trống");
      }

      const payload = {
        shipper_id: null,
        name: shipperData.shipper_name,
        email: shipperData.email,
        phone: shipperData.phone,
        password: shipperData.password,
        status: shipperData.status || "Đang hoạt động",
        branch_id: branchId,
        salary: parseFloat(shipperData.salary) || 8000000,
      };

      if (!payload.name || payload.name.trim() === "") {
        throw new Error("Tên shipper không được để trống");
      }
      if (!payload.email || payload.email.trim() === "") {
        throw new Error("Email không được để trống");
      }
      if (!payload.phone || payload.phone.trim() === "") {
        throw new Error("Số điện thoại không được để trống");
      }
      if (!payload.password || payload.password.trim() === "") {
        throw new Error("Mật khẩu không được để trống");
      }
      if (!payload.branch_id || isNaN(payload.branch_id)) {
        throw new Error("Branch ID không hợp lệ");
      }

      const response = await api.post(`${BASE_PATH}/add_shipper`, payload);

      return {
        success: true,
        message: response.data.message || "Thêm shipper thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("Error adding shipper:", error);
      return {
        success: false,
        message: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Cập nhật shipper
   */
  updateShipper: async (shipperId, shipperData) => {
    try {
      if (!shipperData.branch_id) {
        throw new Error("Branch ID bị thiếu trong shipperData");
      }

      const branchId = parseInt(shipperData.branch_id);

      if (isNaN(branchId)) {
        throw new Error(`Branch ID không hợp lệ: ${shipperData.branch_id}`);
      }

      const payload = {
        name: shipperData.shipper_name,
        email: shipperData.email,
        phone: shipperData.phone,
        status: shipperData.status,
        branch_id: branchId,
        salary: parseFloat(shipperData.salary) || 8000000,
      };

      const response = await api.put(
        `${BASE_PATH}/update_shipper/${shipperId}`,
        payload
      );

      return {
        success: true,
        message: response.data.message || "Cập nhật shipper thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("Error updating shipper:", error);
      return {
        success: false,
        message: error.response?.data?.error || error.message,
      };
    }
  },

  deleteShipper: async (shipperId) => {
    try {
      const response = await api.delete(
        `${BASE_PATH}/delete_shipper/${shipperId}`
      );

      return {
        success: true,
        message: response.data.message || "Xóa shipper thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("Error deleting shipper:", error);
      return {
        success: false,
        message: error.response?.data?.error || error.message,
      };
    }
  },
};

export default shipperApi;