// ===============================================
// FILE: src/api/orderApi.js - CLEAN VERSION
// ===============================================

const BASE_URL = "http://localhost:5001/api/admin/order_management";
import { tokenStorage } from "../utils/token";

const getAuthHeaders = () => {
  const token = tokenStorage.get();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const orderApi = {
  // GET - Lấy tất cả orders theo branch
  getAllOrders: async (branchId) => {
    try {
      const response = await fetch(`${BASE_URL}/orders?branch_id=${branchId}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        throw new Error("UNAUTHORIZED - Token invalid or expired");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return {
        success: result.success,
        data: result.data || [],
        count: result.count || 0,
        branch_id: result.branch_id,
      };
    } catch (error) {
      throw error;
    }
  },

  getOrderDetail: async (orderId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/order_detail?order_id=${orderId}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 404) {
        return {
          success: true,
          items: [],
          shipping_address: null,
          total_amount: 0,
        };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        items: data.order_items || [],
        shipping_address: data.shipping_address || null,
        total_amount: data.total_amount || 0,
      };
    } catch (error) {
      return {
        success: false,
        items: [],
        error: error.message,
      };
    }
  },

  deleteOrder: async (orderId) => {
    const response = await fetch(`${BASE_URL}/delete_order/${orderId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

export default orderApi;