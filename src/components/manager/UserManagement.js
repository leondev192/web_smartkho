import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  message,
  Card,
  Typography,
  Avatar,
  Space,
  Spin,
} from "antd";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../../api/services/userService";
import UserForm from "../../components/form/UserForm";
import UserDetailModal from "../../components/modals/UserDetailModal";

const { Title } = Typography;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // Loading cho các hành động

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tải danh sách người dùng
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if (response.status === "success") {
        setUsers(response.data);
      } else {
        message.error("Lỗi khi tải danh sách người dùng!");
      }
    } catch (error) {
      message.error("Lỗi khi tải danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  // Tạo người dùng
  const handleCreateUser = async (values) => {
    try {
      setActionLoading(true);
      const response = await createUser(values);
      if (response.status === "success") {
        message.success(response.message || "Tạo tài khoản thành công!");
        fetchUsers(); // Tải lại danh sách sau khi thêm thành công
        setIsModalVisible(false);
      } else {
        message.error(response.message || "Đã xảy ra lỗi khi tạo tài khoản!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tạo tài khoản!");
    } finally {
      setActionLoading(false);
    }
  };

  // Cập nhật người dùng
  const handleUpdateUser = async (values) => {
    try {
      setActionLoading(true);
      const response = await updateUser(selectedUser.id, values);
      if (response.status === "success") {
        message.success(response.message || "Cập nhật tài khoản thành công!");
        fetchUsers(); // Tải lại danh sách sau khi cập nhật thành công
        setIsModalVisible(false);
      } else {
        message.error(
          response.message || "Đã xảy ra lỗi khi cập nhật tài khoản!"
        );
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật tài khoản!");
    } finally {
      setActionLoading(false);
    }
  };

  // Xóa người dùng
  const handleDeleteUser = async (id) => {
    try {
      setActionLoading(true);
      const response = await deleteUser(id);
      if (response.status === "success") {
        message.success(response.message || "Xóa tài khoản thành công!");
        fetchUsers(); // Tải lại danh sách sau khi xóa thành công
      } else {
        message.error(response.message || "Đã xảy ra lỗi khi xóa tài khoản!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi xóa tài khoản!");
    } finally {
      setActionLoading(false);
    }
  };

  const showCreateModal = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setIsModalVisible(true);
  };

  const showEditModal = async (userId) => {
    try {
      const response = await getUserById(userId);
      if (response.status === "success") {
        setSelectedUser(response.data);
        setIsEditMode(true);
        setIsModalVisible(true);
      } else {
        message.error("Không thể tải thông tin người dùng!");
      }
    } catch (error) {
      message.error("Không thể tải thông tin người dùng!");
    }
  };

  const showDetailModal = async (userId) => {
    try {
      const response = await getUserById(userId);
      if (response.status === "success") {
        setSelectedUser(response.data);
        setIsDetailModalVisible(true);
      } else {
        message.error("Không thể tải thông tin chi tiết của người dùng!");
      }
    } catch (error) {
      message.error("Không thể tải thông tin chi tiết của người dùng!");
    }
  };

  const columns = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (url) => <Avatar src={url} />,
    },
    { title: "Họ và Tên", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Vai Trò", dataIndex: "role", key: "role" },
    {
      title: "Hành Động",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => showDetailModal(record.id)}
            style={{ color: "#0096ff" }}
          >
            Chi tiết
          </Button>
          <Button
            type="link"
            onClick={() => showEditModal(record.id)}
            style={{ color: "#0096ff" }}
          >
            Cập nhật
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteUser(record.id)}
            loading={actionLoading}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={3}>Quản lý Người Dùng</Title>
        <Button
          type="primary"
          onClick={showCreateModal}
          style={{
            marginBottom: "16px",
            backgroundColor: "#0096ff",
            borderColor: "#0096ff",
            color: "#ffffff",
          }}
        >
          Thêm người dùng
        </Button>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={isEditMode ? "Cập nhật Người Dùng" : "Thêm Người Dùng"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <UserForm
          initialValues={selectedUser}
          onSubmit={isEditMode ? handleUpdateUser : handleCreateUser}
          isEditMode={isEditMode}
        />
      </Modal>

      <UserDetailModal
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;
