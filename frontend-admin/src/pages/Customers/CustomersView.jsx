// ===============================================
// FILE: src/pages/Customers/CustomersView.jsx
// ===============================================
import React from 'react';
import { Tag, Space, Button, Tooltip, Modal } from 'antd';
import { FiSearch, FiDownload, FiTrash2 } from 'react-icons/fi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DataTable from '../../components/Table/Table';
import { useCustomer } from './useCustomer';
import { 
  RANK_TABS, 
  formatCurrency, 
  getRankStyle 
} from './customerConstants';
import './CustomersView.css';

const { confirm } = Modal;

const CustomersView = () => {
  const {
    filteredCustomers,
    stats,
    loading,
    activeRank,
    searchQuery,
    currentPage,
    deleteCustomer,
    rankCount,
    setCurrentPage,
    handleRankChange,
    handleSearchChange,
    handleExportCSV,
    
    canDeleteCustomer,
    canExportData
  } = useCustomer();

  // ============= DELETE HANDLER =============
  const handleDelete = (customer) => {
    if (!canDeleteCustomer()) {
      return;
    }

    confirm({
      title: 'Xác nhận xóa khách hàng',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa khách hàng "${customer.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      async onOk() {
        await deleteCustomer(customer.id, customer.name);
      }
    });
  };

  // ============= TABLE COLUMNS =============
  const columns = [
    {
      title: 'Mã KH',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 100,
      align: 'center',
      fixed: 'left',
      render: (text) => (
        <span style={{ 
          fontWeight: 700, 
          fontSize: '14px',
          color: '#475569'
        }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => (
        <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 220,
      ellipsis: true,
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 150,
      align: 'center',
      sorter: (a, b) => a.total_amount - b.total_amount,
      render: (amount) => (
        <span style={{ fontWeight: 700, color: '#10b981', fontSize: '14px' }}>
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
      width: 120,
      align: 'center',
      render: (rank) => {
        const style = getRankStyle(rank);
        
        return (
          <Tag 
            style={{ 
              color: style.color,
              background: style.bg,
              border: `1px solid ${style.border}`,
              fontWeight: 600,
              fontSize: '12px',
              borderRadius: '999px',
              padding: '4px 12px'
            }}
          >
            {rank}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          {canDeleteCustomer() && (
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

  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: filteredCustomers.length,
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} khách hàng`
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  // ============= RENDER =============
  return (
    <div className="customer-container">
      {/* Header */}
      <div className="customer-header">
        <h1 className="customer-title">Quản lý Khách hàng</h1>
        <p className="customer-subtitle">
          Tổng: {stats.total} khách hàng
        </p>
      </div>

      {/* Tabs + Actions */}
      <div className="tabs-action-bar">
        <div className="rank-tabs">
          {RANK_TABS.map(tab => (
            <div
              key={tab.id}
              onClick={() => handleRankChange(tab.id)}
              className={`rank-tab ${activeRank === tab.id ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
              <span className="tab-count">({rankCount(tab.id)})</span>
            </div>
          ))}
        </div>
        
        <div className="right-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm theo tên, email, SĐT..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {canExportData() && (
            <button 
              onClick={handleExportCSV} 
              className="export-btn"
              disabled={filteredCustomers.length === 0 || loading}
            >
              <FiDownload /> Export
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        dataSource={filteredCustomers}
        loading={loading}
        pagination={paginationConfig}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        emptyText="Không tìm thấy khách hàng nào"
      />
    </div>
  );
};

export default CustomersView;