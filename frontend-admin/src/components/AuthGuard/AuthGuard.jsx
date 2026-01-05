// ===============================================
// FILE: frontend-admin/src/components/AuthGuard/AuthGuard.jsx
// ✅ Bảo vệ routes admin, tích hợp với tokenStorage
// ===============================================
import { Navigate } from "react-router-dom";
import { tokenStorage } from "../../utils/token";

export default function AuthGuard({ children, requireAuth = false }) {
  const token = tokenStorage.get();
  const adminInfoStr = localStorage.getItem("admin_info");

  // ❌ Route yêu cầu đăng nhập nhưng KHÔNG có token
  if (requireAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Có token nhưng KHÔNG có thông tin admin (bất thường)
  if (requireAuth && token && !adminInfoStr) {
    tokenStorage.remove();
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ✅ Kiểm tra quyền admin
  if (requireAuth && adminInfoStr) {
    try {
      const adminInfo = JSON.parse(adminInfoStr);
      
      // Chỉ cho phép admin và super_admin
      if (adminInfo.role !== "admin" && adminInfo.role !== "super_admin") {
        tokenStorage.remove();
        localStorage.clear();
        return <Navigate to="/login" replace />;
      }
    } catch (err) {
      console.error("Error parsing admin_info:", err);
      tokenStorage.remove();
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  }

  // ✅ Đã đăng nhập và cố truy cập trang /login
  if (!requireAuth && token && adminInfoStr) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}