// BarcodeModal.js
import React from "react";
import { Modal, Typography } from "antd";
import Barcode from "react-barcode";

const { Title } = Typography;

const BarcodeModal = ({ visible, onClose, sku }) => {
  return (
    <Modal
      visible={visible}
      title={<Title level={4}>Mã Vạch</Title>}
      onCancel={onClose}
      footer={null}
    >
      {sku ? (
        <Barcode value={sku} format="CODE128" />
      ) : (
        <p>Chưa có mã SKU để tạo mã vạch</p>
      )}
    </Modal>
  );
};

export default BarcodeModal;
