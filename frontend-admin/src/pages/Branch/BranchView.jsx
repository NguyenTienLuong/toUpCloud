// ===============================================
// FILE: src/pages/Branch/BranchView.jsx 
// ===============================================
import { useState } from "react";
import { Space, Button, Tooltip, Modal } from "antd";
import { FiMapPin, FiPhone, FiMail, FiHome, FiSearch, FiDownload, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { EnvironmentOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import DataTable from "../../components/Table/Table";
import FormModal from "../../components/FormModal/FormModal";
import { useBranch } from "./useBranch";
import { BRANCH_FIELDS } from "./branchConstants";
import "./BranchView.css";

const { confirm } = Modal;

const BranchView = () => {
  const {
    branches,
    loading,
    handleViewBranch,
    addBranch,
    updateBranch,
    deleteBranch,
    canManageBranches
  } = useBranch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBranches = branches.filter(branch => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const name = branch.name?.toLowerCase() || '';
    const address = branch.address?.toLowerCase() || '';
    const phone = branch.phone?.toLowerCase() || '';
    const email = branch.email?.toLowerCase() || '';
    const manager = branch.manager_name?.toLowerCase() || '';
    const id = String(branch.branch_id || '');
    
    return (
      name.includes(query) ||
      address.includes(query) ||
      phone.includes(query) ||
      email.includes(query) ||
      manager.includes(query) ||
      id.includes(query)
    );
  });

  const handleAddClick = () => {
    setModalMode('add');
    setSelectedBranch(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (branch) => {
    setModalMode('edit');
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (branch) => {
    confirm({
      title: 'Xác nhận xóa chi nhánh',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa chi nhánh "${branch.name}"? \n\nHành động này không thể hoàn tác!`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      async onOk() {
        await deleteBranch(branch.branch_id, branch.name);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBranch(null);
  };

  const handleSaveBranch = async (branchData) => {
    let result;
    
    if (modalMode === 'edit') {
      result = await updateBranch(selectedBranch.branch_id, branchData);
    } else {
      result = await addBranch(branchData);
    }
    
    if (result?.success) {
      handleCloseModal();
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Tên chi nhánh', 'Địa chỉ', 'Số điện thoại', 'Email', 'Quản lý'];
    const csvContent = [
      headers.join(','),
      ...filteredBranches.map(branch => 
        [
          branch.branch_id,
          `"${branch.name}"`,
          `"${branch.address}"`,
          branch.phone,
          branch.email || '',
          `"${branch.manager_name || 'Chưa có'}"`
        ].join(',')
      )
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `branches_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'branch_id',
      key: 'branch_id',
      width: 70,
      align: 'center',
      fixed: 'left',
      render: (id, record) => (
        <span 
          onClick={() => handleViewBranch(record)}
          className="clickable-id"
        >
          {id}
        </span>
      )
    },
    {
      title: 'Chi nhánh',
      key: 'branch',
      width: 250,
      render: (_, record) => (
        <div className="branch-info">
          <div className="branch-icon">
            <FiHome />
          </div>
          <div>
            <div className="branch-name-text">{record.name}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 280,
      render: (address) => (
        <span style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>
          {address}
        </span>
      )
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
      render: (phone) => (
        <span style={{ color: '#475569', fontSize: '13px', fontWeight: '500' }}>
          {phone}
        </span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email) => (
        <span style={{ color: '#475569', fontSize: '13px' }}>
          {email || '—'}
        </span>
      )
    },
    {
      title: 'Quản lý',
      dataIndex: 'manager_name',
      key: 'manager',
      width: 180,
      render: (managerName) => {
        if (!managerName) {
          return (
            <span style={{ 
              color: '#cbd5e1', 
              fontSize: '13px',
              fontStyle: 'italic'
            }}>
              Chưa có
            </span>
          );
        }

        return (
          <span style={{ 
            fontWeight: 600, 
            color: '#1e293b',
            fontSize: '13px'
          }}>
            {managerName}
          </span>
        );
      }
    },
    {
      title: 'Bản đồ',
      key: 'map',
      width: 280,
      render: (_, record) => {
        if (!record.mapSrc) {
          return (
            <div style={{ 
              textAlign: 'center',
              padding: '12px',
              background: '#f8fafc',
              borderRadius: '8px',
              color: '#94a3b8',
              fontSize: '12px'
            }}>
              <EnvironmentOutlined style={{ fontSize: '16px', marginBottom: '4px' }} />
              <div>Chưa có bản đồ</div>
            </div>
          );
        }

        return (
          <div style={{ 
            width: '100%',
            height: '100px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <iframe
              src={record.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${record.name}`}
            />
          </div>
        );
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          {canManageBranches() && (
            <>
              <Tooltip title="Chỉnh sửa">
                <Button
                  type="text"
                  icon={<FiEdit2 />}
                  onClick={() => handleEditClick(record)}
                  style={{ color: '#3b82f6' }}
                />
              </Tooltip>
              <Tooltip title="Xóa">
                <Button
                  type="text"
                  icon={<FiTrash2 />}
                  onClick={() => handleDeleteClick(record)}
                  danger
                />
              </Tooltip>
            </>
          )}
        </Space>
      )
    }
  ];

  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: filteredBranches.length,
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} chi nhánh`
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="branch-container">
      <div className="branch-header">
        <h1 className="branch-page-title">Quản lý Chi nhánh</h1>
        <p className="branch-page-subtitle">
          Quản lý thông tin các chi nhánh của hệ thống
        </p>
      </div>

      <div className="branch-action-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo ID, tên, địa chỉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          className="branch-export-btn"
          onClick={handleExportCSV}
          disabled={filteredBranches.length === 0 || loading}
        >
          <FiDownload />
          Export
        </button>

        {canManageBranches() && (
          <button className="branch-add-btn" onClick={handleAddClick}>
            <FiPlus />
            Thêm chi nhánh
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        dataSource={filteredBranches}
        loading={loading}
        pagination={paginationConfig}
        onChange={handleTableChange}
        rowKey="branch_id"
        scroll={{ x: 1500 }}
        emptyText="Không có chi nhánh nào"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveBranch}
        title={{
          add: 'Thêm chi nhánh mới',
          addDesc: 'Điền thông tin chi nhánh vào form bên dưới',
          edit: 'Chỉnh sửa chi nhánh',
          editDesc: 'Cập nhật thông tin chi nhánh'
        }}
        icon={FiHome}
        data={selectedBranch}
        fields={BRANCH_FIELDS}
      />
    </div>
  );
};

export default BranchView;