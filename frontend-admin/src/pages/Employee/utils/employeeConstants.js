// ===============================================
// Location: src/pages/Employee/utils/employeeConstants.js
// ===============================================
import {
  FiUser,
  FiMail,
  FiShield,
  FiDollarSign,
  FiMapPin,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";

// ==================== STATS CONFIG ====================
export const STATS_CONFIG = [
  {
    key: "total",
    title: "Tổng nhân viên",
    icon: FiUsers,
    color: "blue",
  },
  {
    key: "active",
    title: "Đang làm việc",
    icon: FiUserCheck,
    color: "green",
  },
  {
    key: "inactive",
    title: "Nghỉ việc",
    icon: FiUserX,
    color: "orange",
  },
];

// ==================== ROLE TABS ====================
export const ROLE_TABS = [
  { id: "all", label: "Tất cả", role: null },
  { id: "manager", label: "Quản lý", role: "Quản lý" },
  { id: "baker", label: "Thợ làm bánh", role: "Thợ làm bánh" },
  { id: "sales", label: "Bán hàng", role: "Bán hàng" },
];

// ==================== EMPLOYEE FIELDS - ADD NEW ====================
export const EMPLOYEE_FIELDS = [
  {
    name: "name",
    label: "Họ và tên",
    type: "text",
    icon: FiUser,
    placeholder: "Nguyễn Văn A",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    inputType: "email",
    icon: FiMail,
    placeholder: "example@husbakery.vn",
    required: true,
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "text",
    inputType: "password",
    icon: FiShield,
    placeholder: "Mật khẩu đăng nhập",
    required: true,
    helpText: "Mật khẩu để nhân viên đăng nhập vào hệ thống",
  },
  {
    name: "role",
    label: "Vai trò",
    type: "select",
    icon: FiShield,
    required: true,
    options: [
      { value: "", label: "Chọn vai trò" },
      { value: "Quản lý", label: "Quản lý" },
      { value: "Thợ làm bánh", label: "Thợ làm bánh" },
      { value: "Bán hàng", label: "Bán hàng" },
    ],
  },
  {
    name: "salary",
    label: "Lương (VNĐ)",
    type: "text",
    inputType: "number",
    icon: FiDollarSign,
    placeholder: "9000000",
    required: true,
    defaultValue: "9000000",
  },
  {
    name: "branch_id",
    label: "Chi nhánh",
    type: "select",
    icon: FiMapPin,
    required: true,
    options: [], // Injected from Employee.jsx
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    icon: FiCheckCircle,
    required: false,
    defaultValue: "Đang làm việc",
    options: [
      { value: "Đang làm việc", label: "Đang làm việc" },
      { value: "Nghỉ việc", label: "Nghỉ việc" },
    ],
  },
];

// ==================== EMPLOYEE EDIT FIELDS - REMOVED BRANCH_ID ====================
export const EMPLOYEE_EDIT_FIELDS = [
  {
    name: "name",
    label: "Họ và tên",
    type: "text",
    icon: FiUser,
    placeholder: "Nguyễn Văn A",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    inputType: "email",
    icon: FiMail,
    placeholder: "example@husbakery.vn",
    required: true,
  },
  {
    name: "role",
    label: "Vai trò",
    type: "select",
    icon: FiShield,
    required: true,
    options: [
      { value: "", label: "Chọn vai trò" },
      { value: "Quản lý", label: "Quản lý" },
      { value: "Thợ làm bánh", label: "Thợ làm bánh" },
      { value: "Bán hàng", label: "Bán hàng" },
    ],
  },
  {
    name: "salary",
    label: "Lương (VNĐ)",
    type: "text",
    inputType: "number",
    icon: FiDollarSign,
    placeholder: "9000000",
    required: true,
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    icon: FiCheckCircle,
    required: false,
    options: [
      { value: "Đang làm việc", label: "Đang làm việc" },
      { value: "Nghỉ việc", label: "Nghỉ việc" },
    ],
  },
  // No branch_id in Edit mode to prevent branch modification
];

// ==================== HELPER FUNCTIONS ====================
export const getInitials = (name) => {
  if (!name) return "NA";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const getRoleColor = (role) => {
  switch (role) {
    case "Quản lý":
      return "purple";
    case "Thợ làm bánh":
      return "orange";
    case "Bán hàng":
      return "blue";
    default:
      return "default";
  }
};

export const getStatusColor = (status) => {
  return status === "Đang làm việc" ? "success" : "default";
};

export const getBranchName = (branchId, branches = []) => {
  const branch = branches.find((b) => b.value === String(branchId));
  return branch ? branch.label : `Chi nhánh ${branchId}`;
};