// ===============================================
// Location: src/pages/Shipper/useShipper.js
// Status: WITH DEBUG LOGS
// ===============================================
import { useState, useEffect, useMemo } from "react";
import { message } from "antd";
import { useAuth } from "../../context/AuthContext";
import { shipperApi } from "../../api/shipperApi";
import { branchApi } from "../../api/branchApi";

export const useShipper = () => {
  const { user, isSuperAdmin, isBranchAdmin, getCurrentBranch } = useAuth();

  const [shippers, setShippers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Determine current branch context
  const currentBranchId = useMemo(() => {
    if (isBranchAdmin) {
      return user.branch_id;
    }

    if (isSuperAdmin && user.viewing_branch) {
      const branch = getCurrentBranch();
      if (!branch) return null;
      return branch.id;
    }

    return null;
  }, [user, isSuperAdmin, isBranchAdmin, getCurrentBranch]);

  // Load branches metadata based on user role
  useEffect(() => {
    if (isSuperAdmin) {
      loadBranches();
    } else if (isBranchAdmin) {
      setBranches([
        {
          id: user.branch_id,
          name: user.branch_name,
        },
      ]);
    }
  }, [isSuperAdmin, isBranchAdmin, user]);

  // Reload shippers whenever the branch context changes
  useEffect(() => {
    loadShippers();
  }, [currentBranchId]);

  const loadBranches = async () => {
    try {
      const response = await branchApi.getAllBranches();
      if (response.success && response.data) {
        const mappedBranches = response.data.map((b) => ({
          id: b.branch_id,
          name: b.branch_name,
          ...b,
        }));
        setBranches(mappedBranches);
        console.log("System: Loaded branches count", mappedBranches.length);
      }
    } catch (error) {
      console.error("Error: Failed to load branches", error);
    }
  };

  const loadShippers = async () => {
    try {
      setLoading(true);
      console.log(
        "API: Fetching shippers for branch",
        currentBranchId || "ALL"
      );

      const response = await shipperApi.getAllShippers(currentBranchId);

      if (response.success && response.data) {
        setShippers(response.data);
      } else {
        message.error(response.message || "Không thể tải danh sách shipper");
        setShippers([]);
      }
    } catch (error) {
      console.error("Error: Failed to fetch shippers", error);
      message.error("Lỗi khi tải danh sách shipper");
      setShippers([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = shippers.length;
    const active = shippers.filter((s) => s.status === "Đang hoạt động").length;
    const busy = shippers.filter((s) => s.status === "Đang giao").length;
    const inactive = shippers.filter((s) => s.status === "Nghỉ việc").length;

    return { total, active, busy, inactive };
  }, [shippers]);

  const filteredShippers = useMemo(() => {
    return shippers.filter((shipper) => {
      const query = searchQuery.trim().toLowerCase();
      return (
        query === "" ||
        shipper.name?.toLowerCase().includes(query) ||
        shipper.email?.toLowerCase().includes(query) ||
        shipper.phone?.includes(query) ||
        shipper.shipper_id.toString() === query
      );
    });
  }, [shippers, searchQuery]);

  const addShipper = async (newShipper) => {
    try {
      setLoading(true);
      const dataToSubmit = {
        ...newShipper,
        branch_id: parseInt(newShipper.branch_id, 10),
      };

      if (isBranchAdmin && currentBranchId) {
        dataToSubmit.branch_id = currentBranchId;
      }

      if (isSuperAdmin && currentBranchId) {
        dataToSubmit.branch_id = dataToSubmit.branch_id || currentBranchId;
      }

      const response = await shipperApi.addShipper(dataToSubmit);

      if (response.success) {
        message.success("Thêm shipper thành công!");
        await loadShippers();
        return { success: true };
      }
      message.error(response.message || "Không thể thêm shipper");
      return { success: false };
    } catch (error) {
      message.error("Lỗi hệ thống khi thêm shipper");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateShipper = async (id, updatedShipper) => {
    try {
      console.group(" UPDATE SHIPPER HOOK");
      console.log("1. ID nhận được:", id);
      console.log("2. Data nhận được:", updatedShipper);
      console.log("3. shipper_name trong data:", updatedShipper.shipper_name);

      setLoading(true);

      if (isBranchAdmin) {
        updatedShipper.branch_id = currentBranchId;
      }

      delete updatedShipper.password;

      console.log("4. Data sau khi xử lý:", updatedShipper);
      console.log("5. Gọi shipperApi.updateShipper...");

      const response = await shipperApi.updateShipper(id, updatedShipper);

      console.log("6. Response từ API:", response);
      console.log("7. Response success:", response.success);
      console.log("8. Response message:", response.message);
      console.groupEnd();

      if (response.success) {
        message.success("Cập nhật shipper thành công!");
        console.log("9. Đang reload shippers...");
        await loadShippers();
        return { success: true };
      }
      message.error(response.message || "Không thể cập nhật shipper");
      return { success: false };
    } catch (error) {
      console.error(" Error trong updateShipper:", error);
      console.groupEnd();
      message.error("Lỗi hệ thống khi cập nhật shipper");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteShipper = async (shipperId) => {
    try {
      const response = await shipperApi.deleteShipper(shipperId);
      if (response.success) {
        message.success("Xóa shipper thành công!");
        await loadShippers();
        return { success: true };
      }
      message.error(response.message || "Không thể xóa shipper");
      return { success: false };
    } catch (error) {
      message.error("Lỗi hệ thống khi xóa shipper");
      return { success: false };
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getHeaderTitle = () => {
    if (isBranchAdmin) return `Shipper ${user.branch_name || ""}`;
    if (isSuperAdmin && user.viewing_branch)
      return `Shipper ${user.viewing_branch.name}`;
    return "Quản lý Shipper";
  };

  const getHeaderSubtitle = () => {
    if (isBranchAdmin)
      return `Quản lý ${stats.total} shipper chi nhánh ${user.branch_name}`;
    if (isSuperAdmin && user.viewing_branch)
      return `Quản lý Shipper của cửa hàng`;
    return `Quản lý ${stats.total} shipper trên toàn hệ thống`;
  };

  return {
    shippers,
    branches,
    filteredShippers,
    stats,
    loading,
    searchQuery,
    currentPage,
    loadShippers,
    addShipper,
    updateShipper,
    deleteShipper,
    getHeaderTitle,
    getHeaderSubtitle,
    setCurrentPage,
    handleSearchChange,
    isSuperAdmin,
    isBranchAdmin,
    currentBranchId,
  };
};
