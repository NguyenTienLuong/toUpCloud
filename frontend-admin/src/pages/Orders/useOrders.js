// ===============================================
// Location: src/pages/Orders/useOrders.js
// ===============================================

import { useState, useEffect, useMemo } from "react";
import { message } from "antd";
import { orderApi } from "../../api/orderApi";
import { useAuth } from "../../context/AuthContext";
import { STATUS_TABS } from "./orderConstants";

export const useOrders = () => {
  const { user, getCurrentBranch } = useAuth();

  const currentBranch = getCurrentBranch();
  const branchId = currentBranch?.id;

  // ============= STATE =============
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ============= FETCH ORDERS =============
  const fetchOrders = async () => {
    if (!branchId) {
      message.error("Không tìm thấy branch ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching orders for branch:", branchId);

      const response = await orderApi.getAllOrders(branchId);

      console.log("API response:", response);

      if (response.success && response.data) {
        // Transform data tu backend
        const transformedOrders = response.data.map((order) => ({
          order_id: order.order_id,
          customer_id: order.customer_id,
          branch_id: order.branch_id,
          shipper_id: order.shipper_id,
          coupon_id: order.coupon_id,
          total_amount: order.total_amount || 0,
          payment_method: order.payment_method || "COD",
          phone: order.phone || "N/A",
          note: order.note || "",
          created_at: order.created_at,

          // Support ca recipient_name va customer_name
          recipient_name:
            order.recipient_name || order.customer_name || "Khách hàng",
          customer_name:
            order.customer_name || order.recipient_name || "Khách hàng",

          // Default status neu khong co
          status: order.status || "Pending",
        }));

        console.log("Transformed orders success:", transformedOrders);
        setOrders(transformedOrders);
      } else {
        console.warn("No data in response");
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Không thể tải danh sách đơn hàng");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ============= INITIAL LOAD =============
  useEffect(() => {
    console.log("useOrders effect, branchId:", branchId);
    if (branchId) {
      fetchOrders();
    }
  }, [branchId]);

  // ============= FILTERED ORDERS =============
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Filter by status tab
    if (activeStatus !== "all") {
      const tabConfig = STATUS_TABS.find((tab) => tab.id === activeStatus);
      if (tabConfig?.status) {
        result = result.filter((order) => order.status === tabConfig.status);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const orderId = String(order.order_id).toLowerCase();
        const customerName = (order.customer_name || "").toLowerCase();
        const recipientName = (order.recipient_name || "").toLowerCase();
        const phone = (order.phone || "").toLowerCase();

        return (
          orderId.includes(query) ||
          customerName.includes(query) ||
          recipientName.includes(query) ||
          phone.includes(query)
        );
      });
    }

    return result;
  }, [orders, activeStatus, searchQuery]);

  // ============= STATS =============
  const stats = useMemo(() => {
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      total: orders.length,
      Pending: statusCounts["Đang xử lý"] || 0,
      Shipping: statusCounts["Đang giao"] || 0,
      Completed: statusCounts["Đã giao"] || 0,
      Cancelled: statusCounts["Không hoàn thành"] || 0,
    };
  }, [orders]);

  // ============= DELETE OPERATION =============
  const deleteOrder = async (orderId) => {
    try {
      await orderApi.deleteOrder(orderId);
      message.success("Xóa đơn hàng thành công");
      await fetchOrders(); // Refresh
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Không thể xóa đơn hàng");
      return false;
    }
  };

  // ============= FETCH ORDER DETAILS =============
  const fetchOrderDetails = async (orderId) => {
    try {
      console.log("Fetching details for order:", orderId);
      const details = await orderApi.getOrderDetail(orderId);
      console.log("Order details response:", details);
      return details;
    } catch (error) {
      console.error("Error fetching details:", error);
      throw error;
    }
  };

  // ============= HELPERS =============
  const statusCount = (statusId) => {
    if (statusId === "all") return orders.length;
    const tabConfig = STATUS_TABS.find((tab) => tab.id === statusId);
    if (!tabConfig?.status) return 0;
    return orders.filter((o) => o.status === tabConfig.status).length;
  };

  const getHeaderTitle = () => {
    const branchName = currentBranch?.name || "Chi nhánh";
    return `Quản lý đơn hàng - ${branchName}`;
  };

  const getHeaderSubtitle = () => {
    const count = filteredOrders.length;
    if (activeStatus === "all") {
      return `Tổng cộng ${count} đơn hàng`;
    }
    const tab = STATUS_TABS.find((t) => t.id === activeStatus);
    return `${count} đơn hàng ${tab?.label?.toLowerCase() || ""}`;
  };

  // ============= HANDLERS =============
  const handleStatusChange = (statusId) => {
    setActiveStatus(statusId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // ============= PERMISSION CHECKS =============
  const canDeleteOrder = true;

  return {
    // Data
    orders,
    filteredOrders,
    stats,

    // State
    loading,
    activeStatus,
    searchQuery,
    currentPage,

    // Operations
    deleteOrder,
    fetchOrderDetails,
    refetchOrders: fetchOrders,

    // Permissions
    canDeleteOrder,

    // Helpers
    statusCount,
    getHeaderTitle,
    getHeaderSubtitle,

    // Handlers
    setCurrentPage,
    handleStatusChange,
    handleSearchChange,
  };
};
