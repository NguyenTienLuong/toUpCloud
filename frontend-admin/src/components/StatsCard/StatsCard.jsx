// ============================= 
// Location: src/components/StatsCard/StatsCard.jsx - REDESIGNED
// ============================= 
import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './StatsCard.css';

/**
 * StatsCard Component - Modern & Clean Design
 * @param {string} title - Tiêu đề của card
 * @param {string|number} value - Giá trị hiển thị
 * @param {number} change - Phần trăm thay đổi (optional)
 * @param {string} period - Khoảng thời gian (optional)
 * @param {string} color - Màu theme: 'purple', 'pink', 'blue', 'green', 'orange'
 * @param {React.Component} icon - Icon component (React Icons)
 */
export default function StatsCard({ 
  title, 
  value, 
  change, 
  period = "vs last month",
  color = 'blue', 
  icon: IconComponent 
}) {
  const isPositive = change >= 0;
  const showChange = change !== undefined && change !== null && change !== 0;

  // Color mapping - With gradients
  const colorMap = {
    purple: { 
      bg: '#f3e8ff', 
      icon: '#8b5cf6', 
      gradient: 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)'
    },
    pink: { 
      bg: '#fce7f3', 
      icon: '#ec4899', 
      gradient: 'linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)'
    },
    blue: { 
      bg: '#dbeafe', 
      icon: '#3b82f6', 
      gradient: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)'
    },
    green: { 
      bg: '#d1fae5', 
      icon: '#10b981', 
      gradient: 'linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)'
    },
    orange: { 
      bg: '#fed7aa', 
      icon: '#f97316', 
      gradient: 'linear-gradient(90deg, #f97316 0%, #fb923c 50%, #fdba74 100%)'
    },
    yellow: { 
      bg: '#fef3c7', 
      icon: '#eab308', 
      gradient: 'linear-gradient(90deg, #eab308 0%, #facc15 50%, #fde047 100%)'
    }
  };

  const currentColor = colorMap[color] || colorMap.blue;

  return (
    <Card 
      className={`stats-card stats-card-${color}`}
      bordered={false}
      hoverable
    >
      {/* Animated Gradient Top Border */}
      <div 
        className="stats-card-gradient-border"
        style={{ background: currentColor.gradient }}
      />
      {/* Content */}
      <div className="stats-card-wrapper">
        {/* Icon */}
        {IconComponent && (
          <div 
            className="stats-card-icon"
            style={{ 
              background: currentColor.bg,
              color: currentColor.icon
            }}
          >
            <IconComponent size={28} />
          </div>
        )}

        {/* Stats */}
        <div className="stats-card-content">
          <Statistic
            title={title}
            value={value}
            valueStyle={{ 
              fontSize: '32px', 
              fontWeight: 700,
              color: '#1f2937',
              lineHeight: 1
            }}
          />
          
          {/* Change Badge */}
          {showChange && (
            <div className={`stats-card-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              <span className="change-value">{Math.abs(change)}%</span>
              <span className="change-period">{period}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}