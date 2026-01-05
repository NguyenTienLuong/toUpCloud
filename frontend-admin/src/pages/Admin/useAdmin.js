
// ===============================================
// FILE: src/pages/Admin/useAdmin.js
// ===============================================
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { adminApi } from '../../api/adminApi';
import { useAuth } from '../../context/AuthContext';

export const useAdmin = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const canManageAdmins = () => {
    return user?.role === 'super_admin' || user?.role === 'employee';
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ================= FETCH ADMINS =================
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      console.log('[useAdmin] Fetching admins...');

      const result = await adminApi.getAllAdmins();

      if (result.success) {
        console.log('[useAdmin]  Admins loaded:', result.data.length);
        setAdmins(result.data);
      } else {
        console.error('[useAdmin]  Failed:', result.message);
        message.error(result.message || 'Không thể tải danh sách admin');
        setAdmins([]);
      }
    } catch (error) {
      console.error('[useAdmin]  Fetch error:', error);
      message.error('Đã xảy ra lỗi khi tải dữ liệu');
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE ADMIN =================
  const updateAdmin = async (adminId, adminData) => {
    try {
      console.log('[useAdmin] Updating admin:', {
        adminId,
        adminData
      });

      const result = await adminApi.updateAdmin(adminId, adminData);

      if (result.success) {
        message.success(result.message || 'Cập nhật admin thành công');
        await fetchAdmins();
        return { success: true };
      } else {
        message.error(result.message || 'Không thể cập nhật admin');
        return { success: false };
      }
    } catch (error) {
      console.error('[useAdmin]  Update error:', error);
      message.error('Đã xảy ra lỗi khi cập nhật admin');
      return { success: false };
    }
  };

  // ================= DELETE ADMIN =================
  const deleteAdmin = async (adminId, adminName) => {
    try {
      console.log('[useAdmin] Deleting admin:', adminId);

      const result = await adminApi.deleteAdmin(adminId);

      if (result.success) {
        message.success(result.message || `Đã xóa admin "${adminName}"`);
        await fetchAdmins();
        return { success: true };
      } else {
        message.error(result.message || 'Không thể xóa admin');
        return { success: false };
      }
    } catch (error) {
      console.error('[useAdmin]  Delete error:', error);
      message.error('Đã xảy ra lỗi khi xóa admin');
      return { success: false };
    }
  };

  return {
    admins,
    loading,
    updateAdmin,
    deleteAdmin,
    canManageAdmins
  };
};
