// ===============================================
// Location: src/pages/Employee/hooks/useBranches.js
// ===============================================
import { useState, useEffect } from "react";
import { Modal } from "antd";
import branchApi from "../../../api/branchApi";

export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranches = async () => {
    setLoading(true);
    setError(null);

    console.log("Action: Fetching branches...");
    const result = await branchApi.getAllBranches();

    if (result.success && result.data) {
      const branchOptions = result.data.map((branch) => ({
        value: String(branch.branch_id),
        label: `[${branch.branch_id}] ${branch.name || branch.branch_name}`,
      }));

      setBranches(branchOptions);
      console.log("Success: Branches loaded:", branchOptions);
    } else {
      const errorMsg = "Không thể tải danh sách chi nhánh. Vui lòng thử lại.";
      setError(errorMsg);
      console.error("Error: Failed to load branches:", result.message);

      Modal.error({
        title: "Lỗi tải dữ liệu",
        content: errorMsg,
        centered: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return {
    branches,
    loading,
    error,
    refetch: fetchBranches,
  };
};
