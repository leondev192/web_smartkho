import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin, Typography } from "antd";
import { getAllProducts } from "../api/services/productService";
import { getTransactionStatistics } from "../api/services/transactionService.js";
import { getAllUsers } from "../api/services/userService";

const { Title } = Typography;

const DataTable = () => {
  const [products, setProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [transactionStats, setTransactionStats] = useState({ in: 0, out: 0 });
  const [userCount, setUserCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [monthlyTransactions, setMonthlyTransactions] = useState(0);
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

          // Calculate counts by category
          const categoryMap = {};
          productResponse.data.forEach((product) => {
            categoryMap[product.category] =
              (categoryMap[product.category] || 0) + 1;
          });
          setCategoryCounts(Object.entries(categoryMap));
        }

        // Fetch transaction statistics
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

          // Set transaction stats for IN/OUT and monthly transactions
          setTransactionStats({ in: inCount, out: outCount });
          setMonthlyTransactions(inCount + outCount);

          // Assuming top-selling products info is available in transaction stats
          const sortedProducts = Object.entries(stats.OUT || {})
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([productId, count]) => ({
              productName:
                productResponse.data.find((p) => p.id === productId)?.name ||
                "Unknown",
              count,
            }));
          setTopProducts(sortedProducts);
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

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "24px",
        background: "#f0f2f5",
        borderRadius: "12px",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Tổng Quan Hệ Thống - SmartKho
      </Title>

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
        <Row gutter={[24, 24]} justify="center">
          {/* Tổng số sản phẩm */}
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Tổng Số Sản Phẩm"
              style={{
                textAlign: "center",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{ fontSize: "18px" }}
            >
              <div style={{ fontSize: "36px", color: "#1890ff" }}>
                {products.length}
              </div>
            </Card>
          </Col>

          {/* Tổng số lượng tồn kho */}
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Tổng Số Lượng Tồn Kho"
              style={{
                textAlign: "center",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{ fontSize: "18px" }}
            >
              <div style={{ fontSize: "36px", color: "#FFBB28" }}>
                {totalQuantity}
              </div>
            </Card>
          </Col>

          {/* Tóm tắt giao dịch */}
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Tóm Tắt Giao Dịch"
              style={{
                textAlign: "center",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{ fontSize: "18px" }}
            >
              <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                <strong>Nhập:</strong> {transactionStats.in}
              </div>
              <div style={{ fontSize: "18px" }}>
                <strong>Xuất:</strong> {transactionStats.out}
              </div>
            </Card>
          </Col>

          {/* Tổng số người dùng */}
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Tổng Số Người Dùng"
              style={{
                textAlign: "center",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{ fontSize: "18px" }}
            >
              <div style={{ fontSize: "36px", color: "#0088FE" }}>
                {userCount}
              </div>
            </Card>
          </Col>

          {/* Monthly Transactions */}
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Giao Dịch Trong Tháng"
              style={{
                textAlign: "center",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{ fontSize: "18px" }}
            >
              <div style={{ fontSize: "36px", color: "#00C49F" }}>
                {monthlyTransactions}
              </div>
            </Card>
          </Col>

          {/* Top Selling Products */}
        </Row>
      )}
    </div>
  );
};

export default DataTable;
