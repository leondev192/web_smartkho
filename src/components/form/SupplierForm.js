import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography } from "antd";

const { Title } = Typography;

const SupplierForm = ({ initialValues = {}, onSubmit, isEditMode }) => {
  const [form] = Form.useForm();

  useEffect(() => {
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
        {isEditMode ? "Cập Nhật Nhà Cung Cấp" : "Tạo Nhà Cung Cấp Mới"}
      </Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Tên Nhà Cung Cấp"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên nhà cung cấp!" },
          ]}
        >
          <Input placeholder="Nhập tên nhà cung cấp" />
        </Form.Item>
        <Form.Item
          label="Thông Tin Liên Hệ"
          name="contactInfo"
          rules={[
            { required: true, message: "Vui lòng nhập thông tin liên hệ!" },
          ]}
        >
          <Input placeholder="Nhập thông tin liên hệ" />
        </Form.Item>
        <Form.Item
          label="Địa Chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input placeholder="Nhập địa chỉ" />
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
            {isEditMode ? "Cập Nhật Nhà Cung Cấp" : "Tạo Nhà Cung Cấp"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SupplierForm;
