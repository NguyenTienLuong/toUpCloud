// ===============================================
// FILE: src/pages/Dashboard/DashboardView.jsx
// ===============================================
import {
  Row,
  Col,
  Card,
  Select,
  Button,
  Spin,
  Statistic,
  Tag,
  Space,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDashboard } from "./useDashboard";
import "./DashboardView.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardView = () => {
  const {
    loading,
    isSuperAdmin,
    isAdmin,
    selectedMonth,
    selectedYear,
    handleMonthChange,
    handleYearChange,
    refreshData,
    branchStats,
    orderStatus,
    topProducts,
    customerGrowth,
    revenuePerBranch,
    orderStats,
    revenueChart,
  } = useDashboard();

  const currentYear = new Date().getFullYear();
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `Tháng ${i + 1}`,
  }));
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: `${currentYear - i}`,
  }));

  const formatCurrency = (amount) => {
    if (!amount) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Spin size="large" />
        <p style={{ color: "#64748b", fontSize: 15 }}>Đang tải dữ liệu...</p>
      </div>
    );
  }

  // ===== BRANCH ADMIN =====
  if (isAdmin) {
    // ✅ CHỈ LẤY 3 TRẠNG THÁI và MAP SANG TIẾNG VIỆT
    const statusMapping = {
      Pending: "Chưa xử lý",
      Completed: "Đã giao",
      Shipping: "Đang giao",
    };

    const allowedStatuses = ["Pending", "Completed", "Shipping"];
    const filteredDistribution =
      orderStatus?.distribution?.filter((d) =>
        allowedStatuses.includes(d.name)
      ) || [];

    const pieData = {
      labels: filteredDistribution.map((d) => statusMapping[d.name] || d.name),
      datasets: [
        {
          data: filteredDistribution.map((d) => d.value),
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
          borderWidth: 0,
        },
      ],
    };

    const barData = {
      labels: topProducts?.slice(0, 5).map((p) => p.name) || [],
      datasets: [
        {
          label: "Số lượng bán",
          data: topProducts?.slice(0, 5).map((p) => p.orders) || [],
          backgroundColor: "#667eea",
          borderRadius: 8,
        },
      ],
    };

    const lineData = {
      labels: customerGrowth?.map((g) => g.month) || [],
      datasets: [
        {
          label: "Khách hàng mới",
          data: customerGrowth?.map((g) => g.customers) || [],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: "#10b981",
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { padding: 15, font: { size: 12 } },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: 12,
          cornerRadius: 8,
          titleFont: { size: 13, weight: "bold" },
          bodyFont: { size: 12 },
        },
      },
    };

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Cửa Hàng</h1>
            <Space style={{ marginTop: 8 }}>
              <Tag color="blue">
                Tháng {selectedMonth}/{selectedYear}
              </Tag>
            </Space>
          </div>
          <div className="dashboard-controls">
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              options={monthOptions}
              style={{ width: 120 }}
            />
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              options={yearOptions}
              style={{ width: 100 }}
            />
            <Button icon={<ReloadOutlined />} onClick={refreshData}>
              Làm mới
            </Button>
          </div>
        </div>

        {/* 🎯 CHỈ DOANH THU */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: 12,
              }}
            >
              <Statistic
                title={
                  <span
                    style={{ color: "rgba(255,255,255,0.9)", fontSize: 16 }}
                  >
                    💰 Doanh thu tháng {selectedMonth}/{selectedYear}
                  </span>
                }
                value={branchStats.amount || 0}
                precision={0}
                valueStyle={{ color: "#fff", fontSize: 36, fontWeight: 700 }}
                suffix="₫"
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>
        </Row>

        {/* Biểu đồ */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <span>Trạng thái đơn hàng</span>
                  <Tag color="purple">Tổng: {orderStatus.total_orders}</Tag>
                </Space>
              }
            >
              <div style={{ height: 300 }}>
                {pieData.labels.length > 0 ? (
                  <Pie data={pieData} options={chartOptions} />
                ) : (
                  <div className="no-data">Chưa có dữ liệu</div>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <span>Top 5 sản phẩm</span>
                  <Tag color="orange">Bán chạy nhất</Tag>
                </Space>
              }
            >
              <div style={{ height: 300 }}>
                {barData.labels.length > 0 ? (
                  <Bar data={barData} options={chartOptions} />
                ) : (
                  <div className="no-data">Chưa có dữ liệu</div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <span>Khách hàng mới</span>
                  <Tag color="green">6 tháng đầu năm {currentYear}</Tag>
                </Space>
              }
            >
              <div style={{ height: 300 }}>
                {lineData.labels.length > 0 ? (
                  <Line data={lineData} options={chartOptions} />
                ) : (
                  <div className="no-data">Chưa có dữ liệu</div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  // ===== SUPER ADMIN =====
  if (isSuperAdmin) {
    const totalRevenue =
      revenuePerBranch?.reduce((sum, b) => sum + (b.total_revenue || 0), 0) ||
      0;
    const totalOrders =
      orderStats?.reduce((sum, o) => sum + (o.count || 0), 0) || 0;

    const revenueBarData = {
      labels: revenuePerBranch?.map((b) => b.branch_name) || [],
      datasets: [
        {
          label: "Doanh thu",
          data: revenuePerBranch?.map((b) => b.total_revenue) || [],
          backgroundColor: "#10b981",
          borderRadius: 8,
        },
      ],
    };

    // ✅ CHỈ LẤY 3 TRẠNG THÁI và MAP SANG TIẾNG VIỆT
    const statusMapping = {
      Pending: "Chưa xử lý",
      Delivered: "Đã giao",
      Processing: "Đang giao",
    };

    const allowedStatuses = ["Pending", "Delivered", "Processing"];
    const filteredOrderStats =
      orderStats?.filter((o) => allowedStatuses.includes(o.status)) || [];

    const orderPieData = {
      labels: filteredOrderStats.map(
        (o) => statusMapping[o.status] || o.status
      ),
      datasets: [
        {
          data: filteredOrderStats.map((o) => o.count),
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
          borderWidth: 0,
        },
      ],
    };

    const revenueLineData = {
      labels: revenueChart?.map((r) => `T${r.time}`) || [],
      datasets: revenueChart?.[0]
        ? Object.keys(revenueChart[0])
            .filter((k) => k !== "time")
            .map((branchName, i) => ({
              label: branchName,
              data: revenueChart.map((r) => r[branchName] || 0),
              borderColor: [
                "#667eea",
                "#f59e0b",
                "#10b981",
                "#ef4444",
                "#8b5cf6",
              ][i % 5],
              backgroundColor: "transparent",
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 4,
            }))
        : [],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { padding: 15, font: { size: 12 } },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (context) => {
              const value = context.parsed.y || context.parsed;
              return `${context.dataset.label}: ${formatCurrency(value)}`;
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `${(value / 1000000).toFixed(1)}M`,
          },
        },
      },
    };

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Tổng Quan</h1>
            <Space style={{ marginTop: 8 }}>
              <Tag color="blue">
                Tháng {selectedMonth}/{selectedYear}
              </Tag>
            </Space>
          </div>
          <div className="dashboard-controls">
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              options={monthOptions}
              style={{ width: 120 }}
            />
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              options={yearOptions}
              style={{ width: 100 }}
            />
            <Button icon={<ReloadOutlined />} onClick={refreshData}>
              Làm mới
            </Button>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                border: "none",
                borderRadius: 12,
                height: "100%",
              }}
            >
              <Statistic
                title={
                  <span
                    style={{ color: "rgba(255,255,255,0.9)", fontSize: 16 }}
                  >
                    💰 Tổng doanh thu tháng {selectedMonth}/{selectedYear}
                  </span>
                }
                value={totalRevenue}
                precision={0}
                valueStyle={{ color: "#fff", fontSize: 36, fontWeight: 700 }}
                suffix="₫"
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                border: "none",
                borderRadius: 12,
                height: "100%",
              }}
            >
              <Statistic
                title={
                  <span
                    style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}
                  >
                    📦 Tổng đơn hàng
                  </span>
                }
                value={totalOrders}
                precision={0}
                valueStyle={{ color: "#fff", fontSize: 32, fontWeight: 700 }}
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={12}>
            <Card title="Doanh thu theo chi nhánh">
              <div style={{ height: 400 }}>
                {revenueBarData.labels.length > 0 ? (
                  <Bar data={revenueBarData} options={chartOptions} />
                ) : (
                  <div className="no-data">Chưa có dữ liệu</div>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Phân bố đơn hàng">
              <div style={{ height: 400 }}>
                {orderPieData.labels.length > 0 ? (
                  <Pie data={orderPieData} options={chartOptions} />
                ) : (
                  <div className="no-data">Chưa có dữ liệu</div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <Card
              title={`Xu hướng doanh thu - Tháng ${selectedMonth}/${selectedYear}`}
            >
              <div style={{ height: 400 }}>
                {revenueLineData.labels.length > 0 ? (
                  <Line data={revenueLineData} options={chartOptions} />
                ) : (
                  <div className="no-data">Chưa có dữ liệu</div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2 style={{ color: "#64748b" }}>Không có quyền truy cập</h2>
    </div>
  );
};

export default DashboardView;
