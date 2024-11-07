// src/components/modals/UserDetailModal.js
import React from "react";
import { Modal, Descriptions, Avatar } from "antd";

const UserDetailModal = ({ visible, onClose, user }) => {
  return (
    <Modal
      title="Thông Tin Chi Tiết Người Dùng"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {user && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Ảnh đại diện">
            <Avatar src={user.avatarUrl} size={64} />
          </Descriptions.Item>
          <Descriptions.Item label="Họ và Tên">
            {user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {user.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{user.address}</Descriptions.Item>
          <Descriptions.Item label="Vai Trò">{user.role}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {new Date(user.createdAt).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            {new Date(user.updatedAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default UserDetailModal;
