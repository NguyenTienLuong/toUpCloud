import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../utils/token";
import logo from "../assets/bakes.svg";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate(); // ✅ ĐÚNG CHỖ
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     1️⃣ Load user khi reload
  ======================= */
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .me()
      .then(async (res) => {
        if (!res.ok) {
          // Thay vì chỉ check 401, check tất cả lỗi
          logout();
          return;
        }
        const result = await res.json();

        // KIỂM TRA: Nếu server trả về { data: {...} } thì dùng result.data
        // Nếu server trả về thẳng {...} thì dùng result
        const userData = result.data ? result.data : result;

        setUser(userData);
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  /* =======================
     2️⃣ Login
  ======================= */
  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    tokenStorage.set(data.access_token);

    const meRes = await authApi.me();
    if (meRes.status === 401) throw new Error("Token không hợp lệ");

    const userData = await meRes.json();
    setUser(userData);

    return userData;
  };
  const signup = async (values) => {
    const res = await authApi.signup(values);
    const data = await res.json();

    if (!res.ok) {
      // Ném lỗi để component SignUp bắt được và hiển thị antd message
      throw data;
    }

    return data;
  };

  /* =======================
     3️⃣ Logout
  ======================= */
  const logout = () => {
    tokenStorage.remove();
    setUser(null);
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div style={{ width: "100%", height: "100%" }} className="fl-center">
        <img src={logo} alt="logoStore" style={{ width: "200px" }} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, signup, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
