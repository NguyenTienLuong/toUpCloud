// ===============================================
// FILE: src/pages/Voucher/voucherConstants.js
// ===============================================
import {
  FiTag,
  FiPercent,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiShoppingCart,
  FiCheckCircle,
  FiTarget,
} from "react-icons/fi";

export const STATS_CONFIG = [
  {
    key: "total",
    title: "Tổng voucher",
    icon: FiTag,
    color: "blue",
  },
  {
    key: "active",
    title: "Đang hoạt động",
    icon: FiCheckCircle,
    color: "green",
  },
  {
    key: "expired",
    title: "Hết hạn",
    icon: FiTarget,
    color: "orange",
  },
  {
    key: "totalUsed",
    title: "Lượt sử dụng",
    icon: FiShoppingCart,
    color: "purple",
  },
];

//  VOUCHER FIELDS - ĐẦY ĐỦ THEO BACKEND
export const VOUCHER_FIELDS = [
  {
    name: "description",
    label: "Mô tả voucher",
    type: "text",
    icon: FiFileText,
    placeholder: "VD: Giảm 30% cho đơn hàng từ 500k",
    required: true,
    helperText: "Mô tả ngắn gọn về voucher",
  },
  {
    name: "discount_type",
    label: "Loại giảm giá",
    type: "select",
    icon: FiTag,
    required: true,
    options: [
      { value: "", label: "Chọn loại giảm giá" },
      { value: "percent", label: "Giảm theo phần trăm (%)" },
      { value: "value", label: "Giảm theo số tiền (VNĐ)" },
    ],
  },
  {
    name: "discount_value",
    label: "Giá trị giảm",
    type: "text",
    inputType: "number",
    icon: FiPercent,
    placeholder: "VD: 30 hoặc 50000",
    required: false,
    helperText: "Nhập % hoặc số tiền tùy theo loại",
  },
  {
    name: "discount_percent",
    label: "Phần trăm giảm (nếu có)",
    type: "text",
    inputType: "number",
    icon: FiPercent,
    placeholder: "0-100",
    required: false,
    helperText: "Để trống nếu dùng discount_value",
  },
  {
    name: "min_purchase",
    label: "Giá trị đơn hàng tối thiểu (VNĐ)",
    type: "text",
    inputType: "number",
    icon: FiShoppingCart,
    placeholder: "VD: 300000",
    required: true,
    defaultValue: "0",
    helperText: "Đơn hàng tối thiểu để áp dụng voucher",
  },
  {
    name: "max_discount",
    label: "Giảm tối đa (VNĐ)",
    type: "text",
    inputType: "number",
    icon: FiDollarSign,
    placeholder: "VD: 100000",
    required: false,
    defaultValue: "0",
    helperText: "Giới hạn số tiền giảm tối đa (nếu có)",
  },
  {
    name: "begin_date",
    label: "Ngày bắt đầu",
    type: "date",
    icon: FiCalendar,
    required: true,
    helperText: "Chọn ngày bắt đầu (định dạng: dd/mm/yyyy)",
  },
  {
    name: "end_date",
    label: "Ngày kết thúc",
    type: "date",
    icon: FiCalendar,
    required: true,
    helperText: "Chọn ngày kết thúc (định dạng: dd/mm/yyyy)",
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    icon: FiCheckCircle,
    required: false,
    defaultValue: "active",
    options: [
      { value: "active", label: "Hoạt động" },
      { value: "inactive", label: "Ngừng hoạt động" },
    ],
  },
];

//  FORMAT HELPERS
export const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDiscount = (voucher) => {
  if (!voucher) return "—";

  const value = voucher.discount_value || 0;
  const isPercent = voucher.discount_type === "percent";

  if (isPercent) {
    return `${value}%`;
  } else {
    return `${value.toLocaleString("vi-VN")}đ`;
  }
};

//  Helper: Convert date từ backend sang input format
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    console.log(" Converting date:", dateString);

    // "Wed, 31 Dec 2025 00:00:00 GMT" -> "2025-12-31"
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error(" Invalid date:", dateString);
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const result = `${year}-${month}-${day}`;
    console.log(" Converted to:", result);

    return result;
  } catch (error) {
    console.error(" Error converting date:", error);
    return "";
  }
};

// Helper: Convert input date sang ISO string cho backend
export const formatDateForBackend = (dateString) => {
  if (!dateString) return "";
  try {
    // "2025-12-31" -> ISO string
    const date = new Date(dateString);
    return date.toISOString();
  } catch {
    return "";
  }
};
