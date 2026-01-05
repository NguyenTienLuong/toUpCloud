// ===============================================
// Location: src/pages/Products/components/ProductsTable.jsx
// ===============================================
import React from 'react';
import { Tag, Space, Button, Tooltip, Rate } from 'antd';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import DataTable from '../../../components/Table/Table';
import { getCategoryName, getCategoryColor } from '../productConstants';

const ProductsTable = ({ 
  products, 
  loading, 
  pagination,
  canManage,
  onEdit, 
  onDelete,
  onView,
  onPageChange 
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'product_id',
      key: 'product_id',
      width: 70,
      align: 'center',
      fixed: 'left',
      render: (id) => (
        <span style={{ fontWeight: '600', color: '#475569', fontSize: '14px' }}>
          {id}
        </span>
      ),
      sorter: (a, b) => a.product_id - b.product_id
    },
    {
      title: 'Sản phẩm',
      key: 'product',
      width: 260,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={record.image_url || record.image || 'https://via.placeholder.com/50'}
            alt={record.name}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              objectFit: 'cover',
              border: '1px solid #f0f0f0',
              flexShrink: 0
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ 
              fontWeight: '600', 
              color: '#1e293b', 
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {record.name}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: (desc) => (
        <Tooltip title={desc || 'Chưa có mô tả'}>
          <span style={{ 
            fontSize: '13px', 
            color: '#64748b',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {desc || 'Chưa có mô tả'}
          </span>
        </Tooltip>
      )
    },
    {
      title: 'Danh mục',
      dataIndex: 'category_id',
      key: 'category_id',
      width: 120,
      align: 'center',
      render: (categoryId) => (
        <Tag color={getCategoryColor(categoryId)}>
          {getCategoryName(categoryId)}
        </Tag>
      )
    },
    {
      title: 'Giá bán',
      dataIndex: 'unit_price',
      key: 'unit_price',
      width: 130,
      align: 'right',
      render: (price) => (
        <span style={{ fontWeight: '600', color: '#f59e0b', fontSize: '14px' }}>
          {parseFloat(price).toLocaleString('vi-VN')}đ
        </span>
      ),
      sorter: (a, b) => parseFloat(a.unit_price) - parseFloat(b.unit_price)
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 140,
      align: 'center',
      render: (rating) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Rate 
            disabled 
            value={rating || 0} 
            style={{ fontSize: 14 }}
          />
          <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
            ({rating ? rating.toFixed(1) : '0.0'})
          </span>
        </div>
      ),
      sorter: (a, b) => (a.rating || 0) - (b.rating || 0)
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          {canManage ? (
            <>
              <Tooltip title="Chỉnh sửa">
                <Button
                  type="text"
                  icon={<FiEdit2 />}
                  onClick={() => onEdit(record)}
                  style={{ color: '#3b82f6' }}
                />
              </Tooltip>
              <Tooltip title="Xóa">
                <Button
                  type="text"
                  icon={<FiTrash2 />}
                  onClick={() => onDelete(record)}
                  danger
                />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Xem chi tiết">
              <Button
                type="text"
                icon={<FiEye />}
                onClick={() => onView(record)}
                style={{ color: '#6b7280' }}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={pagination}
      onChange={onPageChange}
      rowKey="product_id"
      scroll={{ x: 'max-content' }}
      emptyText="Không có sản phẩm nào"
    />
  );
};

export default ProductsTable;