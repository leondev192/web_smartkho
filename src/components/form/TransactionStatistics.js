// src/components/TransactionStatistics.js

import React, { useEffect, useState } from "react";
import { Card, Typography, Statistic, Row, Col, Table, message } from "antd";
import { getTransactionStatistics } from "../../api/services/transactionService.js";

const { Title } = Typography;

const TransactionStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      const response = await getTransactionStatistics();
      if (response.status === "success") {
        setStats(response.data);
      } else {
        message.error(response.message || "Error fetching statistics!");
      }
      setLoading(false);
    };

    fetchStatistics();
  }, []);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Transaction Count",
      dataIndex: "transactionCount",
      key: "transactionCount",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>Transaction Statistics</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card loading={loading}>
            <Statistic
              title="Total Incoming Transactions"
              value={stats ? stats.totalIn : 0}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading}>
            <Statistic
              title="Total Outgoing Transactions"
              value={stats ? stats.totalOut : 0}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Transactions by Product"
        style={{ marginTop: 24 }}
        loading={loading}
      >
        <Table
          columns={columns}
          dataSource={stats ? stats.byProduct : []}
          rowKey="productId"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default TransactionStatistics;
