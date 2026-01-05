// File: src/pages/Login/Login.jsx

import { Form, Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bakesLogo from "../../assets/bakes.svg";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const user = await login(values.email, values.password);

      // Điều hướng theo role
      if (user.role === "employee") {
        navigate("/admin/dashboard");
      } else if (user.role === "super_admin") {
        navigate("/superadmin/dashboard");
      } else if (user.role === "shipper") {
        navigate("/shipperDashBoard");
      } else {
        navigate("/"); // customer
      }
    } catch (err) {
      alert(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bound">
      <div className="fl-center bg-color pb-6 pt-3">
        <img src={bakesLogo} alt="Logo" style={{ height: "100px" }} />
        <Form
          style={{ maxWidth: "430px", width: "80%" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              className="btn btn-primary w100"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
