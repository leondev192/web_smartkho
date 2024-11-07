import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Card, Typography, Space } from "antd";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
} from "../../api/supplierService";
import SupplierForm from "../../components/form/SupplierForm";

const { Title } = Typography;

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    const response = await getAllSuppliers();
    if (response.status === "success") {
      setSuppliers(response.data);
    } else {
      message.error(response.message || "Lỗi khi tải danh sách nhà cung cấp!");
    }
    setLoading(false);
  };

  const handleCreateSupplier = async (values) => {
    setLoading(true);
    const response = await createSupplier(values);
    if (response.status === "success") {
      message.success("Tạo nhà cung cấp thành công!");
      fetchSuppliers();
      setIsModalVisible(false);
    } else {
      message.error(response.message || "Lỗi khi tạo nhà cung cấp!");
    }
    setLoading(false);
  };

  const handleUpdateSupplier = async (values) => {
    setLoading(true);
    const response = await updateSupplier(selectedSupplier.id, values);
    if (response.status === "success") {
      message.success("Cập nhật nhà cung cấp thành công!");
      fetchSuppliers();
      setIsModalVisible(false);
    } else {
      message.error(response.message || "Lỗi khi cập nhật nhà cung cấp!");
    }
    setLoading(false);
  };

  const handleDeleteSupplier = async (id) => {
    setLoading(true);
    const response = await deleteSupplier(id);
    if (response.status === "success") {
      message.success("Xóa nhà cung cấp thành công!");
      fetchSuppliers();
    } else {
      message.error(response.message || "Lỗi khi xóa nhà cung cấp!");
    }
    setLoading(false);
  };

  const showCreateModal = () => {
    setIsEditMode(false);
    setSelectedSupplier(null);
    setIsModalVisible(true);
  };

  const showEditModal = async (supplierId) => {
    setLoading(true);
    const response = await getSupplierById(supplierId);
    if (response.status === "success") {
      setSelectedSupplier(response.data);
      setIsEditMode(true);
      setIsModalVisible(true);
    } else {
      message.error("Không thể tải thông tin nhà cung cấp!");
    }
    setLoading(false);
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Thông Tin Liên Hệ",
      dataIndex: "contactInfo",
      key: "contactInfo",
    },
    { title: "Địa Chỉ", dataIndex: "address", key: "address" },
    {
      title: "Hành Động",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => showEditModal(record.id)}
            style={{ color: "#0096ff" }}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteSupplier(record.id)}
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
        <Title level={3}>Quản Lý Nhà Cung Cấp</Title>
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
          Thêm Nhà Cung Cấp
        </Button>
        <Table
          dataSource={suppliers}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={isEditMode ? "Chỉnh sửa Nhà Cung Cấp" : "Thêm Nhà Cung Cấp"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <SupplierForm
          initialValues={selectedSupplier}
          onSubmit={isEditMode ? handleUpdateSupplier : handleCreateSupplier}
          isEditMode={isEditMode}
        />
      </Modal>
    </div>
  );
};

export default SupplierManagement;
