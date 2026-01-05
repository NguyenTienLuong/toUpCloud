// ===============================================
// Location: src/pages/Products/utils/productHelpers.js
// ===============================================
import { message } from 'antd';

export const exportProductsToCSV = (products) => {
  if (products.length === 0) {
    message.warning('Không có dữ liệu để xuất');
    return;
  }

  const headers = ['ID', 'Tên sản phẩm', 'Danh mục', 'Giá', 'Mô tả'];
  const csvContent = [
    headers.join(','),
    ...products.map(product => 
      [
        product.id, 
        `"${product.name}"`, 
        product.category, 
        product.price, 
        `"${product.description}"`
      ].join(',')
    )
  ].join('\n');
  
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `products_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  message.success('✅ Xuất file CSV thành công!');
};