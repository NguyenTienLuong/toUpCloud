// ===============================================
// FILE: src/pages/Products/ProductsView.jsx
// ===============================================
import React, { useState } from 'react';
import { Modal } from 'antd';
import { FiPackage } from 'react-icons/fi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FormModal from '../../components/FormModal/FormModal';
import { useProduct } from './useProduct';
import ProductsHeader from './components/ProductsHeader';
import ProductsActionBar from './components/ProductsActionBar';
import ProductsTable from './components/ProductsTable';
import ProductDetailModal from './components/ProductDetailModal';
import { exportProductsToCSV } from './utils/productHelpers';
import { PRODUCT_FIELDS, PRODUCT_EDIT_FIELDS } from './productConstants';
import './ProductsView.css';

const { confirm } = Modal;

const ProductsView = () => {
  // HOOKS
  const {
    filteredProducts,
    stats,
    loading,
    searchQuery,
    activeCategory,
    currentPage,
    addProduct,
    updateProduct,
    deleteProduct,
    categoryCount,
    getHeaderTitle,
    getHeaderSubtitle,
    setCurrentPage,
    handleSearchChange,
    handleCategoryChange,
    canManage
  } = useProduct();

  // LOCAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // HANDLERS - ADD
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // HANDLERS - EDIT
  const handleEditClick = (product) => {
    setModalMode('edit');
    
    const formData = {
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      image_url: product.image_url || product.image,
      unit_price: product.unit_price,
      category_id: product.category_id
    };
    
    setSelectedProduct(formData);
    setIsModalOpen(true);
  };

  // HANDLERS - VIEW DETAIL
  const handleViewClick = (product) => {
    setViewProduct(product);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewProduct(null);
  };

  // HANDLERS - CLOSE MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // HANDLERS - SAVE
  const handleSaveProduct = async (productData) => {
    let result;
    
    if (modalMode === 'add') {
      result = await addProduct(productData);
    } else {
      const productId = selectedProduct.product_id;
      result = await updateProduct(productId, productData);
    }
    
    if (result?.success) {
      handleCloseModal();
    }
  };

  // HANDLERS - DELETE
  const handleDelete = (product) => {
    if (!canManage) {
      return;
    }

    confirm({
      title: 'Xác nhận xóa sản phẩm',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      async onOk() {
        await deleteProduct(product.product_id, product.name);
      }
    });
  };

  // HANDLERS - EXPORT
  const handleExport = () => {
    exportProductsToCSV(filteredProducts);
  };

  // PAGINATION CONFIG
  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: filteredProducts.length,
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} sản phẩm`
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  // RENDER
  return (
    <div className="products-container">
      {/* Header */}
      <ProductsHeader 
        title={getHeaderTitle()} 
        subtitle={getHeaderSubtitle()} 
      />

      {/* Action Bar */}
      <ProductsActionBar
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        stats={stats}
        categoryCount={categoryCount}
        filteredProducts={filteredProducts}
        loading={loading}
        canManage={canManage}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onExport={handleExport}
        onAdd={handleAddClick}
      />

      {/* Table */}
      <ProductsTable
        products={filteredProducts}
        loading={loading}
        pagination={paginationConfig}
        canManage={canManage}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onView={handleViewClick}
        onPageChange={handleTableChange}
      />

      {/* Form Modal (Add/Edit) */}
      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveProduct}
        title={{
          add: 'Thêm sản phẩm mới',
          addDesc: 'Điền thông tin sản phẩm vào form bên dưới',
          edit: 'Chỉnh sửa sản phẩm',
          editDesc: 'Cập nhật thông tin sản phẩm'
        }}
        icon={FiPackage}
        data={selectedProduct}
        fields={modalMode === 'edit' ? PRODUCT_EDIT_FIELDS : PRODUCT_FIELDS}
      />

      {/* View Detail Modal */}
      <ProductDetailModal
        product={viewProduct}
        visible={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
    </div>
  );
};

export default ProductsView;