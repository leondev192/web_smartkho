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
import { getAllProducts } from "../../api/services/productService";

const { Option } = Select;
const { Title } = Typography;

const TransactionForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response.status === "success") {
        setProducts(response.data);
      } else {
        console.error("Failed to load products:", response.message);
      }
    };

    fetchProducts();
  }, []);

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
        Thêm Giao Dịch Mới
      </Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Sản Phẩm"
          name="productId"
          rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
        >
          <Select placeholder="Chọn sản phẩm">
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Loại Giao Dịch"
          name="transactionType"
          rules={[{ required: true, message: "Vui lòng chọn loại giao dịch!" }]}
        >
          <Select placeholder="Chọn loại giao dịch">
            <Option value="IN">Nhập</Option>
            <Option value="OUT">Xuất</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Số Lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber
            min={1}
            placeholder="Nhập số lượng"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Ghi Chú" name="remarks">
          <Input placeholder="Nhập ghi chú (nếu có)" />
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
            Thêm Giao Dịch
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TransactionForm;
