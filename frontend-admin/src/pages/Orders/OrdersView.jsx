// ===============================================
// Location: src/pages/Orders/OrdersView.jsx
// FIXED: Removed avatar from customer column
// ===============================================

import React, { useState } from "react";
import { Tag, Space, Button, Tooltip, Modal, message } from "antd";
import { FiSearch, FiDownload, FiEye, FiTrash2 } from "react-icons/fi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import DataTable from "../../components/Table/Table";
import OrderDetailModal from "./OrderDetailModal";
import { useOrders } from "./useOrders";
import {
  STATUS_TABS,
  STATUS_INFO,
  formatCurrency,
  formatDate,
  getStatusColor,
} from "./orderConstants";
import "./OrdersView.css";

const { confirm } = Modal;

const OrdersView = () => {
  const {
    filteredOrders,
    loading,
    activeStatus,
    searchQuery,
    currentPage,
    deleteOrder,
    fetchOrderDetails,
    statusCount,
    getHeaderTitle,
    getHeaderSubtitle,
    setCurrentPage,
    handleStatusChange,
    handleSearchChange,
    canDeleteOrder,
  } = useOrders();

  // ============= MODAL STATE =============
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // ============= VIEW DETAIL =============
  const handleViewDetail = async (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
    setLoadingDetails(true);

    try {
      const details = await fetchOrderDetails(order.order_id);
      setOrderDetails(details);
    } catch (error) {
      console.error("Error fetching details:", error);
      message.error("Không thể tải chi tiết đơn hàng");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  // ============= DELETE =============
  const handleDelete = (order) => {
    if (!canDeleteOrder) {
      message.warning("Bạn không có quyền xóa đơn hàng");
      return;
    }

    confirm({
      title: "Xác nhận xóa đơn hàng",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa đơn hàng ${order.order_id}?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      async onOk() {
        await deleteOrder(order.order_id);
      },
    });
  };

  // ============= EXPORT =============
  const handleExport = () => {
    if (filteredOrders.length === 0) {
      message.warning("Không có dữ liệu để export");
      return;
    }

    const headers = [
      "Mã đơn",
      "Khách hàng",
      "Tổng tiền",
      "Trạng thái",
      "Ngày đặt",
    ];
    const rows = filteredOrders.map((order) => [
      order.order_id,
      order.recipient_name || order.customer_name || "N/A",
      order.total_amount,
      STATUS_INFO[order.status]?.label || order.status,
      formatDate(order.created_at),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    message.success("Export thành công!");
  };

  // ============= TABLE COLUMNS =============
  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "order_id",
      key: "order_id",
      width: 80,
      align: "center",
      fixed: "left",
      render: (id) => (
        <span style={{ fontWeight: "600", color: "#475569", fontSize: "14px" }}>
          {id}
        </span>
      ),
      sorter: (a, b) => a.order_id - b.order_id,
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 160,
      render: (_, record) => (
        <div>
          <div
            style={{ fontWeight: "600", color: "#1e293b", fontSize: "14px" }}
          >
            {record.recipient_name || record.customer_name || "N/A"}
          </div>
          {record.phone && record.phone !== "N/A" && (
            <div
              style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}
            >
              {record.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      width: 120,
      align: "right",
      render: (amount) => (
        <span style={{ fontWeight: "600", color: "#059669", fontSize: "14px" }}>
          {formatCurrency(amount)}
        </span>
      ),
      sorter: (a, b) => a.total_amount - b.total_amount,
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      align: "center",
      render: (date) => (
        <span style={{ color: "#64748b", fontSize: "13px" }}>
          {formatDate(date)}
        </span>
      ),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      align: "center",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          style={{ fontWeight: "600", fontSize: "13px", margin: 0 }}
        >
          {STATUS_INFO[status]?.label || status}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center",

      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<FiEye />}
              onClick={() => handleViewDetail(record)}
              style={{ color: "#3b82f6" }}
            />
          </Tooltip>

          {canDeleteOrder && (
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<FiTrash2 />}
                onClick={() => handleDelete(record)}
                danger
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // ============= PAGINATION =============
  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: filteredOrders.length,
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} đơn hàng`,
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  // ============= RENDER =============
  return (
    <div className="order-container">
      {/* HEADER */}
      <div className="order-header">
        <h1 className="order-title">{getHeaderTitle()}</h1>
        <p className="order-subtitle">{getHeaderSubtitle()}</p>
      </div>

      {/* TABS + ACTIONS */}
      <div className="tabs-action-bar">
        <div className="status-tabs">
          {STATUS_TABS.map((tab) => (
            <div
              key={tab.id}
              className={`status-tab ${
                activeStatus === tab.id ? "active" : ""
              }`}
              onClick={() => handleStatusChange(tab.id)}
            >
              {tab.label}{" "}
              <span className="tab-count">({statusCount(tab.id)})</span>
            </div>
          ))}
        </div>

        <div className="right-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm theo mã đơn, khách hàng..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <button
            className="export-btn"
            onClick={handleExport}
            disabled={filteredOrders.length === 0 || loading}
          >
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <DataTable
        columns={columns}
        dataSource={filteredOrders}
        loading={loading}
        pagination={paginationConfig}
        onChange={handleTableChange}
        rowKey="order_id"
        scroll={{ x: 1200 }}
        emptyText="Không có đơn hàng nào"
      />

      {/* DETAIL MODAL */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        order={selectedOrder}
        orderDetails={orderDetails}
        loadingDetails={loadingDetails}
      />
    </div>
  );
};

export default OrdersView;
