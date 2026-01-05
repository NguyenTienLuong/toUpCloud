// ===============================================
// FILE: src/api/voucherApi.js
// ===============================================
import api from "./axiosConfig";

const voucherApi = {
  /**
   * GET: Lấy tất cả vouchers
   */
  getAllVouchers: async () => {
    try {
      const response = await api.get(
        "http://localhost:5001/api/admin/coupon_management/coupon"
      );

      const vouchers = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data: vouchers,
      };
    } catch (error) {
      console.error("[voucherApi] GET error:", error);
      return {
        success: false,
        data: [],
        message:
          error.response?.data?.error || "Không thể tải danh sách voucher",
      };
    }
  },

  /**
   * POST: Thêm voucher mới
   */
  addVoucher: async (voucherData) => {
    try {
      const payload = {
        description: voucherData.description || `VOUCHER${Date.now()}`,
        discount_value: parseFloat(voucherData.discount_value) || 0,
        discount_type: voucherData.discount_type || "percent",
        min_purchase: parseFloat(voucherData.min_purchase) || 0,
        max_discount: parseFloat(voucherData.max_discount) || 0,
        begin_date: voucherData.begin_date,
        end_date: voucherData.end_date,
        status: voucherData.status || "active",
      };

      const response = await api.post(
        "http://localhost:5001/api/admin/coupon_management/add_coupon",
        payload
      );

      return {
        success: true,
        message: response.data.message || "Thêm voucher thành công",
        data: response.data,
      };
    } catch (error) {
      console.error("[voucherApi] POST error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Không thể thêm voucher",
      };
    }
  },

  /**
   * PUT: Cập nhật voucher
   */
  updateVoucher: async (couponId, voucherData) => {
    try {
      const payload = {
        description: voucherData.description,
        discount_value: parseFloat(voucherData.discount_value) || 0,
        discount_type: voucherData.discount_type || "percent",
        min_purchase: parseFloat(voucherData.min_purchase) || 0,
        max_discount: parseFloat(voucherData.max_discount) || 0,
        begin_date: voucherData.begin_date,
        end_date: voucherData.end_date,
        status: voucherData.status,
      };

      const response = await api.put(
        `http://localhost:5001/api/admin/coupon_management/update_coupon/${couponId}`,
        payload
      );

      return {
        success: true,
        message: response.data.message || "Cập nhật voucher thành công",
      };
    } catch (error) {
      console.error("[voucherApi] PUT error:", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.message ||
          "Không thể cập nhật voucher",
      };
    }
  },

  /**
   * DELETE: Xóa voucher
   */
  deleteVoucher: async (couponId) => {
    try {
      const response = await api.delete(
        `http://localhost:5001/api/admin/coupon_management/delete_coupon/${couponId}`
      );

      return {
        success: true,
        message: response.data.message || "Xóa voucher thành công",
      };
    } catch (error) {
      console.error("[voucherApi] DELETE error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Không thể xóa voucher",
      };
    }
  },
};

export default voucherApi;