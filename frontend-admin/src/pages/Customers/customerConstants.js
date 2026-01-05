// ===============================================
// FILE: src/pages/Customers/customerConstants.js
// ===============================================
import { FiUsers, FiAward } from 'react-icons/fi';

// ============= RANK TABS =============
export const RANK_TABS = [
  { id: 'all', label: 'Tất cả', rank: null },
  { id: 'bronze', label: 'Bronze', rank: 'bronze' },
  { id: 'silver', label: 'Silver', rank: 'silver' },
  { id: 'gold', label: 'Gold', rank: 'gold' },
  { id: 'platinum', label: 'Platinum', rank: 'platinum' }
];

// ============= RANK CONFIG =============
export const RANK_CONFIG = {
  'Bronze': { 
    color: '#92400e', 
    bg: '#fef3c7', 
    border: '#fde68a',
    icon: FiAward
  },
  'Silver': { 
    color: '#475569', 
    bg: '#f1f5f9', 
    border: '#cbd5e1',
    icon: FiAward
  },
  'Gold': { 
    color: '#b45309', 
    bg: '#fef3c7', 
    border: '#fcd34d',
    icon: FiAward
  },
  'Platinum': { 
    color: '#4338ca', 
    bg: '#e0e7ff', 
    border: '#c7d2fe',
    icon: FiAward
  }
};

// ============= HELPER FUNCTIONS =============
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

export const getRankStyle = (rank) => {
  return RANK_CONFIG[rank] || RANK_CONFIG['Bronze'];
};