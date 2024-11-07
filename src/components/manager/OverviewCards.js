import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getAllUsers } from "../../api/services/userService";
import { getAllProducts } from "../../api/services/productService";
import {
  getInventoryReport,
  getTransactionStatistics,
} from "../../api/services/reportService";

const { Title } = Typography;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const OverviewCards = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const [transactionStats, setTransactionStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data for user count, product count, inventory report, and transaction statistics
        const [
          usersResponse,
          productsResponse,
          inventoryReportResponse,
          transactionStatsResponse,
        ] = await Promise.all([
          getAllUsers(),
          getAllProducts(),
          getInventoryReport("2024-01-01", "2024-12-31"),
          getTransactionStatistics(),
        ]);

        if (usersResponse.status === "success")
          setUserCount(usersResponse.data.length);
        if (productsResponse.status === "success")
          setProductCount(productsResponse.data.length);
        if (inventoryReportResponse.status === "success")
          setInventoryData(inventoryReportResponse.data);
        if (transactionStatsResponse.status === "success")
          setTransactionStats(transactionStatsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Data for charts
  const stockData = inventoryData.map((item) => ({
    name: item.productName,
    quantity: item.quantityInStock,
    reorderLevel: item.reorderLevel,
  }));

  const transactionPieData = [
    {
      name: "Giao Dịch Nhập",
      value: transactionStats.totalInTransactions || 0,
    },
    {
      name: "Giao Dịch Xuất",
      value: transactionStats.totalOutTransactions || 0,
    },
  ];

  return loading ? (
    <Spin
      size="large"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    />
  ) : (
    <Row gutter={[16, 16]} style={{ padding: "16px" }}>
      {/* User Count Card */}
      <Col xs={24} sm={12} md={6}>
        <Card style={cardStyle}>
          <Title level={5} style={titleStyle}>
            Người Dùng
          </Title>
          <p style={countTextStyle}>{userCount}</p>
        </Card>
      </Col>

      {/* Product Count Card */}
      <Col xs={24} sm={12} md={6}>
        <Card style={cardStyle}>
          <Title level={5} style={titleStyle}>
            Sản Phẩm
          </Title>
          <p style={countTextStyle}>{productCount}</p>
        </Card>
      </Col>

      {/* Inventory Stock Level Chart */}
      <Col xs={24} sm={12} md={6}>
        <Card style={chartCardStyle}>
          <Title level={5} style={titleStyle}>
            Tồn Kho
          </Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stockData}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8" name="Tồn kho" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      {/* Transaction Statistics Pie Chart */}
      <Col xs={24} sm={12} md={6}>
        <Card style={chartCardStyle}>
          <Title level={5} style={titleStyle}>
            Giao Dịch
          </Title>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={transactionPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {transactionPieData.map((entry, index) => (
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
    </Row>
  );
};

// Styles for the cards
const cardStyle = {
  borderRadius: "8px",
  backgroundColor: "#f0f5ff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  padding: "16px",
};

const chartCardStyle = {
  ...cardStyle,
  padding: "8px",
};

const titleStyle = {
  color: "#0096ff",
  fontSize: "16px",
};

const countTextStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
};

export default OverviewCards;
