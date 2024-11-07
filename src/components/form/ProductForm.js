import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
  Typography,
} from "antd";
import { getAllSuppliers } from "../../api/supplierService";

const { Option } = Select;
const { Title } = Typography;

const ProductForm = ({ initialValues = {}, onSubmit, isEditMode }) => {
  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers when the form loads
  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getAllSuppliers();
      if (response.status === "success") {
        setSuppliers(response.data);
      } else {
        console.error("Failed to load suppliers:", response.message);
      }
    };

    fetchSuppliers();
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Card
      bordered={false}
      style={{
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        maxWidth: 500,
        margin: "auto",
      }}
    >
      <Title level={4} style={{ textAlign: "center", color: "#0096ff" }}>
        {isEditMode ? "Cập Nhật Sản Phẩm" : "Tạo Sản Phẩm Mới"}
      </Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Mã SKU"
          name="sku"
          rules={[{ required: true, message: "Vui lòng nhập mã SKU!" }]}
        >
          <Input placeholder="Nhập mã SKU" disabled={isEditMode} />
        </Form.Item>
        <Form.Item
          label="Tên Sản Phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item label="Mô Tả" name="description">
          <Input placeholder="Nhập mô tả sản phẩm" />
        </Form.Item>
        <Form.Item label="Danh Mục" name="category">
          <Input placeholder="Nhập danh mục sản phẩm" />
        </Form.Item>
        <Form.Item
          label="Số Lượng Tồn Kho"
          name="quantityInStock"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber
            min={0}
            placeholder="Số lượng tồn kho"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Mức Tồn Kho Tối Thiểu"
          name="reorderLevel"
          rules={[
            { required: true, message: "Vui lòng nhập mức tồn kho tối thiểu!" },
          ]}
        >
          <InputNumber
            min={0}
            placeholder="Mức tồn kho tối thiểu"
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Supplier Dropdown */}
        <Form.Item label="Nhà Cung Cấp" name="supplierId">
          <Select placeholder="Chọn nhà cung cấp">
            {suppliers.map((supplier) => (
              <Option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#0096ff",
              borderColor: "#0096ff",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {isEditMode ? "Cập Nhật Sản Phẩm" : "Tạo Sản Phẩm"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
