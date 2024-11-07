import React, { useEffect, useState } from "react";
import {
  Table,
  DatePicker,
  Card,
  Typography,
  message,
  Divider,
  Spin,
} from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import {
  getInventoryReport,
  getTransactionStatistics,
} from "../../api/services/reportService.js";
import { getTransactionHistory } from "../../api/services/transactionService.js";
import { getAllProducts } from "../../api/services/productService.js";
import { getAllUsers } from "../../api/services/userService.js";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const EnhancedInventoryReport = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionStats, setTransactionStats] = useState({
    totalInTransactions: 0,
    totalOutTransactions: 0,
    topProducts: [],
  });
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductData();
    fetchUserCount();
    fetchTransactionStatistics();
    fetchTransactionHistory();
  }, []);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      if (response.status === "success") {
        setInventoryData(response.data);
      } else {
        message.error("Error loading products!");
      }
    } catch (error) {
      message.error("Error fetching product data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await getAllUsers();
      if (response.status === "success") {
        setUserCount(response.data.length);
      }
    } catch (error) {
      message.error("Error fetching user count!");
    }
  };

  const fetchTransactionStatistics = async () => {
    try {
      const response = await getTransactionStatistics();
      if (response.status === "success") {
        setTransactionStats(response.data);
      } else {
        message.error("Error loading transaction statistics!");
      }
    } catch (error) {
      message.error("Error fetching transaction statistics!");
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await getTransactionHistory();
      if (response.status === "success") {
        setTransactionData(response.data);
      } else {
        message.error("Error loading transaction history!");
      }
    } catch (error) {
      message.error("Error fetching transaction history!");
    }
  };

  // Prepare data for charts
  const inventoryPieData = inventoryData.map((item) => ({
    name: item.name,
    value: item.quantityInStock,
  }));

  const topProducts = transactionStats
    ? Object.entries(transactionStats)
        .map(([type, data]) =>
          Object.entries(data).map(([productId, count]) => ({
            productId,
            count,
            type,
            productName:
              inventoryData.find((prod) => prod.id === productId)?.name ||
              "Unknown",
          }))
        )
        .flat()
    : [];

  const transactionLineData = transactionData.map((item) => ({
    date: new Date(item.transactionDate).toLocaleDateString(),
    type: item.transactionType,
    quantity: item.quantity,
  }));

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={3}>Báo Cáo Tồn Kho Nâng Cao</Title>
        <RangePicker
          onChange={(dates) => {
            // Optional: Implement date filtering if needed
          }}
          style={{ marginBottom: "16px" }}
        />

        {/* Product Inventory Table */}
        <Table
          dataSource={inventoryData}
          columns={[
            { title: "Tên Sản Phẩm", dataIndex: "name", key: "name" },
            {
              title: "Số Lượng Tồn Kho",
              dataIndex: "quantityInStock",
              key: "quantityInStock",
            },
            {
              title: "Mức Tồn Kho Tối Thiểu",
              dataIndex: "reorderLevel",
              key: "reorderLevel",
            },
          ]}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Divider />

      {/* Pie Chart for Product Inventory Distribution */}
      <Card>
        <Title level={4}>Phân Bố Sản Phẩm</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={inventoryPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {inventoryPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Divider />

      {/* User Count */}
      <Card>
        <Title level={4}>Tổng Số Người Dùng</Title>
        <div
          style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
        >
          {userCount}
        </div>
      </Card>

      <Divider />

      <Divider />

      {/* Bar Chart for Top Transacted Products */}
      <Card>
        <Title level={4}>Sản Phẩm Giao Dịch Nhiều Nhất</Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" name="Số lượng giao dịch">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Divider />
    </div>
  );
};

export default EnhancedInventoryReport;
