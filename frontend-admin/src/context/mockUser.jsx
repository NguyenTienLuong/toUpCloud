// ===============================================
// FILE: src/context/mockUser.js
// FIXED: Sửa branch ID thành số để khớp với backend
// ===============================================

// Mock data chi nhánh
export const mockBranches = [
  {
    id: 1, // Số thực
    code: 'CN001',
    name: 'HUS Bakery - Hoàn Kiếm',
    address: '15 Hàng Bạc, Hoàn Kiếm, Hà Nội',
    phone: '0241234567',
    email: 'hoankiem@husbakery.vn',
    manager: 'Nguyễn Bảo Thạch',
    status: 'Hoạt động',
    revenue: 50000000,
    orders: 345,
    products: 120,
    customers: 89
  },
  {
    id: 2,
    code: 'CN002',
    name: 'HUS Bakery - Cầu Giấy',
    address: '89 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    phone: '0242345678',
    email: 'caugiay@husbakery.vn',
    manager: 'Nguyễn Tiến Lượng',
    status: 'Hoạt động',
    revenue: 45000000,
    orders: 289,
    products: 150,
    customers: 76
  },
  {
    id: 3,
    code: 'CN003',
    name: 'HUS Bakery - Đống Đa',
    address: '120 Tây Sơn, Đống Đa, Hà Nội',
    phone: '0243456789',
    email: 'dongda@husbakery.vn',
    manager: 'Lê Thị Yến',
    status: 'Hoạt động',
    revenue: 60000000,
    orders: 600,
    products: 186,
    customers: 120
  },
  {
    id: 4,
    code: 'CN004',
    name: 'HUS Bakery - Hà Đông',
    address: '65 Quang Trung, Hà Đông, Hà Nội',
    phone: '0244567890',
    email: 'hadong@husbakery.vn',
    manager: 'Lê Nguyễn Tố Uyên',
    status: 'Hoạt động',
    revenue: 38000000,
    orders: 234,
    products: 98,
    customers: 65
  },
  {
    id: 5,
    code: 'CN005',
    name: 'HUS Bakery - Thanh Xuân',
    address: '334, Nguyễn Trãi, Thanh Xuân, Hà Nội',
    phone: '0245678901',
    email: 'thanhxuan@husbakery.vn',
    manager: 'Nguyễn Văn Thu',
    status: 'Hoạt động',
    revenue: 52000000,
    orders: 412,
    products: 165,
    customers: 95
  }
];

// Helper function để lấy chi nhánh theo ID
export const getBranchById = (branchId) => {
  return mockBranches.find(b => b.id === branchId);
};