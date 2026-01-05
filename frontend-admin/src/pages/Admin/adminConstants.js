// ===============================================
// FILE: src/pages/Admin/adminConstants.js
// ===============================================
import { FiUser, FiMail, FiDollarSign, FiLock } from 'react-icons/fi';

export const ADMIN_FIELDS = [
  {
    name: 'username',
    label: 'Tên admin',
    type: 'text',
    icon: FiUser,
    placeholder: 'VD: Nguyễn Văn A',
    required: true,
    helpText: 'Tên hiển thị của admin'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    inputType: 'email',
    icon: FiMail,
    placeholder: 'VD: admin@husbakery.vn',
    required: true
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    type: 'text',
    inputType: 'password',
    icon: FiLock,
    placeholder: 'Để trống nếu không đổi',
    required: false,
    helpText: 'Chỉ nhập nếu muốn thay đổi mật khẩu'
  },
  {
    name: 'salary',
    label: 'Lương',
    type: 'text',
    inputType: 'number',
    icon: FiDollarSign,
    placeholder: 'VD: 15000000',
    required: false,
    helpText: 'Để trống nếu chưa xác định'
  },
  {
    name: 'status',
    label: 'Trạng thái',
    type: 'select',
    placeholder: 'Chọn trạng thái',
    required: true,
    defaultValue: 'Đang làm việc',
    options: [
      { value: 'Đang làm việc', label: 'Đang làm việc' },
      { value: 'Nghỉ việc', label: 'Nghỉ việc' }
    ]
  }
];

export const STATUS_CONFIG = {
  'Active': {
    color: 'success',
    label: 'Đang làm việc'
  },
  'Đang làm việc': {
    color: 'success',
    label: 'Đang làm việc'
  },
  'Inactive': {
    color: 'error',
    label: 'Nghỉ việc'
  },
  'Nghỉ việc': {
    color: 'error',
    label: 'Nghỉ việc'
  }
};

export const ROLE_CONFIG = {
  'Quản lý': {
    color: '#FFBD71',
    label: 'Admin'
  },
  'admin': {
    color: '#FFBD71',
    label: 'Admin'
  },
  'super_admin': {
    color: '#f59e0b',
    label: 'Super Admin'
  },
  'employee': {
    color: '#f59e0b',
    label: 'Super Admin'
  }
};

export const formatCurrency = (amount) => {
  if (!amount) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};