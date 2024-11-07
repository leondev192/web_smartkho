// src/pages/DashboardPage.js
import React, { useState, useContext } from "react";
import { Layout, Modal } from "antd";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import DataTable from "../components/DataTable";
import UserManagement from "../components/manager/UserManagement";
import ProductManagement from "../components/manager/ProductManagement";
import TransactionManagement from "../components/manager/TransactionManagement";
import SupplierManagement from "../components/manager/SupplierManagement";
import Reports from "../components/manager/Reports";
import TransactionHistoryManagement from "../components/manager/TransactionHistory";
import { AuthContext } from "../context/AuthContext";

const { Content } = Layout;

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("overview");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // Define a mapping of components
  const componentMap = {
    overview: <DataTable />,
    userManagement: <UserManagement />,
    productManagement: <ProductManagement />,
    transactionManagement: <TransactionManagement />,
    transactionHistory: <TransactionHistoryManagement />,
    supplierManagement: <SupplierManagement />,
    reports: <Reports />,
  };

  // Confirm logout
  const confirmLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    logout();
    setIsLogoutModalVisible(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  const changeComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar onLogout={confirmLogout} changeComponent={changeComponent} />
      <Layout>
        <HeaderBar onLogout={confirmLogout} />
        <Content
          style={{ margin: "24px 16px 0", padding: 24, background: "#f0f2f5" }}
        >
          {componentMap[activeComponent] || <DataTable />}
        </Content>
      </Layout>
      <Modal
        title="Xác nhận Đăng xuất"
        visible={isLogoutModalVisible}
        onOk={handleLogout}
        onCancel={cancelLogout}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        Bạn có chắc chắn muốn đăng xuất không?
      </Modal>
    </Layout>
  );
};

export default DashboardPage;
