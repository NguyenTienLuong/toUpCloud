// ===============================================
// FILE: src/pages/Shipper/shipperConstants.js
// ===============================================
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiMapPin,
  FiDollarSign,
  FiStar,
} from "react-icons/fi";

// ============= STATUS OPTIONS =============
export const STATUS_OPTIONS = [
  { value: "Đang hoạt động", label: "Đang hoạt động" },
  { value: "Đang giao", label: "Đang giao" },
  { value: "Nghỉ việc", label: "Nghỉ việc" },
];

// ============= SHIPPER FIELDS - THÊM MỚI =============
export const SHIPPER_FIELDS = [
  {
    name: "shipper_name",
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
    name: "phone",
    label: "Số điện thoại",
    type: "text",
    icon: FiPhone,
    placeholder: "0901234567",
    required: true,
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "text",
    inputType: "password",
    icon: FiCheckCircle,
    placeholder: "Mật khẩu đăng nhập",
    required: true,
    helpText: "Mật khẩu để shipper đăng nhập vào hệ thống",
  },
  {
    name: "branch_id",
    label: "Chi nhánh",
    type: "select",
    icon: FiMapPin,
    required: true,
    options: [],
  },
  {
    name: "salary",
    label: "Lương cơ bản (VNĐ)",
    type: "text",
    inputType: "number",
    icon: FiDollarSign,
    placeholder: "8000000",
    required: false,
    defaultValue: "8000000",
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    icon: FiCheckCircle,
    required: false,
    defaultValue: "Đang hoạt động",
    options: STATUS_OPTIONS,
  },
];

// ============= SHIPPER EDIT FIELDS =============
export const SHIPPER_EDIT_FIELDS = [
  {
    name: "shipper_name",
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
    name: "phone",
    label: "Số điện thoại",
    type: "text",
    icon: FiPhone,
    placeholder: "0901234567",
    required: true,
  },
  {
    name: "salary",
    label: "Lương cơ bản (VNĐ)",
    type: "text",
    inputType: "number",
    icon: FiDollarSign,
    placeholder: "8000000",
    required: false,
  },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    icon: FiCheckCircle,
    required: false,
    options: STATUS_OPTIONS,
  },
];

// ============= HELPER FUNCTIONS =============
export const getInitials = (name) => {
  if (!name) return "NA";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Đang hoạt động":
      return "success";
    case "Đang giao":
      return "warning";
    case "Nghỉ việc":
      return "default";
    default:
      return "default";
  }
};

export const getBranchName = (branchId, branches) => {
  const branch = branches.find((b) => b.value === String(branchId));
  return branch ? branch.label : `Chi nhánh ${branchId}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export { FiStar };
