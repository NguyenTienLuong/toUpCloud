// ===============================================
// Location: src/pages/Orders/OrderDetailModal.jsx
// 100% MATCHING DESIGN
// ===============================================
import React from 'react';
import { Modal, Spin } from 'antd';
import { FiPackage, FiX } from 'react-icons/fi';
import { formatCurrency, formatDate } from './orderConstants';
import './OrderDetailModal.css';

const OrderDetailModal = ({ 
  isOpen, 
  onClose, 
  order, 
  orderDetails, 
  loadingDetails 
}) => {
  if (!order) return null;

  const items = orderDetails?.items || [];
  
  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + ((item.quantity || 0) * (item.price_at_purchase || 0)),
    0
  );

  // Helper: Xu ly image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5001${imageUrl}`;
    }
    return `http://localhost:5001/${imageUrl}`;
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      closeIcon={<FiX size={20} />}
      styles={{
        body: { padding: 0 },
        header: { padding: 0 }
      }}
    >
      {/* Header */}
      <div className="order-modal-header">
        <h2 className="order-modal-title">Chi tiết đơn hàng</h2>
      </div>

      <div className="order-modal-layout">
        {/* Left Column - Dia chi nhan hang */}
        <div className="order-left-section">
          <h3 className="order-section-title">Địa chỉ nhận hàng</h3>
          
          <div className="order-info-group">
            <p className="order-info-label">Người nhận:</p>
            <p className="order-info-text">{order.recipient_name || order.customer_name || 'N/A'}</p>
          </div>
          
          {order.phone && order.phone !== 'N/A' && (
            <div className="order-info-group">
              <p className="order-info-label">Số điện thoại:</p>
              <p className="order-info-text">{order.phone}</p>
            </div>
          )}
          
          <div className="order-info-group">
            <p className="order-info-label">Địa chỉ:</p>
            <p className="order-info-text">{orderDetails?.shipping_address || order.shipping_address || order.order_address || 'N/A'}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="order-right-section">
          {/* Thong tin don hang */}
          <div className="order-details-grid">
            <div className="order-detail-row">
              <span className="order-detail-label">Mã đơn hàng</span>
              <span className="order-detail-value">{order.order_id || 'N/A'}</span>
            </div>
            
            <div className="order-detail-row">
              <span className="order-detail-label">Phương thức thanh toán</span>
              <span className="order-detail-value">
                {order.payment_method === 'COD' ? 'COD' : order.payment_method || 'Thanh toán khi nhận hàng'}
              </span>
            </div>
            
            <div className="order-detail-row">
              <span className="order-detail-label">Thời gian đặt hàng</span>
              <span className="order-detail-value">{formatDate(order.created_at)}</span>
            </div>
            
            <div className="order-detail-row">
              <span className="order-detail-label">Cơ sở</span>
              <span className="order-detail-value">Hus Bakery {order.branch_id || ''}</span>
            </div>

            {order.shipper_id && (
              <>
                <div className="order-detail-row">
                  <span className="order-detail-label">Shipper giao hàng</span>
                  <span className="order-detail-value">{order.shipper_name || `Shipper #${order.shipper_id}`}</span>
                </div>
              </>
            )}
          </div>

          {/* Thong tin san pham */}
          <div className="order-products-section">
            <h3 className="order-products-title">Thông tin Sản phẩm</h3>
            
            {loadingDetails ? (
              <div className="order-loading">
                <Spin size="large" />
                <p>Đang tải chi tiết...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="order-empty">
                <FiPackage size={40} />
                <p>Không có sản phẩm nào</p>
              </div>
            ) : (
              <div className="order-products-list">
                {items.map((item, index) => {
                  const imageUrl = getImageUrl(item.image || item.product_image || item.image_url);

                  return (
                    <div key={index} className="order-product-item">
                      <div className="order-product-image">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={item.product_name || 'Sản phẩm'}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="order-product-placeholder" 
                          style={{ display: imageUrl ? 'none' : 'flex' }}
                        >
                          <FiPackage size={32} color="#999" />
                        </div>
                      </div>
                      
                      <div className="order-product-details">
                        <h4 className="order-product-name">{item.product_name || 'Sản phẩm'}</h4>
                        <p className="order-product-info">Số lượng: <span>{item.quantity || 0}</span></p>
                        <p className="order-product-info">Giá: <span>{formatCurrency(item.price_at_purchase || 0)}</span></p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tong tien */}
          {!loadingDetails && items.length > 0 && (
            <div className="order-total-section">
              <div className="order-subtotal">
                <span>Tổng số tiền ({totalItems} sản phẩm):</span>
                <span className="order-subtotal-value">{formatCurrency(totalPrice)}</span>
              </div>
              
              <div className="order-total">
                <span className="order-total-label">Tổng tiền hàng:</span>
                <span className="order-total-value">{formatCurrency(orderDetails?.total_amount || order.total_amount || 0)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;