// ===============================================
// FILE: src/pages/Voucher/useVoucher.js
// ✅ FIXED: Bỏ mapping, fix search
// ===============================================
import { useState, useEffect, useMemo } from "react";
import { message } from "antd";
import voucherApi from "../../api/voucherApi";
import { useAuth } from "../../context/AuthContext";

export const useVoucher = () => {
  const { isSuperAdmin, isViewingBranch } = useAuth();

  // ============= STATE =============
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ============= QUYỀN HẠN =============
  const canManage = isSuperAdmin && !isViewingBranch;

  // ============= FETCH DATA =============
  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    try {
      setLoading(true);
      const response = await voucherApi.getAllVouchers();

      if (!response.success) {
        message.error(response.message);
        setVouchers([]);
        return;
      }

      console.log("✅ [useVoucher] Loaded vouchers:", response.data);
      setVouchers(response.data); // ✅ API đã map sẵn rồi
    } catch (error) {
      console.error("❌ [useVoucher] Error loading vouchers:", error);
      message.error("Không thể tải danh sách voucher");
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  // ============= STATS =============
  const stats = useMemo(() => {
    const total = vouchers.length;
    const active = vouchers.filter(
      (v) => v.status?.toLowerCase() === "active"
    ).length;
    const expired = total - active;
    const totalUsed = vouchers.reduce((sum, v) => sum + (v.used_count || 0), 0);

    return { total, active, expired, totalUsed };
  }, [vouchers]);

  // ============= FILTERED DATA =============
  const filteredVouchers = useMemo(() => {
    return vouchers.filter((voucher) => {
      const query = searchQuery.trim();

      // ✅ Convert ID sang string để so sánh
      const voucherId = String(voucher.coupon_id || voucher.id || "");
      const voucherCode = (voucher.code || "").toLowerCase();
      const voucherDesc = (voucher.description || "").toLowerCase();
      const voucherName = (voucher.name || "").toLowerCase();
      const queryLower = query.toLowerCase();

      console.log("🔍 Searching for:", query);
      console.log("🔍 Voucher ID:", voucherId, "| Query:", query);
      console.log("🔍 ID includes?", voucherId.includes(query));

      // ✅ Tìm theo ID (số), code, description, name
      const matchSearch =
        !query ||
        voucherId.includes(query) ||
        voucherCode.includes(queryLower) ||
        voucherDesc.includes(queryLower) ||
        voucherName.includes(queryLower);

      const matchStatus =
        statusFilter === "all" ||
        voucher.status?.toLowerCase() === statusFilter.toLowerCase();

      console.log("🔍 Final match:", matchSearch);

      return matchSearch && matchStatus;
    });
  }, [vouchers, searchQuery, statusFilter]);

  // ============= CRUD OPERATIONS =============

  const addVoucher = async (newVoucher) => {
    if (!canManage) {
      message.error("⛔ Bạn không có quyền thêm voucher");
      return { success: false };
    }

    try {
      setLoading(true);
      const response = await voucherApi.addVoucher(newVoucher);

      if (response.success) {
        message.success("✅ Thêm voucher thành công!");
        await loadVouchers();
        return { success: true };
      } else {
        message.error(response.message || "Không thể thêm voucher");
        return { success: false };
      }
    } catch (error) {
      console.error("❌ [useVoucher] Error adding voucher:", error);
      message.error("Lỗi khi thêm voucher");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateVoucher = async (voucherId, voucherData) => {
    if (!canManage) {
      message.error("⛔ Bạn không có quyền sửa voucher");
      return { success: false };
    }

    try {
      setLoading(true);

      console.log("✏️ [useVoucher] Updating voucher:", voucherId, voucherData);

      const response = await voucherApi.updateVoucher(voucherId, voucherData);

      if (response.success) {
        message.success("✅ Cập nhật voucher thành công!");
        await loadVouchers();
        return { success: true };
      } else {
        message.error(response.message || "Không thể cập nhật voucher");
        return { success: false };
      }
    } catch (error) {
      console.error("❌ [useVoucher] Error updating voucher:", error);
      message.error("Lỗi khi cập nhật voucher");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteVoucher = async (voucherId) => {
    if (!canManage) {
      message.error("⛔ Bạn không có quyền xóa voucher");
      return { success: false };
    }

    try {
      const response = await voucherApi.deleteVoucher(voucherId);

      if (response.success) {
        message.success(`✅ Đã xóa voucher "${voucherId}"`);
        await loadVouchers();
        return { success: true };
      } else {
        message.error(response.message || "Không thể xóa voucher");
        return { success: false };
      }
    } catch (error) {
      console.error("❌ [useVoucher] Error deleting voucher:", error);
      message.error("Lỗi khi xóa voucher");
      return { success: false };
    }
  };

  // ============= HEADER HELPERS =============
  const getHeaderTitle = () => {
    if (canManage) {
      return "Quản lý Voucher";
    }
    return "Danh sách Voucher";
  };

  const getHeaderSubtitle = () => {
    if (canManage) {
      return "Quản lý và theo dõi các mã giảm giá của cửa hàng";
    }
    return "Xem danh sách các mã giảm giá";
  };

  // ============= HANDLERS =============
  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // ============= RETURN =============
  return {
    vouchers,
    filteredVouchers,
    stats,
    loading,
    statusFilter,
    searchQuery,
    currentPage,
    canManage,

    loadVouchers,
    addVoucher,
    updateVoucher,
    deleteVoucher,

    getHeaderTitle,
    getHeaderSubtitle,

    setCurrentPage,
    handleStatusChange,
    handleSearchChange,
  };
};
