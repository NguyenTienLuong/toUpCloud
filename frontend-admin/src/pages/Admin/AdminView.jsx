// ===============================================
// FILE: src/pages/Admin/AdminView.jsx
// ===============================================
import { useState } from "react";
import { Button, Space, Tooltip, Modal, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FiSearch, FiUser, FiMail, FiEdit2, FiTrash2 } from 'react-icons/fi';
import DataTable from "../../components/Table/Table";
import FormModal from "../../components/FormModal/FormModal";
import { useAdmin } from "./useAdmin";
import { ADMIN_FIELDS, STATUS_CONFIG, formatCurrency } from "./adminConstants";
import "./AdminView.css";

const { confirm } = Modal;

const AdminView = () => {
  const {
    admins,
    loading,
    updateAdmin,
    deleteAdmin,
    canManageAdmins
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAdmins = admins.filter(admin => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const name = admin.manager_name?.toLowerCase() || '';
    const email = admin.email?.toLowerCase() || '';
    const branch = admin.branch_name?.toLowerCase() || '';
    const id = admin.manager_id?.toString() || '';
    
    return (
      name.includes(query) ||
      email.includes(query) ||
      branch.includes(query) ||
      id.includes(query)
    );
  });

  const handleEditClick = (admin) => {
    // Map status từ English sang Tiếng Việt khi edit
    const statusMap = {
      'Active': 'Đang làm việc',
      'Inactive': 'Nghỉ việc'
    };
    
    const formData = {
      manager_id: admin.manager_id,
      username: admin.manager_name, 
      email: admin.email,
      salary: admin.salary || '',
      status: statusMap[admin.status] || admin.status || 'Đang làm việc',
      branch_id: admin.branch_id,
      branch_name: admin.branch_name,
      password: ''
    };
    
    console.log('Edit admin data:', formData);
    
    setSelectedAdmin(formData);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (admin) => {
    confirm({
      title: 'Xác nhận xóa admin',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa admin "${admin.manager_name}"? \n\nHành động này không thể hoàn tác!`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      async onOk() {
        await deleteAdmin(admin.manager_id, admin.manager_name);
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleSaveAdmin = async (adminData) => {
    console.log('Saving admin:', adminData);
    
    const result = await updateAdmin(selectedAdmin.manager_id, adminData);
    
    if (result?.success) {
      handleCloseModal();
    }
  };

  const renderStatus = (status) => {
    // Map từ English sang Tiếng Việt
    const statusMap = {
      'Active': 'Đang làm việc',
      'Inactive': 'Nghỉ việc'
    };
    
    const displayStatus = statusMap[status] || status;
    const config = STATUS_CONFIG[displayStatus] || { color: 'default' };
    
    return <Tag color={config.color}>{displayStatus}</Tag>;
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'manager_id',
      key: 'manager_id',
      width: 70,
      align: 'center',
      render: (id) => (
        <span className="admin-id">
          {id}
        </span>
      )
    },
    {
      title: 'Admin',
      key: 'admin',
      width: 250,
      render: (_, record) => (
        <div className="admin-info">
          <div>
            <div className="admin-name-text">{record.manager_name}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {record.role || 'Admin'}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (email) => (
        <div className="contact-item-text">
          <FiMail />
          <span>{email}</span>
        </div>
      )
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branch_name',
      key: 'branch',
      width: 280,
      render: (branchName) => {
        if (!branchName) {
          return (
            <span style={{ 
              color: '#cbd5e1', 
              fontSize: '13px',
              fontStyle: 'italic'
            }}>
              Chưa quản lý chi nhánh
            </span>
          );
        }
        
        return (
          <div className="branch-info-text">
            <span>{branchName}</span>
          </div>
        );
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status) => renderStatus(status || 'Đang làm việc')
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          {canManageAdmins() && (
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
    total: filteredAdmins.length,
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} admin`
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="admin-container">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Quản lý Admin</h1>
          <p className="admin-page-subtitle">
            Xem và quản lý thông tin các admin của hệ thống • Tổng: {admins.length} admin
          </p>
        </div>

        <div className="admin-header-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm theo tên, email, chi nhánh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        dataSource={filteredAdmins}
        loading={loading}
        pagination={paginationConfig}
        onChange={handleTableChange}
        rowKey="manager_id"
        scroll={{ x: 1400 }}
        emptyText="Không có admin nào"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveAdmin}
        title={{
          edit: 'Chỉnh sửa thông tin admin',
          editDesc: 'Cập nhật thông tin admin (Mật khẩu chỉ nhập nếu muốn thay đổi)'
        }}
        icon={FiUser}
        data={selectedAdmin}
        fields={ADMIN_FIELDS}
        mode="edit" 
      />
    </div>
  );
};

export default AdminView;