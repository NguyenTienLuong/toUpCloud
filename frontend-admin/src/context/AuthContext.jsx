// // ===============================================
// // FILE: src/context/AuthContext.jsx
// // FIXED: Removed redundant loading UI, optimized logic
// // ===============================================
// import { createContext, useContext, useState, useEffect } from "react";
// import { message } from "antd";
// import { tokenStorage } from "../utils/token";
// import { fetchWithAuth } from "../utils/fetchWithAuth";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ========== KHỞI TẠO: ĐỌC TỪ LOCALSTORAGE ==========
//   useEffect(() => {
//     initializeAuth();
//   }, []);

//   /**
//    * Đọc thông tin admin từ localStorage
//    */
//   const initializeAuth = async () => {
//     try {
//       const params = new URLSearchParams(window.location.search);
//       const tokenFromUrl = params.get("token");

//       if (tokenFromUrl) {
//         tokenStorage.set(tokenFromUrl);
//         console.log(tokenFromUrl);
//         window.history.replaceState({}, "", window.location.pathname);
//       }
//       const token = tokenStorage.get();
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const storedUser = localStorage.getItem("admin_info");
//       if (storedUser) setUser(JSON.parse(storedUser));

//       const res = await fetchWithAuth("/api/me"); // endpoint thực tế
//       if (res.status === 401) {
//         console.log("[Auth] Token hết hạn, logout...");
//         resetAuthStorage();
//         return;
//       }
//       const adminInfoStr = localStorage.getItem("admin_info");

//       if (!adminInfoStr) {
//         console.log("[Auth] Chưa đăng nhập");
//         setLoading(false);
//         return;
//       }

//       const adminInfo = JSON.parse(adminInfoStr);
//       console.log("[Auth] Loaded user:", adminInfo);

//       setUser(adminInfo);
//     } catch (error) {
//       console.error("[Auth] Error:", error);
//       localStorage.removeItem("admin_info");
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("employee_id");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Đăng xuất
//    */
//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("employee_id");
//     localStorage.removeItem("admin_info");
//     setUser(null);
//     message.info("Đã đăng xuất");
//     window.location.href = "/";
//   };

//   /**
//    * Super Admin xem chi nhánh cụ thể
//    */
//   const viewBranch = (branch) => {
//     if (!isSuperAdmin) {
//       message.warning("Chỉ Super Admin mới có thể xem chi nhánh");
//       return;
//     }

//     const updatedUser = {
//       ...user,
//       viewing_branch: branch,
//     };

//     setUser(updatedUser);
//     localStorage.setItem("admin_info", JSON.stringify(updatedUser));
//     message.info(`Đang xem chi nhánh: ${branch.name}`);
//   };

//   /**
//    * Super Admin quay về xem tổng quan
//    */
//   const viewAllBranches = () => {
//     if (!isSuperAdmin) return;

//     const updatedUser = {
//       ...user,
//       viewing_branch: null,
//     };

//     setUser(updatedUser);
//     localStorage.setItem("admin_info", JSON.stringify(updatedUser));
//     message.info("Đã quay về chế độ xem tổng quan");
//   };

//   // ========== HELPER FUNCTIONS ==========

//   const isSuperAdmin = user?.role === "super_admin";
//   const isBranchAdmin = user?.role === "admin";
//   const isViewingBranch = isSuperAdmin && user?.viewing_branch !== null;

//   const getCurrentBranch = () => {
//     if (isBranchAdmin) {
//       return {
//         id: user.branch_id,
//         name: user.branch_name,
//       };
//     }

//     if (isViewingBranch) {
//       return user.viewing_branch;
//     }

//     return null;
//   };

//   // ========== PERMISSION CHECKS ==========

//   const canManageProducts = () => isSuperAdmin;
//   const canManageVouchers = () => isSuperAdmin;
//   const canViewProducts = () => isSuperAdmin || isBranchAdmin;
//   const canViewVouchers = () => isSuperAdmin || isBranchAdmin;
//   const canManageBranches = () => isSuperAdmin;

//   // ========== CONTEXT VALUE ==========

//   const value = {
//     user,
//     setUser,
//     loading,
//     logout,
//     isSuperAdmin,
//     isBranchAdmin,
//     isViewingBranch,
//     viewBranch,
//     viewAllBranches,
//     getCurrentBranch,
//     canManageProducts,
//     canManageVouchers,
//     canViewProducts,
//     canViewVouchers,
//     canManageBranches,
//   };

//   // ✅ FIXED: Removed redundant loading UI - handled in App.jsx
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth phải được sử dụng trong AuthProvider");
//   }
//   return context;
// };

// FILE: src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { message } from "antd";
// import { tokenStorage } from "../utils/token";
// import { fetchWithAuth } from "../utils/fetchWithAuth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ========== KHỞI TẠO ==========
//   useEffect(() => {
//     initializeAuth();
//   }, []);

//   const initializeAuth = async () => {
//     try {
//       // 1️⃣ Lấy token từ URL nếu có
//       const params = new URLSearchParams(window.location.search);
//       const tokenFromUrl = params.get("token");
//       if (tokenFromUrl) {
//         tokenStorage.set(tokenFromUrl); // lưu vào localStorage hoặc cookie
//         console.log("[Auth] Token from URL:", tokenFromUrl);
//         // Xóa token khỏi URL để tránh hiển thị
//         window.history.replaceState({}, "", window.location.pathname);
//       }

//       // 2️⃣ Lấy token từ storage
//       const token = tokenStorage.get();
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       // 3️⃣ Lấy user từ localStorage nếu có
//       const adminInfoStr = localStorage.getItem("admin_info");
//       if (adminInfoStr) setUser(JSON.parse(adminInfoStr));

//       // 4️⃣ Gọi API /me để xác thực token
//       const result = await fetchWithAuth("http://localhost:5001/api/me");

//       // Nếu token hết hạn
//       if (result.status === 401) {
//         console.log("[Auth] Token hết hạn, logout...");
//         resetAuthStorage();
//         return;
//       }

//       // Trích user từ response
//       const userData = result.data ? result.data : result;

//       setUser(userData);
//       localStorage.setItem("admin_info", JSON.stringify(userData));
//     } catch (error) {
//       console.error("[Auth] Lỗi khi load user:", error);
//       resetAuthStorage();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========== LOGOUT ==========
//   const logout = () => {
//     resetAuthStorage();
//     message.info("Đã đăng xuất");
//     window.location.href = "/"; // hoặc navigate("/login")
//   };

//   // ========== RESET AUTH STORAGE ==========
//   const resetAuthStorage = () => {
//     localStorage.removeItem("admin_info"); // giữ tên cũ
//     localStorage.removeItem("employee_id"); // giữ tên cũ
//     localStorage.removeItem("access_token"); // giữ tên cũ
//     tokenStorage.remove();
//     setUser(null);
//   };

//   // ========== HELPER FUNCTIONS ==========
//   const isSuperAdmin = user?.role === "super_admin";
//   const isBranchAdmin = user?.role === "admin";
//   const isViewingBranch = isSuperAdmin && user?.viewing_branch !== null;

//   const getCurrentBranch = () => {
//     if (isBranchAdmin) return { id: user.branch_id, name: user.branch_name };
//     if (isViewingBranch) return user.viewing_branch;
//     return null;
//   };

//   const viewBranch = (branch) => {
//     if (!isSuperAdmin) {
//       message.warning("Chỉ Super Admin mới có thể xem chi nhánh");
//       return;
//     }
//     const updatedUser = { ...user, viewing_branch: branch };
//     setUser(updatedUser);
//     localStorage.setItem("admin_info", JSON.stringify(updatedUser));
//     message.info(`Đang xem chi nhánh: ${branch.name}`);
//   };

//   const viewAllBranches = () => {
//     if (!isSuperAdmin) return;
//     const updatedUser = { ...user, viewing_branch: null };
//     setUser(updatedUser);
//     localStorage.setItem("admin_info", JSON.stringify(updatedUser));
//     message.info("Đã quay về chế độ xem tổng quan");
//   };

//   // ========== PERMISSION CHECKS ==========
//   const canManageProducts = () => isSuperAdmin;
//   const canManageVouchers = () => isSuperAdmin;
//   const canViewProducts = () => isSuperAdmin || isBranchAdmin;
//   const canViewVouchers = () => isSuperAdmin || isBranchAdmin;
//   const canManageBranches = () => isSuperAdmin;

//   // ========== CONTEXT VALUE ==========
//   const value = {
//     user,
//     setUser,
//     loading,
//     logout,
//     isSuperAdmin,
//     isBranchAdmin,
//     isViewingBranch,
//     viewBranch,
//     viewAllBranches,
//     getCurrentBranch,
//     canManageProducts,
//     canManageVouchers,
//     canViewProducts,
//     canViewVouchers,
//     canManageBranches,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth phải được sử dụng trong AuthProvider");
//   return context;
// };

// FILE: src/context/AuthContext.jsx
// FIXED: Role mapping for Vietnamese role names
import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { tokenStorage } from "../utils/token";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);

  const [loadingBranch, setLoadingBranch] = useState(false);
  useEffect(() => {
    const fetchBranches = async () => {
      setLoadingBranch(true);
      try {
        const res = await fetch(
          "http://localhost:5001/api/account/branch_detail",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        // Trước khi parse JSON, kiểm tra Content-Type
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server trả về không phải JSON");
        }

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Fetch branch thất bại");

        setBranches(data.details || data);
      } catch (err) {
        console.error("Lỗi fetch branch:", err);
      } finally {
        setLoadingBranch(false);
      }
    };

    fetchBranches();
  }, []);

  // ========== KHỞI TẠO ==========
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // 1️⃣ Lấy token từ URL nếu có
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");
      if (tokenFromUrl) {
        tokenStorage.set(tokenFromUrl);
        console.log("[Auth] Token from URL:", tokenFromUrl);
        window.history.replaceState({}, "", window.location.pathname);
      }

      // 2️⃣ Lấy token từ storage
      const token = tokenStorage.get();
      if (!token) {
        setLoading(false);
        return;
      }

      // 3️⃣ Lấy user từ localStorage nếu có
      const adminInfoStr = localStorage.getItem("admin_info");
      if (adminInfoStr) setUser(JSON.parse(adminInfoStr));

      // 4️⃣ Gọi API /me để xác thực token
      const result = await fetchWithAuth("http://localhost:5001/api/me");

      if (result.status === 401) {
        console.log("[Auth] Token hết hạn, logout...");
        resetAuthStorage();
        return;
      }

      const apiData = result.data ? result.data : result;

      // ✅ Transform API response to match frontend structure
      const userData = {
        id: apiData.id,
        name: apiData.full_name || apiData.name,
        email: apiData.email,
        role: mapRoleNameToCode(apiData.role), // ← Convert Vietnamese role to code
        role_name: apiData.role, // Giữ tên gốc tiếng Việt
        salary: apiData.salary,
        status: apiData.status,
        branch_id: apiData.branch_id,
        branch_name: apiData.branch_name || null,
        viewing_branch: null, // Mặc định không xem branch nào
      };

      console.log("[Auth] Loaded user:", userData);
      setUser(userData);
      localStorage.setItem("admin_info", JSON.stringify(userData));
    } catch (error) {
      console.error("[Auth] Lỗi khi load user:", error);
      resetAuthStorage();
    } finally {
      setLoading(false);
    }
  };

  // ========== ROLE MAPPING ==========
  const mapRoleNameToCode = (roleName) => {
    const mapping = {
      "Siêu quản lý": "super_admin",
      "Quản lý": "admin",
      // Fallback cho các tên khác (nếu có)
      "Super Admin": "super_admin",
      Admin: "admin",
      "Branch Admin": "admin",
    };

    const roleCode = mapping[roleName];

    if (!roleCode) {
      console.warn(`[Auth] Unknown role: ${roleName}, defaulting to 'admin'`);
      return "admin";
    }

    return roleCode;
  };

  // ========== LOGOUT ==========
  const logout = () => {
    resetAuthStorage();
    message.info("Đã đăng xuất");
    window.location.href = "http://localhost:3000/";
  };

  // ========== RESET AUTH STORAGE ==========
  const resetAuthStorage = () => {
    localStorage.removeItem("admin_info");
    localStorage.removeItem("employee_id");
    localStorage.removeItem("access_token");
    tokenStorage.remove();
    setUser(null);
  };

  // ========== HELPER FUNCTIONS ==========
  const isSuperAdmin = user?.role === "super_admin";
  const isBranchAdmin = user?.role === "admin";
  const isViewingBranch = isSuperAdmin && user?.viewing_branch !== null;

  const getBranchNameById = (id) => {
    console.log(branches);
    const branch = branches.find((b) => b.id === id); // hoặc b.branch_id tùy backend
    return branch ? branch.name || branch.branch_name : "Unknown Branch";
  };
  const getCurrentBranch = () => {
    if (isBranchAdmin)
      return { id: user.branch_id, name: getBranchNameById(user.branch_id) };
    if (isViewingBranch) return user.viewing_branch;
    return null;
  };

  const viewBranch = (branch) => {
    if (!isSuperAdmin) {
      message.warning("Chỉ Super Admin mới có thể xem chi nhánh");
      return;
    }
    const updatedUser = { ...user, viewing_branch: branch };
    setUser(updatedUser);
    localStorage.setItem("admin_info", JSON.stringify(updatedUser));
    message.info(`Đang xem chi nhánh: ${branch.name}`);
  };

  const viewAllBranches = () => {
    if (!isSuperAdmin) return;
    const updatedUser = { ...user, viewing_branch: null };
    setUser(updatedUser);
    localStorage.setItem("admin_info", JSON.stringify(updatedUser));
    message.info("Đã quay về chế độ xem tổng quan");
  };

  // ========== PERMISSION CHECKS ==========
  const canManageProducts = () => isSuperAdmin;
  const canManageVouchers = () => isSuperAdmin;
  const canViewProducts = () => isSuperAdmin || isBranchAdmin;
  const canViewVouchers = () => isSuperAdmin || isBranchAdmin;
  const canManageBranches = () => isSuperAdmin;

  // ========== CONTEXT VALUE ==========
  const value = {
    user,
    setUser,
    loading,
    logout,
    isSuperAdmin,
    isBranchAdmin,
    isViewingBranch,
    viewBranch,
    viewAllBranches,
    getCurrentBranch,
    canManageProducts,
    canManageVouchers,
    canViewProducts,
    canViewVouchers,
    canManageBranches,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được sử dụng trong AuthProvider");
  return context;
};
