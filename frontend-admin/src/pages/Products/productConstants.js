// ===============================================
// FILE: src/pages/Products/productConstants.js
// ===============================================
import {
  FiPackage,
  FiTag,
  FiImage,
  FiFileText,
  FiLayers,
  FiCoffee,
  FiShoppingBag,
  FiGift,
} from "react-icons/fi";
import { PiMoney } from "react-icons/pi";

// ============= STATS CONFIG =============
export const STATS_CONFIG = [
  {
    key: "all",
    title: "Tất cả",
    icon: FiLayers,
    color: "blue",
    categoryId: null,
  },
  {
    key: "bread",
    title: "Bread",
    icon: FiCoffee,
    color: "gold",
    categoryId: 1,
  },
  {
    key: "cookie",
    title: "Cookie",
    icon: FiShoppingBag,
    color: "orange",
    categoryId: 2,
  },
  {
    key: "pastry",
    title: "Pastry",
    icon: FiGift,
    color: "volcano",
    categoryId: 3,
  },
];

// ============= CATEGORIES =============

export const CATEGORIES = {
  1: "Bread",
  2: "Cookie",
  3: "Pastry",
};

export const getCategoryName = (categoryId) => {
  return CATEGORIES[categoryId] || `Unknown (ID: ${categoryId})`;
};

export const getCategoryColor = (categoryId) => {
  const colors = {
    1: "orange",
    2: "gold",
    3: "volcano",
  };
  return colors[categoryId] || "blue";
};

// ============= CATEGORY TABS =============
export const CATEGORY_TABS = [
  { id: "all", label: "Tất cả", categoryId: null },
  { id: "bread", label: "Bread", categoryId: 1 },
  { id: "cookie", label: "Cookie", categoryId: 2 },
  { id: "pastry", label: "Pastry", categoryId: 3 },
];

// ============= FORM FIELDS (ADD) =============
export const PRODUCT_FIELDS = [
  {
    name: "name",
    label: "Tên sản phẩm",
    type: "text",
    icon: FiPackage,
    placeholder: "Nhập tên sản phẩm",
    required: true,
  },
  {
    name: "category_id",
    label: "Danh mục",
    type: "select",
    icon: FiTag,
    required: true,
    defaultValue: "2",
    options: [
      { value: "", label: "Chọn danh mục" },
      { value: "2", label: "Cookie" },
      { value: "1", label: "Bread" },
      { value: "3", label: "Pastry" },
    ],
    transform: (value) => parseInt(value),
  },
  {
    name: "unit_price",
    label: "Giá sản phẩm (VNĐ)",
    type: "text",
    inputType: "number",
    icon: PiMoney,
    placeholder: "0",
    required: true,
    transform: (value) => parseFloat(value),
  },
  {
    name: "image_url",
    label: "URL hình ảnh",
    type: "text",
    icon: FiImage,
    placeholder: "https://example.com/image.jpg",
    required: false,
  },
  {
    name: "description",
    label: "Mô tả sản phẩm",
    type: "textarea",
    icon: FiFileText,
    placeholder: "Nhập mô tả chi tiết về sản phẩm...",
    required: false,
    rows: 4,
  },
];

// ============= FORM FIELDS (EDIT) =============
export const PRODUCT_EDIT_FIELDS = PRODUCT_FIELDS;

// ============= HELPER FUNCTIONS =============
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
