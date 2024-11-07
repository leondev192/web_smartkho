import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Card, Typography, Space } from "antd";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../../api/services/productService";
import ProductForm from "../../components/form/ProductForm";

const { Title } = Typography;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getAllProducts();
    if (response.status === "success") {
      setProducts(response.data);
    } else {
      message.error(response.message || "Lỗi khi tải danh sách sản phẩm!");
    }
    setLoading(false);
  };

  const handleCreateProduct = async (values) => {
    setLoading(true);
    const response = await createProduct(values);
    if (response.status === "success") {
      message.success("Tạo sản phẩm thành công!");
      fetchProducts();
      setIsModalVisible(false);
    } else {
      message.error(response.message || "Lỗi khi tạo sản phẩm!");
    }
    setLoading(false);
  };

  const handleUpdateProduct = async (values) => {
    setLoading(true);
    const response = await updateProduct(selectedProduct.id, values);
    if (response.status === "success") {
      message.success("Cập nhật sản phẩm thành công!");
      fetchProducts();
      setIsModalVisible(false);
    } else {
      message.error(response.message || "Lỗi khi cập nhật sản phẩm!");
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    const response = await deleteProduct(id);
    if (response.status === "success") {
      message.success("Xóa sản phẩm thành công!");
      fetchProducts();
    } else {
      message.error(response.message || "Lỗi khi xóa sản phẩm!");
    }
    setLoading(false);
  };

  const showCreateModal = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
    setIsModalVisible(true);
  };

  const showEditModal = async (productId) => {
    setLoading(true);
    const response = await getProductById(productId);
    if (response.status === "success") {
      setSelectedProduct(response.data);
      setIsEditMode(true);
      setIsModalVisible(true);
    } else {
      message.error("Không thể tải thông tin sản phẩm!");
    }
    setLoading(false);
  };

  const columns = [
    { title: "Mã SKU", dataIndex: "sku", key: "sku" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Danh Mục", dataIndex: "category", key: "category" },
    {
      title: "Số Lượng Tồn Kho",
      dataIndex: "quantityInStock",
      key: "quantityInStock",
    },
    {
      title: "Mức Tồn Kho Tối Thiểu",
      dataIndex: "reorderLevel",
      key: "reorderLevel",
    },
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
            onClick={() => handleDeleteProduct(record.id)}
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
        <Title level={3}>Quản Lý Sản Phẩm</Title>
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
          Thêm Sản Phẩm
        </Button>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={isEditMode ? "Chỉnh sửa Sản Phẩm" : "Thêm Sản Phẩm"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <ProductForm
          initialValues={selectedProduct}
          onSubmit={isEditMode ? handleUpdateProduct : handleCreateProduct}
          isEditMode={isEditMode}
        />
      </Modal>
    </div>
  );
};

export default ProductManagement;
