import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Typography, Card } from "antd";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/logo.png";
import { login as loginService } from "../api/services/authService";

const { Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // Access login function from context

  const handleLogin = async (values) => {
    setLoading(true);
    const result = await loginService(values.email, values.password);
    setLoading(false);

    if (result.status === "success") {
      message.success(result.message);

      // Call the login function from AuthContext to update auth state and navigate
      login(result.data.token, result.data.user);
    } else {
      message.error(result.message || "Đăng nhập thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: "40px 24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
          borderColor: "#0096ff",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <img src={logo} alt="Logo" style={{ width: 200, marginBottom: 20 }} />

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "#0096ff" }}>
                Email
              </span>
            }
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input type="email" placeholder="Nhập email của bạn" size="large" />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "#0096ff" }}>
                Mật khẩu
              </span>
            }
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu của bạn" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                backgroundColor: "#0096ff",
                borderColor: "#0096ff",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Text style={{ color: "#999", marginTop: "16px", display: "block" }}>
          Quên mật khẩu?{" "}
          <a href="#" style={{ color: "#0096ff" }}>
            Khôi phục tại đây
          </a>
        </Text>
      </Card>
    </div>
  );
};

export default LoginPage;
