import React, { useEffect } from "react";
import { Form, Input, Button, Select, Card, Typography } from "antd";

const { Option } = Select;
const { Title } = Typography;

const UserForm = ({ initialValues = {}, onSubmit, isEditMode }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues); // Đặt giá trị mặc định cho form
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
        {isEditMode ? "Cập Nhật Tài Khoản" : "Tạo Tài Khoản Mới"}
      </Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Nhập email" disabled={isEditMode} />
        </Form.Item>

        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item label="URL Ảnh đại diện" name="avatarUrl">
          <Input placeholder="Nhập URL ảnh đại diện" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select placeholder="Chọn vai trò">
            <Option value="ADMIN">Quản Trị</Option>
            <Option value="WAREHOUSE_STAFF">Nhân Viên Kho</Option>
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
            {isEditMode ? "Cập Nhật" : "Tạo Tài Khoản"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
