// ===============================================
// Location: src/pages/Products/components/ProductsHeader.jsx
// ===============================================
import React from 'react';

const ProductsHeader = ({ title, subtitle }) => {
  return (
    <div className="products-header">
      <h1 className="products-title">{title}</h1>
      {subtitle && <p className="products-subtitle">{subtitle}</p>}
    </div>
  );
};

export default ProductsHeader;