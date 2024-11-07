import React, { useState } from "react";
import { Layout, Menu, Typography, Image } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ShopOutlined,
  TransactionOutlined,
  HistoryOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/smartkho.png"; // Đường dẫn đến logo

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ onLogout, changeComponent }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      theme="light"
      width={250}
      style={{
        minHeight: "100vh",
        boxShadow: "2px 0 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff", // Nền sáng nhẹ nhàng
      }}
    >
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Image
          src={logo}
          width={collapsed ? 50 : 120}
          preview={false}
          style={{ transition: "width 0.3s" }}
        />
      </div>

      <Menu theme="light" mode="inline" defaultSelectedKeys={["dashboard"]}>
        {/* Dashboard Section */}
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("overview")}
          style={{
            fontWeight: "bold",
            color: "#0096ff",
          }}
        >
          Bảng Điều Khiển
        </Menu.Item>

        <Menu.Divider />

        {/* User Management Section */}
        {!collapsed && (
          <Text
            style={{
              color: "#555",
              marginLeft: "16px",
              marginBottom: "8px",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Quản Lý Người Dùng
          </Text>
        )}
        <Menu.Item
          key="users"
          icon={<UserOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("userManagement")}
        >
          Người Dùng
        </Menu.Item>
        <Menu.Item
          key="suppliers"
          icon={<TeamOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("supplierManagement")}
        >
          Nhà Cung Cấp
        </Menu.Item>

        <Menu.Divider />

        {/* Product Management Section */}
        {!collapsed && (
          <Text
            style={{
              color: "#555",
              marginLeft: "16px",
              marginBottom: "8px",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Quản Lý Sản Phẩm
          </Text>
        )}
        <Menu.Item
          key="products"
          icon={<ShopOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("productManagement")}
        >
          Sản Phẩm
        </Menu.Item>

        <Menu.Divider />

        {/* Transaction Management Section */}
        {!collapsed && (
          <Text
            style={{
              color: "#555",
              marginLeft: "16px",
              marginBottom: "8px",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Quản Lý Giao Dịch
          </Text>
        )}
        <Menu.Item
          key="transactions"
          icon={<TransactionOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("transactionManagement")}
        >
          Giao Dịch
        </Menu.Item>
        <Menu.Item
          key="history"
          icon={<HistoryOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("transactionHistory")}
        >
          Lịch Sử Giao Dịch
        </Menu.Item>

        <Menu.Divider />

        {/* Reports Section */}
        {!collapsed && (
          <Text
            style={{
              color: "#555",
              marginLeft: "16px",
              marginBottom: "8px",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Báo Cáo
          </Text>
        )}
        <Menu.Item
          key="reports"
          icon={<FileTextOutlined style={{ color: "#0096ff" }} />}
          onClick={() => changeComponent("reports")}
        >
          Báo Cáo
        </Menu.Item>

        <Menu.Divider />

        {/* Logout */}
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined style={{ color: "#ff4d4f" }} />}
          onClick={onLogout}
          style={{
            fontWeight: "bold",
            color: "#ff4d4f",
          }}
        >
          Đăng Xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
