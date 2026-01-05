// // ===============================================
// // Location: src/App.jsx
// // FIXED: Proper role handling for super_admin and admin
// // ===============================================
// import { Suspense, useMemo } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Layout from "./components/Layout/Layout";
// import { getRoutesForUser } from "./routes";
// import { Spin } from "antd";
// import "antd/dist/reset.css";

// // Loading fallback for lazy loading
// function LoadingFallback() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         fontSize: "18px",
//         color: "#666",
//       }}
//     >
//       <Spin size="large" />
//       <p style={{ marginLeft: 16 }}>Đang tải trang...</p>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Suspense fallback={<LoadingFallback />}>
//           <AppContent />
//         </Suspense>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// // Component to render routes based on user session
// function AppContent() {
//   const { user, loading } = useAuth();

//   //
//   const routes = useMemo(() => {
//     if (!user) return [];
//     return getRoutesForUser(user);
//   }, [user]);

//   // Show loading only during initial auth check
//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         }}
//       >
//         <Spin size="large" />
//         <p
//           style={{
//             marginTop: 20,
//             color: "white",
//             fontSize: 16,
//             fontWeight: 500,
//           }}
//         >
//           Đang tải thông tin...
//         </p>
//       </div>
//     );
//   }

//   // //  MOCK LOGIN - Will be replaced with real Login component
//   // if (!user) {
//   //   return (
//   //     <div style={{
//   //       display: 'flex',
//   //       flexDirection: 'column',
//   //       justifyContent: 'center',
//   //       alignItems: 'center',
//   //       height: '100vh',
//   //       background: '#f8f9fa'
//   //     }}>
//   //       <h2 style={{ marginBottom: 8 }}>Bạn chưa đăng nhập</h2>
//   //       <p style={{ color: '#666', marginBottom: 24 }}>Vui lòng đăng nhập để tiếp tục</p>

//   //       {/* MOCK: Super Admin Login */}
//   //       <button
//   //         onClick={() => {
//   //           const mockSuperAdmin = {
//   //             id: 'SA001',
//   //             name: 'Helen Walter',
//   //             email: 'helen@husbakery.vn',
//   //             role: 'super_admin', // ← Role trong routes
//   //             role_name: 'Super Admin',
//   //             salary: 20000000,
//   //             status: 'Active',
//   //             branch_id: null,
//   //             branch_name: null,
//   //             viewing_branch: null // ← null = xem tất cả chi nhánh
//   //           };
//   //           localStorage.setItem('admin_info', JSON.stringify(mockSuperAdmin));
//   //           localStorage.setItem('employee_id', 'SA001');
//   //           localStorage.setItem('access_token', 'mock_token');
//   //           window.location.reload();
//   //         }}
//   //         style={{
//   //           marginBottom: 12,
//   //           padding: '12px 32px',
//   //           background: '#667eea',
//   //           color: 'white',
//   //           border: 'none',
//   //           borderRadius: 8,
//   //           cursor: 'pointer',
//   //           fontSize: 14,
//   //           fontWeight: 600,
//   //           boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
//   //         }}
//   //       >
//   //         Login as Super Admin
//   //       </button>

//   //       {/* MOCK: Branch Admin (admin role) Login */}
//   //       <button
//   //         onClick={() => {
//   //           const mockBranchAdmin = {
//   //             id: 'BA001',
//   //             name: 'Nguyễn Bảo Thạch',
//   //             email: 'thach@husbakery.vn',
//   //             role: 'admin', // ← Role cho Branch Admin
//   //             role_name: 'Quản lý Chi nhánh',
//   //             salary: 15000000,
//   //             status: 'Active',
//   //             branch_id: 1,
//   //             branch_name: 'HUS Bakery - Hoàn Kiếm',
//   //             viewing_branch: null // ← Branch Admin không cần viewing_branch
//   //           };
//   //           localStorage.setItem('admin_info', JSON.stringify(mockBranchAdmin));
//   //           localStorage.setItem('employee_id', 'BA001');
//   //           localStorage.setItem('access_token', 'mock_token');
//   //           window.location.reload();
//   //         }}
//   //         style={{
//   //           padding: '12px 32px',
//   //           background: '#f59e0b',
//   //           color: 'white',
//   //           border: 'none',
//   //           borderRadius: 8,
//   //           cursor: 'pointer',
//   //           fontSize: 14,
//   //           fontWeight: 600,
//   //           boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
//   //         }}
//   //       >
//   //         Login as Branch Admin
//   //       </button>
//   //     </div>
//   //   );
//   // }

//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {routes.map((route) => {
//           const Component = route.element;
//           return (
//             <Route key={route.path} path={route.path} element={<Component />} />
//           );
//         })}
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import { getRoutesForUser } from "./routes";
import { Spin } from "antd";
import "antd/dist/reset.css";

// Fallback loading
function LoadingFallback() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#666",
      }}
    >
      <Spin size="large" />
      <p style={{ marginLeft: 16 }}>Đang tải trang...</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <AppContent />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Renders routes based on logged-in user
function AppContent() {
  const { user, loading } = useAuth();

  const routes = useMemo(() => getRoutesForUser(user), [user]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Spin size="large" />
        <p
          style={{
            marginTop: 20,
            color: "white",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Đang tải thông tin...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* Layout wrapper */}
      <Route path="/" element={<Layout />}>
        {/* Khi truy cập / → redirect /dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Các route của user */}
        {routes.map((route) => {
          const Component = route.element;
          // dùng path relative (không có / đầu)
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}

        {/* Catch all 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: 40, textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
