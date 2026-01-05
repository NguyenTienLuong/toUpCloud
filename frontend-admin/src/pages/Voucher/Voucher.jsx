// ===============================================
// FILE: src/pages/Voucher/Voucher.jsx

// ===============================================
import React, { useState } from "react";
import { Tag, Space, Button, Tooltip, Modal } from "antd";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheckCircle,
  FiXCircle,
  FiPercent,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import DataTable from "../../components/Table/Table";
import FormModal from "../../components/FormModal/FormModal";
import { useVoucher } from "./useVoucher";
import {
  VOUCHER_FIELDS,
  formatDate,
  formatCurrency,
  formatDateForInput,
} from "./voucherConstants";
import "./Voucher.css";

const { confirm } = Modal;

const Voucher = () => {
  const {
    filteredVouchers,
    stats,
    loading,
    statusFilter,
    searchQuery,
    currentPage,
    canManage,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    getHeaderTitle,
    getHeaderSubtitle,
    setCurrentPage,
    handleStatusChange,
    handleSearchChange,
  } = useVoucher();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleAddClick = () => {
    if (!canManage) {
      Modal.warning({
        title: "Không có quyền",
        content: "Bạn không có quyền thêm voucher",
        centered: true,
      });
      return;
    }
    setModalMode("add");
    setSelectedVoucher(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (voucher) => {
    if (!canManage) {
      Modal.warning({
        title: "Không có quyền",
        content: "Bạn không có quyền sửa voucher",
        centered: true,
      });
      return;
    }

    // ✅ Format dates cho input khi edit + log để debug
    const formattedVoucher = {
      ...voucher,
      begin_date: formatDateForInput(voucher.begin_date),
      end_date: formatDateForInput(voucher.end_date),
    };

    console.log("📝 Original voucher:", voucher);
    console.log("📝 Formatted voucher:", formattedVoucher);

    setModalMode("edit");
    setSelectedVoucher(formattedVoucher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMode("add");
    setSelectedVoucher(null);
  };

  const handleSaveVoucher = async (voucherData) => {
    let result;
    if (modalMode === "add") {
      result = await addVoucher(voucherData);
    } else {
      const voucherId = selectedVoucher.coupon_id || selectedVoucher.id;
      result = await updateVoucher(voucherId, voucherData);
    }
    if (result?.success) handleCloseModal();
  };

  const handleDelete = (voucher) => {
    if (!canManage) {
      Modal.warning({
        title: "Không có quyền",
        content: "Bạn không có quyền xóa voucher",
        centered: true,
      });
      return;
    }

    confirm({
      title: "Xác nhận xóa voucher",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa voucher "${voucher.coupon_id}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      async onOk() {
        await deleteVoucher(voucher.coupon_id);
      },
    });
  };

  // ============= TABLE COLUMNS =============
  const columns = [
    {
      title: "ID",
      dataIndex: "coupon_id",
      key: "coupon_id",
      width: 70,
      align: "center",
      fixed: "left",
      render: (id) => (
        <span
          style={{
            fontWeight: "700",
            color: "#667eea",
            fontSize: "14px",
          }}
        >
          {id}
        </span>
      ),
    },
    {
      title: "Mô tả voucher",
      dataIndex: "description",
      key: "description",
      width: 280,
      render: (desc) => (
        <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: "500" }}>
          {desc || "—"}
        </span>
      ),
    },
    {
      title: "Giảm giá",
      key: "discount",
      width: 130,
      align: "center",
      render: (_, record) => {
        const value = record.discount_value || 0;
        const isPercent = record.discount_type === "percent";

        return (
          <Tag
            color={isPercent ? "blue" : "green"}
            style={{ fontWeight: "600", fontSize: "13px", padding: "4px 12px" }}
          >
            {isPercent ? <FiPercent size={11} /> : <FiDollarSign size={11} />}{" "}
            {isPercent ? `${value}%` : `${value.toLocaleString("vi-VN")}đ`}
          </Tag>
        );
      },
    },
    {
      title: "ĐH tối thiểu",
      dataIndex: "min_purchase",
      key: "min_purchase",
      width: 130,
      align: "right",
      render: (amount) => (
        <span style={{ fontSize: "13px", color: "#059669", fontWeight: "600" }}>
          {formatCurrency(amount)}
        </span>
      ),
      sorter: (a, b) => (a.min_purchase || 0) - (b.min_purchase || 0),
    },
    {
      title: "Giảm tối đa",
      dataIndex: "max_discount",
      key: "max_discount",
      width: 130,
      align: "right",
      render: (amount) => (
        <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: "600" }}>
          {amount > 0 ? formatCurrency(amount) : "—"}
        </span>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "begin_date",
      key: "begin_date",
      width: 130,
      render: (date) => (
        <span style={{ fontSize: "13px", color: "#64748b" }}>
          {formatDate(date)}
        </span>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      width: 130,
      render: (date) => (
        <span style={{ fontSize: "13px", color: "#64748b" }}>
          {formatDate(date)}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => {
        const isActive = status?.toLowerCase() === "active";
        return (
          <Tag
            color={isActive ? "success" : "error"}
            style={{ fontWeight: "600", fontSize: "12px" }}
          >
            {isActive ? <FiCheckCircle size={11} /> : <FiXCircle size={11} />}{" "}
            {isActive ? "Hoạt động" : "Hết hạn"}
          </Tag>
        );
      },
    },
    ...(canManage
      ? [
          {
            title: "Thao tác",
            key: "action",
            width: 120,
            align: "center",

            render: (_, record) => (
              <Space size="small">
                <Tooltip title="Chỉnh sửa">
                  <Button
                    type="text"
                    icon={<FiEdit2 />}
                    onClick={() => handleEditClick(record)}
                    style={{ color: "#3b82f6" }}
                  />
                </Tooltip>
                <Tooltip title="Xóa">
                  <Button
                    type="text"
                    icon={<FiTrash2 />}
                    onClick={() => handleDelete(record)}
                    danger
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]
      : []),
  ];

  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: filteredVouchers.length,
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} vouchers`,
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="voucher-container">
      {/* HEADER */}
      <div className="voucher-header">
        <h1 className="voucher-title">{getHeaderTitle()}</h1>
        <p className="voucher-subtitle">{getHeaderSubtitle()}</p>
      </div>

      {/* ✅ ĐÃ XÓA PHẦN STATS CARDS */}

      {/* TOOLBAR */}
      <div className="tabs-action-bar">
        <div className="filter-tabs">
          <div
            className={`filter-tab ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => handleStatusChange("all")}
          >
            Tất cả <span className="tab-count">({stats.total})</span>
          </div>
          <div
            className={`filter-tab ${
              statusFilter === "active" ? "active" : ""
            }`}
            onClick={() => handleStatusChange("active")}
          >
            Hoạt động <span className="tab-count">({stats.active})</span>
          </div>
          <div
            className={`filter-tab ${
              statusFilter === "expired" ? "active" : ""
            }`}
            onClick={() => handleStatusChange("expired")}
          >
            Hết hạn <span className="tab-count">({stats.expired})</span>
          </div>
        </div>

        <div className="right-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm theo ID, mô tả..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {canManage && (
            <button
              className="add-btn"
              onClick={handleAddClick}
              disabled={loading}
            >
              <FiPlus />
              Thêm voucher
            </button>
          )}
        </div>
      </div>

      {/* TABLE - ONLY */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : filteredVouchers.length === 0 ? (
        <div className="empty-state">
          <FiTag size={64} color="#9ca3af" />
          <h3>Không tìm thấy voucher</h3>
          <p>Hãy thêm voucher mới hoặc thay đổi bộ lọc</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          dataSource={filteredVouchers}
          loading={loading}
          pagination={paginationConfig}
          onChange={handleTableChange}
          rowKey="coupon_id"
          scroll={{ x: 1300 }}
          emptyText="Không có voucher nào"
        />
      )}

      {/* MODAL */}
      {canManage && (
        <FormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSaveVoucher}
          title={{
            add: "Thêm voucher mới",
            addDesc: "Điền thông tin voucher vào form bên dưới",
            edit: "Chỉnh sửa voucher",
            editDesc: "Cập nhật thông tin voucher",
          }}
          icon={FiTag}
          data={selectedVoucher}
          fields={VOUCHER_FIELDS}
        />
      )}
    </div>
  );
};

export default Voucher;