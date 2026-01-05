import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Input,
  Button,
  Tag,
  Typography,
  Spin,
  Pagination,
} from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
  CloseOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useOrder } from "../../context/OrderContext";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import OrderDetails from "../../components/Order/OrderDetails";
const { Title } = Typography;

const MAX_VALUE = 100;

const STATUS_COLOR = {
  "Đã giao": "#52c41a",
  "Không thành công": "#c01108ff",
  "Đang giao": "orange",
};
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { orderDetails } = useOrder();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [stats, setStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    rating: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const urls = [
      "/stats/total-orders",
      "/stats/successful",
      "/stats/failed",
      "/stats/rating",
    ];

    // Fetch song song bằng fetch thuần
    Promise.all(
      urls.map((url) =>
        fetchWithAuth(`http://localhost:5001/api/shipper/statistics${url}`, {
          method: "GET",
        }).then((res) => res.json())
      )
    )
      .then(([totalRes, successfulRes, failedRes, ratingRes]) => {
        setStats({
          total: totalRes.data,
          successful: successfulRes.data,
          failed: failedRes.data,
          rating: ratingRes.data,
        });
      })
      .catch((error) => {
        console.error("Lỗi khi fetch stats:", error);
        message.error("Không thể tải thông tin thống kê!");
      });
  }, []);
  const fetchData = async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(
        `http://localhost:5001/api/shipper/statistics/history?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      if (result.status === "success") {
        setData(result.data);
        setPagination({
          current: page,
          pageSize: limit,
          total: result.pagination.total_records,
        });
      }
    } catch (err) {
      console.error("Lỗi khi fetch dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (_, sorter) => {
    setSortedInfo(sorter);
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);
  const handleShowOrderDetails = async (order_id) => {
    try {
      setLoadingOrder(true);
      const order = await orderDetails(order_id);
      setCurrentOrder(order);
      setShowDetail(true);
    } catch (err) {
      message.error(err.message || "Không thể lấy chi tiết đơn hàng");
    } finally {
      setLoadingOrder(false);
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.order_id.toString().includes(searchText) ||
      item.products?.some((p) =>
        p.toLowerCase().includes(searchText.toLowerCase())
      )
  );
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      align: "center",
      width: 90,
      fixed: "left",
      sorter: (a, b) => a.order_id - b.order_id,
      sortOrder: sortedInfo.columnKey === "order_id" ? sortedInfo.order : null,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity_text",
      key: "quantity_text",
      align: "center",
      width: 100,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      width: 140,
      sorter: (a, b) => a.total_amount - b.total_amount,
      sortOrder:
        sortedInfo.columnKey === "total_amount" ? sortedInfo.order : null,
      render: (total) => (
        <span className="text-lg font-bold text-orange-600">{total} VND</span>
      ),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "shipping_address",
      key: "shipping_address",
      align: "center",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 120,
      render: (status) => (
        <Tag color={STATUS_COLOR[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Xem chi tiết",
      key: "action",
      width: 80,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleShowOrderDetails(record.order_id)}
        />
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      width: 80,
      render: (rating) => (rating ? `⭐ ${rating}` : "--"),
    },
  ];
  return (
    <div style={{ padding: 24 }}>
      {/* SUMMARY CARDS */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng"
              value={stats.total}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Giao thành công"
              value={stats.successful}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Không thành công"
              value={stats.failed}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={stats.rating}
              suffix="/5"
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <Card
          className="shadow-xl rounded-2xl overflow-hidden border-0"
          style={{ backgroundColor: "#fdfbf5" }}
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              Lịch sử giao hàng
            </Title>
          </div>

          <div className="p-6">
            <Input
              placeholder="Nhập orderID hoặc tên bánh ..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-80 mb-6"
              size="large"
              allowClear
            />

            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  rowKey="order_id"
                  onChange={(pagination, filters, sorter) =>
                    setSortedInfo(sorter)
                  }
                  pagination={false}
                  scroll={{ x: "max-content" }}
                  bordered
                />
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onChange={(page, pageSize) => fetchData(page, pageSize)}
                  style={{ marginTop: 16, textAlign: "right" }}
                />
              </>
            )}
          </div>
        </Card>

        {showDetail && (
          <div className="fl-center showUp">
            <div
              style={{
                width: "95%",
                maxWidth: "550px",
                backgroundColor: "#fdfbf5",
                height: "90%",
                borderRadius: "8px",
                flexDirection: "column",
                position: "relative",
              }}
              className="fl-center"
            >
              <OrderDetails order={currentOrder} />
              <button
                onClick={() => setShowDetail(false)}
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  fontSize: 15,
                }}
                className="out-line"
              >
                <CloseOutlined className="close-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
