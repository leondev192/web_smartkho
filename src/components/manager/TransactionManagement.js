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
import TransactionForm from "../../components/form/TransactionForm";

const { Title } = Typography;

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalInTransactions: 0,
    totalOutTransactions: 0,
    topProducts: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const response = await getAllTransactions();
    if (response.status === "success") {
      setTransactions(response.data); // Directly use response data with product names
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

        // Aggregate counts for IN and OUT transactions
        Object.entries(inTransactions).forEach(([productId, count]) => {
          productTransactionCounts[productId] = count;
        });
        Object.entries(outTransactions).forEach(([productId, count]) => {
          productTransactionCounts[productId] =
            (productTransactionCounts[productId] || 0) + count;
        });

        const topProducts = Object.entries(productTransactionCounts)
          .map(([productId, count]) => {
            const transactionWithProduct = transactions.find(
              (transaction) => transaction.productId === productId
            );
            return {
              productId,
              productName:
                transactionWithProduct?.product?.name || "Unknown Product",
              transactionCount: count,
            };
          })
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
    {
      title: "Sản Phẩm",
      dataIndex: ["product", "name"], // Access the nested product name
      key: "productName",
      render: (text) => text || "Unknown Product",
    },
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
      </Card>
    </div>
  );
};

export default TransactionManagement;
