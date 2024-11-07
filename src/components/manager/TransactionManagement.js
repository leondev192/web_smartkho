import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  message,
  Card,
  Typography,
  Space,
  Tag,
  Divider,
} from "antd";
import {
  getAllTransactions,
  createTransaction,
  approveTransaction,
  getTransactionStatistics,
} from "../../api/services/transactionService.js";
import { getAllProducts } from "../../api/services/productService";
import TransactionForm from "../../components/form/TransactionForm";

const { Title } = Typography;

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalInTransactions: 0,
    totalOutTransactions: 0,
    topProducts: [],
  });
  const [productMap, setProductMap] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts().then(() => {
      fetchStatistics();
      fetchTransactions();
    });
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.status === "success") {
        const map = {};
        response.data.forEach((product) => {
          map[product.id] = product.name;
        });
        setProductMap(map);
      } else {
        message.error(response.message || "Error loading products!");
      }
    } catch (error) {
      message.error("Error fetching products!");
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    const response = await getAllTransactions();
    if (response.status === "success") {
      const updatedTransactions = response.data.map((transaction) => ({
        ...transaction,
        productName: productMap[transaction.productId] || "Unknown Product", // Always use the product name
      }));
      setTransactions(updatedTransactions);
    } else {
      message.error(response.message || "Error loading transactions!");
    }
    setLoading(false);
  };

  const fetchStatistics = async () => {
    try {
      const response = await getTransactionStatistics();
      if (response.status === "success") {
        const inTransactions = response.data.IN || {};
        const outTransactions = response.data.OUT || {};

        const totalInTransactions = Object.values(inTransactions).reduce(
          (sum, count) => sum + count,
          0
        );
        const totalOutTransactions = Object.values(outTransactions).reduce(
          (sum, count) => sum + count,
          0
        );

        const productTransactionCounts = {};

        Object.entries(inTransactions).forEach(([productId, count]) => {
          productTransactionCounts[productId] = count;
        });

        Object.entries(outTransactions).forEach(([productId, count]) => {
          if (productTransactionCounts[productId]) {
            productTransactionCounts[productId] += count;
          } else {
            productTransactionCounts[productId] = count;
          }
        });

        const topProducts = Object.entries(productTransactionCounts)
          .map(([productId, count]) => ({
            productId,
            productName: productMap[productId] || "Unknown Product",
            transactionCount: count,
          }))
          .sort((a, b) => b.transactionCount - a.transactionCount)
          .slice(0, 3);

        setStatistics({
          totalInTransactions,
          totalOutTransactions,
          topProducts,
        });
      } else {
        message.error(
          response.message || "Error loading transaction statistics!"
        );
      }
    } catch (error) {
      message.error("Error fetching transaction statistics!");
      console.error(error);
    }
  };

  const handleCreateTransaction = async (values) => {
    setLoading(true);
    const response = await createTransaction(values);
    if (response.status === "success") {
      message.success("Transaction created successfully!");
      fetchTransactions();
      fetchStatistics();
      setIsModalVisible(false);
    } else {
      message.error(response.message || "Error creating transaction!");
    }
    setLoading(false);
  };

  const handleApproveTransaction = async (transactionId) => {
    setLoading(true);
    const response = await approveTransaction(transactionId);
    if (response.status === "success") {
      message.success("Transaction approved successfully!");
      fetchTransactions();
    } else {
      message.error(response.message || "Error approving transaction!");
    }
    setLoading(false);
  };

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Sản Phẩm", dataIndex: "productName", key: "productName" },
    { title: "Loại", dataIndex: "transactionType", key: "transactionType" },
    { title: "Số Lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Ghi Chú", dataIndex: "remarks", key: "remarks" },
    {
      title: "Trạng Thái",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => (
        <Tag color={approved ? "green" : "volcano"}>
          {approved ? "Đã Duyệt" : "Chờ Duyệt"}
        </Tag>
      ),
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (text, record) => (
        <Space>
          {!record.approved && (
            <Button
              type="link"
              onClick={() => handleApproveTransaction(record.id)}
              style={{ color: "#0096ff" }}
            >
              Duyệt
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={3}>Quản lý Giao Dịch</Title>
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
          Thêm Giao Dịch
        </Button>
        <Table
          dataSource={transactions}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title="Thêm Giao Dịch"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <TransactionForm onSubmit={handleCreateTransaction} />
      </Modal>

      <Card style={{ marginTop: "24px" }}>
        <Title level={4}>Thống Kê Giao Dịch</Title>
        <p>
          Tổng Số Giao Dịch Nhập: <b>{statistics.totalInTransactions}</b>
        </p>
        <p>
          Tổng Số Giao Dịch Xuất: <b>{statistics.totalOutTransactions}</b>
        </p>
        <Divider />
        <Title level={5}>Top Sản Phẩm Giao Dịch Nhiều Nhất</Title>
        <ul>
          {statistics.topProducts.map((product) => (
            <li key={product.productId}>
              {product.productName}: {product.transactionCount} giao dịch
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default TransactionManagement;
