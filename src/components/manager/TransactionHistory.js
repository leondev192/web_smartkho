// src/pages/TransactionHistoryManagement.js
import React, { useEffect, useState } from "react";
import { Table, Select, Card, Typography, message, Spin, Radio } from "antd";
import {
  getTransactionHistoryByProduct,
  getAllTransactions,
} from "../../api/services/transactionService.js";
import { getAllProducts } from "../../api/services/productService.js";

const { Title } = Typography;
const { Option } = Select;

const TransactionHistoryManagement = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // State to track view mode

  useEffect(() => {
    fetchProducts();
    fetchTransactionHistory(); // Fetch all transaction history by default
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.status === "success") {
        setProducts(response.data);
      } else {
        message.error(response.message || "Lỗi khi tải sản phẩm!");
      }
    } catch (error) {
      message.error("Lỗi khi tải sản phẩm!");
      console.error(error);
    }
  };

  const fetchTransactionHistory = async (productId) => {
    setLoading(true);
    try {
      let response;
      if (viewMode === "filtered" && productId) {
        response = await getTransactionHistoryByProduct(productId);
      } else {
        response = await getAllTransactions(); // Fetch all transactions if "View All Transactions" is selected
      }

      if (response.status === "success") {
        setTransactionHistory(response.data);
      } else {
        message.error(response.message || "Lỗi khi tải lịch sử giao dịch!");
      }
    } catch (error) {
      message.error("Lỗi khi tải lịch sử giao dịch!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (productId) => {
    setSelectedProductId(productId);
    fetchTransactionHistory(productId); // Fetch transaction history based on selected product
  };

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
    if (e.target.value === "all") {
      setSelectedProductId(null); // Reset the product selection
      fetchTransactionHistory(); // Fetch all transactions
    } else {
      fetchTransactionHistory(selectedProductId); // Fetch filtered transactions based on the selected product
    }
  };

  const columns = [
    { title: "Mã Giao Dịch", dataIndex: "id", key: "id" },
    {
      title: "Sản Phẩm",
      key: "productId",
      render: (text, record) => {
        const product = products.find((p) => p.id === record.productId);
        return product ? product.name : "Không xác định"; // Display product name or a fallback
      },
    },
    { title: "Loại", dataIndex: "transactionType", key: "transactionType" },
    { title: "Số Lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Ngày Giao Dịch",
      dataIndex: "transactionDate",
      key: "transactionDate",
    },
    { title: "Ghi Chú", dataIndex: "remarks", key: "remarks" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={3}>Lịch Sử Giao Dịch</Title>
        <Radio.Group value={viewMode} onChange={handleViewModeChange}>
          <Radio value="all">Xem tất cả giao dịch</Radio>
          <Radio value="filtered">Lọc theo sản phẩm</Radio>
        </Radio.Group>
        {viewMode === "filtered" && (
          <Select
            style={{ width: 300, marginBottom: "16px", marginLeft: "16px" }}
            placeholder="Chọn sản phẩm để lọc"
            value={selectedProductId}
            onChange={handleProductChange}
            allowClear
          >
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        )}
        {loading ? (
          <Spin />
        ) : (
          <Table
            dataSource={transactionHistory}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
    </div>
  );
};

export default TransactionHistoryManagement;
