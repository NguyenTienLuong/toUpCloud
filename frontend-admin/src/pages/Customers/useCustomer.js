// ===============================================
// FILE: src/pages/Customers/useCustomer.js
// ✅ FIXED: Hiển thị TẤT CẢ khách hàng (không phân biệt chi nhánh)
// ===============================================
import { useState, useEffect, useMemo } from 'react';
import { message } from 'antd';
import { customerApi } from '../../api/customerApi';
import { useAuth } from '../../context/AuthContext';  
import { RANK_TABS } from './customerConstants';

export const useCustomer = () => {
  const { isSuperAdmin, isBranchAdmin } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRank, setActiveRank] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ============= FETCH DATA =============
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      
      // ✅ KHÔNG GỬI branchId - Lấy TẤT CẢ khách hàng
      const data = await customerApi.getAllCustomers();
      
      if (!Array.isArray(data)) {
        message.error('Dữ liệu không hợp lệ từ server');
        setCustomers([]);
        return;
      }

      const processedCustomers = data.map(c => ({
        ...c,
        rank: c.rank 
          ? c.rank.charAt(0).toUpperCase() + c.rank.slice(1).toLowerCase()
          : 'Bronze'
      }));
      
      setCustomers(processedCustomers);
      
    } catch (error) {
      console.error('❌ [useCustomer] Error:', error);
      message.error(error.message || 'Không thể tải dữ liệu khách hàng');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  // ============= STATS =============
  const stats = useMemo(() => {
    const total = customers.length;
    const bronze = customers.filter(c => c.rank.toLowerCase() === 'bronze').length;
    const silver = customers.filter(c => c.rank.toLowerCase() === 'silver').length;
    const gold = customers.filter(c => c.rank.toLowerCase() === 'gold').length;
    const platinum = customers.filter(c => c.rank.toLowerCase() === 'platinum').length;
    return { total, bronze, silver, gold, platinum };
  }, [customers]);

  // ============= FILTERED DATA =============
  const filteredCustomers = useMemo(() => {
    try {
      return customers.filter(customer => {
        if (!customer) return false;
        
        // Filter by rank
        const currentTab = RANK_TABS.find(t => t.id === activeRank);
        const customerRank = customer.rank?.toLowerCase() || 'bronze';
        const matchRank = !currentTab?.rank || customerRank === currentTab.rank.toLowerCase();
        
        // Filter by search query
        const query = searchQuery.toLowerCase().trim();
        
        if (query === '') {
          return matchRank;
        }
        
        const searchableId = customer.id ? String(customer.id) : '';
        const searchableCustomerId = customer.customerId ? String(customer.customerId).toLowerCase() : '';
        const searchableName = customer.name ? String(customer.name).toLowerCase() : '';
        const searchableEmail = customer.email ? String(customer.email).toLowerCase() : '';
        const searchablePhone = customer.phone ? String(customer.phone) : '';
        
        const matchSearch = 
          searchableId.includes(query) ||
          searchableCustomerId.includes(query) ||
          searchableName.includes(query) ||
          searchableEmail.includes(query) ||
          searchablePhone.includes(query);
        
        return matchRank && matchSearch;
      });
    } catch (error) {
      console.error('❌ [useCustomer] Filter error:', error);
      return [];
    }
  }, [customers, activeRank, searchQuery]);

  // ============= RANK COUNT =============
  const rankCount = (rankId) => {
    const tab = RANK_TABS.find(t => t.id === rankId);
    if (!tab?.rank) return customers.length;
    return customers.filter(c => 
      c.rank.toLowerCase() === tab.rank.toLowerCase()
    ).length;
  };

  // ============= DELETE CUSTOMER =============
  const deleteCustomer = async (customerId, customerName) => {
    // ✅ Check permission
    if (!isSuperAdmin && !isBranchAdmin) {
      message.error('Bạn không có quyền xóa khách hàng');
      return { success: false };
    }

    try {
      const result = await customerApi.deleteCustomer(customerId);
      
      if (!result.success) {
        message.error(result.message || 'Không thể xóa khách hàng');
        return { success: false };
      }
      
      await fetchCustomers();
      message.success(`Đã xóa khách hàng "${customerName}"`);
      return { success: true };
      
    } catch (err) {
      console.error('❌ [useCustomer] Delete error:', err);
      message.error('Không thể xóa khách hàng');
      return { success: false };
    }
  };

  // ============= HANDLERS =============
  const handleRankChange = (rankId) => {
    setActiveRank(rankId);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // ============= EXPORT CSV =============
  const handleExportCSV = () => {
    const headers = ['ID', 'Mã KH', 'Họ và tên', 'Email', 'Số điện thoại', 'Tổng chi tiêu', 'Hạng'];
    const csvContent = [
      headers.join(','),
      ...filteredCustomers.map(c => 
        [c.id, c.customerId, c.name, c.email, c.phone, c.total_amount, c.rank].join(',')
      )
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    message.success('Xuất file CSV thành công!');
  };

  // Permission checks
  const canDeleteCustomer = () => {
    return isSuperAdmin || isBranchAdmin;
  };

  const canExportData = () => {
    return isSuperAdmin || isBranchAdmin;
  };

  // ============= RETURN =============
  return {
    customers,
    filteredCustomers,
    stats,
    loading,
    activeRank,
    searchQuery,
    currentPage,
    deleteCustomer,
    rankCount,
    setCurrentPage,
    handleRankChange,
    handleSearchChange,
    handleExportCSV,
    
    canDeleteCustomer,
    canExportData,
    isSuperAdmin,
    isBranchAdmin
  };
};