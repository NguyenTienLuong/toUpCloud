// ===============================================
// Location: src/pages/Products/components/ProductDetailModal.jsx
// ===============================================
import React from 'react';
import { Modal, Rate } from 'antd';
import { getCategoryName } from '../productConstants';

const ProductDetailModal = ({ product, visible, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      title="Chi tiết sản phẩm"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      <div style={{ marginTop: 16 }}>
        {product.image_url && (
          <img 
            src={product.image_url} 
            alt={product.name}
            style={{ 
              width: '100%', 
              maxHeight: 300, 
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 16
            }}
          />
        )}
        <div style={{ display: 'grid', gap: '12px' }}>
          <p><strong>ID:</strong> {product.product_id}</p>
          <p><strong>Tên sản phẩm:</strong> {product.name}</p>
          <p><strong>Danh mục:</strong> {getCategoryName(product.category_id)}</p>
          <p><strong>Giá bán:</strong> {parseFloat(product.unit_price).toLocaleString('vi-VN')}đ</p>
          <p>
            <strong>Đánh giá:</strong>{' '}
            <Rate disabled value={product.rating || 0} style={{ fontSize: 16 }} />
          </p>
          <p><strong>Mô tả:</strong></p>
          <div style={{ 
            padding: '12px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            color: '#64748b',
            lineHeight: 1.6
          }}>
            {product.description || 'Chưa có mô tả'}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;