import React from "react";
import { Form, Input, Button, Select, message, Typography, Card } from "antd";
import { createUser } from "../api/userService";

const { Option } = Select;
const { Title } = Typography;

const CreateUserForm = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      await createUser(values);
      message.success("Tạo tài khoản thành công!");
      form.resetFields();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tạo tài khoản!");
    }
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
        Tạo Tài Khoản Mới
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ role: "WAREHOUSE_STAFF" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
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
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateUserForm;
