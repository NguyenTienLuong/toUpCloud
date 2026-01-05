// // ===============================================
// // Location: src/routes/index.jsx
// // UPDATED: Fixed redirect logic for Branch Admin
// // ===============================================
// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

// // Lazy loading pages for better performance
// const DashboardView = lazy(() => import("../pages/Dashboard/DashboardView"));
// const ProductsView = lazy(() => import("../pages/Products/ProductsView"));
// const CustomersView = lazy(() => import("../pages/Customers/CustomersView"));
// const OrdersView = lazy(() => import("../pages/Orders/OrdersView"));
// const Employee = lazy(() => import("../pages/Employee/Employee"));
// const Shipper = lazy(() => import("../pages/Shipper/Shipper"));
// const Voucher = lazy(() => import("../pages/Voucher/Voucher"));
// const BranchView = lazy(() => import("../pages/Branch/BranchView"));
// const AdminView = lazy(() => import("../pages/Admin/AdminView"));

// // Individual Redirect Component
// const DashboardRedirect = () => <Navigate to="/dashboard" replace />;

// // ========================================
// // SUPER ADMIN ROUTES (Global Scope)
// // ========================================
// export const superAdminRoutes = [
//   {
//     path: "/",
//     element: DashboardRedirect,
//     hideInMenu: true
//   },
//   {
//     path: "dashboard",
//     element: DashboardView,
//     name: "Dashboard Tổng",
//     icon: "dashboard",
//     roles: ["super_admin"],
//   },
//   {
//     path: "branches",
//     element: BranchView,
//     name: "Quản lý Chi nhánh",
//     icon: "store",
//     roles: ["super_admin"],
//   },
//   {
//     path: "products",
//     element: ProductsView,
//     name: "Quản lý Sản phẩm",
//     icon: "inventory",
//     roles: ["super_admin"],
//   },
//   {
//     path: "voucher",
//     element: Voucher,
//     name: "Quản lý Voucher",
//     icon: "confirmation_number",
//     roles: ["super_admin"],
//   },
//   {
//     path: "admins",
//     element: AdminView,
//     name: "Quản lý Admin",
//     icon: "admin_panel_settings",
//     roles: ["super_admin"],
//   },
//   {
//     path: "*",
//     element: () => (
//       <div style={{ padding: "40px", textAlign: "center" }}>
//         <h1>404 - Page Not Found</h1>
//         <p>The page you are looking for does not exist.</p>
//       </div>
//     ),
//     hideInMenu: true
//   },
// ];

// // ========================================
// // BRANCH ROUTES (Branch Scope)
// // For Branch Admin or Super Admin viewing a specific branch
// // ========================================
// export const branchRoutes = [
//   {
//     path: "/",
//     element: DashboardRedirect,
//     hideInMenu: true
//   },
//   {
//     path: "dashboard",
//     element: DashboardView,
//     name: "Dashboard",
//     icon: "dashboard",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "products",
//     element: ProductsView,
//     name: "Sản phẩm",
//     icon: "inventory",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "orders",
//     element: OrdersView,
//     name: "Đơn hàng",
//     icon: "shopping_cart",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "customers",
//     element: CustomersView,
//     name: "Khách hàng",
//     icon: "people",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "employee",
//     element: Employee,
//     name: "Nhân viên",
//     icon: "badge",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "shipper",
//     element: Shipper,
//     name: "Shipper",
//     icon: "local_shipping",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "voucher",
//     element: Voucher,
//     name: "Voucher",
//     icon: "confirmation_number",
//     roles: ["admin", "super_admin_viewing_branch"],
//   },
//   {
//     path: "*",
//     element: () => (
//       <div style={{ padding: "40px", textAlign: "center" }}>
//         <h1>404 - Page Not Found</h1>
//         <p>The page you are looking for does not exist.</p>
//       </div>
//     ),
//     hideInMenu: true
//   },
// ];

// // ========================================
// // Helper: Get routes based on User Role & Context
// // ========================================
// export const getRoutesForUser = (user) => {
//   if (!user) return [];

//   const isSuperAdmin = user?.role === 'super_admin';
//   const isViewingBranch = isSuperAdmin && user?.viewing_branch !== null;

//   // Return Branch Routes if user is Branch Admin or Super Admin focusing on a branch
//   if (isViewingBranch || user?.role === 'admin') {
//     return branchRoutes;
//   }

//   // Return Super Admin Routes for global management
//   if (isSuperAdmin) {
//     return superAdminRoutes;
//   }

//   return [];
// };

// ===============================================
// Location: src/routes/index.jsx
// UPDATED: Unified Super Admin & Branch Admin routes
// ===============================================
import { lazy } from "react";

// Lazy loading pages
const DashboardView = lazy(() => import("../pages/Dashboard/DashboardView"));
const ProductsView = lazy(() => import("../pages/Products/ProductsView"));
const CustomersView = lazy(() => import("../pages/Customers/CustomersView"));
const OrdersView = lazy(() => import("../pages/Orders/OrdersView"));
const Employee = lazy(() => import("../pages/Employee/Employee"));
const Shipper = lazy(() => import("../pages/Shipper/Shipper"));
const Voucher = lazy(() => import("../pages/Voucher/Voucher"));
const BranchView = lazy(() => import("../pages/Branch/BranchView"));
const AdminView = lazy(() => import("../pages/Admin/AdminView"));

// 404 fallback
const NotFound = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

// ========================================
// Super Admin routes (global)
// ========================================
export const superAdminRoutes = [
  {
    path: "dashboard",
    element: DashboardView,
    name: "Dashboard Tổng",
    roles: ["super_admin"],
  },
  {
    path: "branches",
    element: BranchView,
    name: "Quản lý Chi nhánh",
    roles: ["super_admin"],
  },
  {
    path: "products",
    element: ProductsView,
    name: "Quản lý Sản phẩm",
    roles: ["super_admin"],
  },
  {
    path: "voucher",
    element: Voucher,
    name: "Quản lý Voucher",
    roles: ["super_admin"],
  },
  {
    path: "admins",
    element: AdminView,
    name: "Quản lý Admin",
    roles: ["super_admin"],
  },
];

// ========================================
// Branch routes (Branch Admin or Super Admin viewing branch)
// ========================================
export const branchRoutes = [
  {
    path: "dashboard",
    element: DashboardView,
    name: "Dashboard",
    roles: ["admin", "super_admin_viewing_branch"],
  },
  {
    path: "products",
    element: ProductsView,
    name: "Sản phẩm",
    roles: ["admin", "super_admin_viewing_branch"],
  },
  {
    path: "orders",
    element: OrdersView,
    name: "Đơn hàng",
    roles: ["admin", "super_admin_viewing_branch"],
  },
  {
    path: "customers",
    element: CustomersView,
    name: "Khách hàng",
    roles: ["admin", "super_admin_viewing_branch"],
  },
  {
    path: "employee",
    element: Employee,
    name: "Nhân viên",
    roles: ["admin", "super_admin_viewing_branch"],
  },
  {
    path: "shipper",
    element: Shipper,
    name: "Shipper",
    roles: ["admin", "super_admin_viewing_branch"],
  },
  {
    path: "voucher",
    element: Voucher,
    name: "Voucher",
    roles: ["admin", "super_admin_viewing_branch"],
  },
];

// ========================================
// Helper: Get routes based on user role
// ========================================
export const getRoutesForUser = (user) => {
  if (!user) return [];

  const isSuperAdmin = user?.role === "super_admin";
  const isViewingBranch = isSuperAdmin && user?.viewing_branch !== null;

  if (isViewingBranch || user?.role === "admin") return branchRoutes;
  if (isSuperAdmin) return superAdminRoutes;

  return [];
};
