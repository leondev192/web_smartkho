import React from "react";
import { Layout, Typography, Avatar, Dropdown, Menu, message } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const HeaderBar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Retrieve user information from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const avatarUrl = user?.avatarUrl || null;
  const fullName = user?.fullName || "Guest";

  // Local handleLogout in case onLogout prop isn't provided
  const localLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Call the parent-provided onLogout if available
    } else {
      localLogout(); // Otherwise, use local logout logic
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Hồ sơ cá nhân</Menu.Item>
      <Menu.Item key="2">Cài đặt</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Title level={3} style={{ margin: 0, color: "#0096ff" }}>
        Tổng Quan Bảng Điều Khiển
      </Title>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Avatar src={avatarUrl} size="large" icon={<UserOutlined />} />
          <span
            style={{ marginLeft: "8px", fontWeight: "bold", color: "#333" }}
          >
            {fullName}
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default HeaderBar;
