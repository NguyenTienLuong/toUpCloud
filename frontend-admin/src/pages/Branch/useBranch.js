// ===============================================
// FILE: src/pages/Branch/useBranch.js
// ===============================================
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { message } from 'antd';
import { branchApi } from '../../api/branchApi';
import { useAuth } from '../../context/AuthContext';

export const useBranch = () => {
  // AUTH CONTEXT
  const { viewBranch, canManageBranches } = useAuth();
  const navigate = useNavigate(); 

  // STATE
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BRANCHES
  const fetchBranches = useCallback(async () => {
    try {
      setLoading(true);

      const result = await branchApi.getAllBranches();

      if (result.success) {
        setBranches(result.data);
      } else {
        message.error(result.message || 'Không thể tải danh sách chi nhánh');
        setBranches([]);
      }
    } catch (error) {
      console.error('Fetch branches error:', error);
      message.error('Đã xảy ra lỗi khi tải dữ liệu');
      setBranches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleViewBranch = useCallback(async (branch) => {
    try {
      const branchData = {
        id: branch.branch_id,
        name: branch.name,
        address: branch.address,
        manager: branch.manager_name || 'Chưa có'
      };

      viewBranch(branchData);
      
      //  AUTO NAVIGATE TO DASHBOARD
      navigate('/dashboard');
      
    } catch (error) {
      console.error('View branch error:', error);
      message.error('Không thể xem chi nhánh');
    }
  }, [viewBranch, navigate]); 

  // ADD BRANCH
  const addBranch = useCallback(async (branchData) => {
    try {
      const result = await branchApi.addBranch(branchData);

      if (result.success) {
        message.success(result.message || 'Thêm chi nhánh thành công');
        await fetchBranches();
        return { success: true };
      } else {
        message.error(result.message || 'Không thể thêm chi nhánh');
        return { success: false };
      }
    } catch (error) {
      console.error('Add branch error:', error);
      message.error('Đã xảy ra lỗi khi thêm chi nhánh');
      return { success: false };
    }
  }, [fetchBranches]);

  // UPDATE BRANCH
  const updateBranch = useCallback(async (branchId, branchData) => {
    try {
      const result = await branchApi.updateBranch(branchId, branchData);

      if (result.success) {
        message.success(result.message || 'Cập nhật chi nhánh thành công');
        await fetchBranches();
        return { success: true };
      } else {
        message.error(result.message || 'Không thể cập nhật chi nhánh');
        return { success: false };
      }
    } catch (error) {
      console.error('Update branch error:', error);
      message.error('Đã xảy ra lỗi khi cập nhật chi nhánh');
      return { success: false };
    }
  }, [fetchBranches]);

  // DELETE BRANCH
  const deleteBranch = useCallback(async (branchId, branchName) => {
    try {
      const result = await branchApi.deleteBranch(branchId);

      if (result.success) {
        message.success(result.message || 'Xóa chi nhánh thành công');
        await fetchBranches();
        return { success: true };
      } else {
        message.error(result.message || 'Không thể xóa chi nhánh');
        return { success: false };
      }
    } catch (error) {
      console.error('Delete branch error:', error);
      message.error('Đã xảy ra lỗi khi xóa chi nhánh');
      return { success: false };
    }
  }, [fetchBranches]);

  // RETURN
  return {
    branches,
    loading,
    
    handleViewBranch,
    addBranch,
    updateBranch,
    deleteBranch,
    
    canManageBranches
  };
};