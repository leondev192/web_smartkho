import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin, Typography } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAllProducts } from "../api/services/productService";
import { getTransactionStatistics } from "../api/services/transactionService.js";
import { getAllUsers } from "../api/services/userService";

const { Title } = Typography;

const DataTable = () => {
  const [products, setProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [transactionStats, setTransactionStats] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const productResponse = await getAllProducts();
        if (productResponse.status === "success") {
          setProducts(productResponse.data);
          setTotalQuantity(
            productResponse.data.reduce(
              (sum, product) => sum + product.quantityInStock,
              0
            )
          );
        }

        // Fetch transaction statistics and transform data
        const transactionResponse = await getTransactionStatistics();
        if (transactionResponse.status === "success") {
          const stats = transactionResponse.data;
          const inCount = Object.values(stats.IN || {}).reduce(
            (acc, count) => acc + count,
            0
          );
          const outCount = Object.values(stats.OUT || {}).reduce(
            (acc, count) => acc + count,
            0
          );

          const transformedStats = Object.entries(stats).flatMap(
            ([type, productTransactions]) =>
              Object.entries(productTransactions).map(([productId, count]) => ({
                type,
                productId,
                count,
                productName:
                  productResponse.data.find(
                    (product) => product.id === productId
                  )?.name || "Unknown Product", // Map product name
              }))
          );
          setTransactionStats(transformedStats);

          // Update the state with the total counts
          setTransactionStats({ in: inCount, out: outCount });
        }

        // Fetch user count
        const userResponse = await getAllUsers();
        if (userResponse.status === "success") {
          setUserCount(userResponse.data.length);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for pie and bar charts
  const pieData = [
    { name: "Sản Phẩm", value: products.length },
    { name: "Tổng Số Lượng", value: totalQuantity },
  ];

  const transactionData = [
    { name: "Nhập", value: transactionStats.in || 0 },
    { name: "Xuất", value: transactionStats.out || 0 },
  ];

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "16px",
        background: "#fff",
        borderRadius: "12px",
      }}
    >
      <Title level={3}>Tổng Quan Hệ Thống SmartKho</Title>

      {loading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        />
      ) : (
        <>
          {/* Display statistics as charts */}
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col xs={24} sm={12} md={8}>
              <Card
                title="Tổng Quan Sản Phẩm & Số Lượng"
                style={{
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                title="Tóm Tắt Giao Dịch"
                style={{
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={transactionData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                title="Tổng Số Người Dùng"
                style={{
                  textAlign: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#0088FE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <span style={{ fontSize: "36px", color: "#1890ff" }}>
                  {userCount}
                </span>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DataTable;
