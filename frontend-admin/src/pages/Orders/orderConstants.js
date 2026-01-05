// ===============================================
// Location: src/pages/Orders/orderConstants.js
// ===============================================

import {
  FiClock,
  FiTruck,
  FiPackage,
  FiXCircle,
  FiShoppingCart,
} from "react-icons/fi";

// ============= STATS CONFIG =============
export const STATS_CONFIG = [
  {
    key: "total",
    title: "Tổng đơn hàng",
    icon: FiShoppingCart,
    color: "blue",
  },
  {
    key: "Pending",
    title: "Đang xử lý",
    icon: FiClock,
    color: "orange",
  },
  {
    key: "Shipping",
    title: "Đang giao",
    icon: FiTruck,
    color: "purple",
  },
  {
    key: "Completed",
    title: "Đã giao",
    icon: FiPackage,
    color: "green",
  },
  {
    key: "Cancelled",
    title: "Không hoàn thành",
    icon: FiXCircle,
    color: "red",
  },
];

// ============= STATUS TABS =============
export const STATUS_TABS = [
  { id: "all", label: "Tất cả", status: null },
  { id: "Pending", label: "Đang xử lý", status: "Đang xử lý" },
  { id: "Shipping", label: "Đang giao", status: "Đang giao" },
  { id: "Completed", label: "Đã giao", status: "Đã giao" },
  { id: "Cancelled", label: "Không hoàn thành", status: "Không hoàn thành" },
];

// ============= STATUS INFO =============
export const STATUS_INFO = {
  Pending: {
    label: "Đang xử lý",
    class: "Pending",
    color: "#f59e0b",
  },
  Shipping: {
    label: "Đang giao",
    class: "Shipping",
    color: "#8b5cf6",
  },
  Completed: {
    label: "Đã giao",
    class: "Completed",
    color: "#10b981",
  },
  Cancelled: {
    label: "Không hoàn thành",
    class: "Cancelled",
    color: "#ef4444",
  },
};

// ============= STATUS OPTIONS (SELECT) =============
export const STATUS_OPTIONS = [
  { value: "Đang xử lý", label: "Đang xử lý", color: "#f59e0b" },
  { value: "Đang giao", label: "Đang giao", color: "#8b5cf6" },
  { value: "Đã giao", label: "Đã giao", color: "#10b981" },
  { value: "Không hoàn thành", label: "Không hoàn thành", color: "#ef4444" },
];

// ============= HELPERS =============
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusIcon = (status) => {
  const icons = {
    "Đang xử lý": FiClock,
    "Đang giao": FiTruck,
    "Đã giao": FiPackage,
    "Không hoàn thành": FiXCircle,
  };
  return icons[status] || FiClock;
};

export const getStatusColor = (status) => {
  const colors = {
    Pending: "orange",
    Shipping: "purple",
    Completed: "green",
    Cancelled: "red",
  };
  return colors[status] || "default";
};
