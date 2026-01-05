// ===============================================
// Location: src/pages/Products/components/ProductsActionBar.jsx
// ===============================================
import React from 'react';
import { FiSearch, FiDownload, FiPlus } from 'react-icons/fi';
import { STATS_CONFIG } from '../productConstants';

const ProductsActionBar = ({
  activeCategory,
  searchQuery,
  stats,
  categoryCount,
  filteredProducts,
  loading,
  canManage,
  onCategoryChange,
  onSearchChange,
  onExport,
  onAdd
}) => {
  return (
    <div className="tabs-action-bar">
      {/* Category Tabs */}
      <div className="category-tabs">
        {STATS_CONFIG.map(tab => (
          <div
            key={tab.key}
            className={`category-tab ${activeCategory === tab.key ? 'active' : ''}`}
            onClick={() => onCategoryChange(tab.key)}
          >
            <span>{tab.title}</span>
            <span className="tab-count">
              ({tab.key === 'all' ? stats.total : categoryCount(tab.key)})
            </span>
          </div>
        ))}
      </div>

      {/* Right Actions */}
      <div className="right-actions">
        {/* Search Box */}
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo tên, danh mục, ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Export Button */}
        <button
          className="export-btn"
          onClick={onExport}
          disabled={filteredProducts.length === 0 || loading}
        >
          <FiDownload />
          Export
        </button>

        {/* Add Button - Only for Super Admin */}
        {canManage && (
          <button
            className="add-btn"
            onClick={onAdd}
            disabled={loading}
          >
            <FiPlus />
            Thêm sản phẩm
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsActionBar;