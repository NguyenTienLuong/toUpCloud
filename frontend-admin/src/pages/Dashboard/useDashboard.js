// ===============================================
// FILE: src/pages/Dashboard/useDashboard.js
// ===============================================
import { useState, useEffect } from "react";
import { message } from "antd";
import { dashboardApi } from "../../api/dashboardApi";
import { useAuth } from "../../context/AuthContext";

export const useDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { getCurrentBranch } = useAuth();
  const currentBranch = getCurrentBranch();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Branch Admin Data - CHỈ DOANH THU
  const [branchStats, setBranchStats] = useState({
    amount: 0,
  });
  const [orderStatus, setOrderStatus] = useState({
    total_orders: 0,
    distribution: [],
  });
  const [topProducts, setTopProducts] = useState([]);
  const [customerGrowth, setCustomerGrowth] = useState([]);

  // Super Admin Data
  const [revenuePerBranch, setRevenuePerBranch] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);

  const isSuperAdmin = user?.role === "super_admin" && !user?.viewing_branch;
  const isAdmin =
    user?.role === "admin" ||
    (user?.role === "super_admin" && user?.viewing_branch);

  useEffect(() => {
    loadDashboardData();
  }, [selectedMonth, selectedYear, user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log("[useDashboard] Loading data for:", {
        isSuperAdmin,
        isAdmin,
        month: selectedMonth,
        year: selectedYear,
      });

      if (isSuperAdmin) {
        await loadSuperAdminData();
      } else if (isAdmin) {
        await loadBranchAdminData();
      }
    } catch (error) {
      console.error("[useDashboard] Error:", error);
      message.error("Không thể tải dữ liệu dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadBranchAdminData = async () => {
    console.log("[useDashboard] Loading Branch Admin data...");

    try {
      const [amountRes, orderStatusRes, topProductsRes, customerGrowthRes] =
        await Promise.all([
          dashboardApi.getTotalAmount(
            selectedMonth,
            selectedYear,
            currentBranch.id
          ),
          dashboardApi.getOrderStatusDistribution(
            selectedMonth,
            selectedYear,
            currentBranch.id
          ),
          dashboardApi.getTopProducts(
            selectedMonth,
            selectedYear,
            currentBranch.id
          ),
          dashboardApi.getCustomerGrowth(),
        ]);

      console.log("[useDashboard] Branch data:", {
        amount: amountRes.data,
        orderStatus: orderStatusRes.data,
        topProducts: topProductsRes.data,
        customerGrowth: customerGrowthRes.data,
      });

      setBranchStats({
        amount: amountRes.data || 0,
      });

      setOrderStatus(
        orderStatusRes.data || { total_orders: 0, distribution: [] }
      );
      setTopProducts(topProductsRes.data || []);
      setCustomerGrowth(customerGrowthRes.data || []);
    } catch (error) {
      console.error("[useDashboard] Error loading branch data:", error);
      message.error("Không thể tải dữ liệu chi nhánh");
    }
  };

  const loadSuperAdminData = async () => {
    console.log("[useDashboard] Loading Super Admin data...");

    try {
      
      const [revenueRes, orderStatsRes, revenueChartRes] = await Promise.all([
        dashboardApi.getRevenuePerBranch(selectedMonth, selectedYear),
        dashboardApi.getOrderStats(selectedMonth, selectedYear),
        dashboardApi.getRevenueChart("month", selectedMonth, selectedYear),
      ]);

      console.log("[useDashboard] Super Admin data:", {
        revenue: revenueRes.data,
        orderStats: orderStatsRes.data,
        revenueChart: revenueChartRes.data,
      });

      setRevenuePerBranch(revenueRes.data || []);
      setOrderStats(orderStatsRes.data || []);
      setRevenueChart(revenueChartRes.data || []);
    } catch (error) {
      console.error("[useDashboard] Error loading super admin data:", error);
      message.error("Không thể tải dữ liệu tổng quan");
    }
  };

  return {
    loading,
    isSuperAdmin,
    isAdmin,
    selectedMonth,
    selectedYear,
    handleMonthChange: setSelectedMonth,
    handleYearChange: setSelectedYear,
    refreshData: loadDashboardData,

    // Branch Admin
    branchStats,
    orderStatus,
    topProducts,
    customerGrowth,

    // Super Admin
    revenuePerBranch,
    orderStats,
    revenueChart,
  };
};