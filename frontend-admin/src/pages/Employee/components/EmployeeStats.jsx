// ===============================================
// Location: src/pages/Employee/components/EmployeeStats.jsx
// ===============================================
import React from "react";
import StatsCard from "../../../components/StatsCard/StatsCard";
import { STATS_CONFIG } from "../utils/employeeConstants";

const EmployeeStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      {STATS_CONFIG.map((stat) => (
        <StatsCard
          key={stat.key}
          title={stat.title}
          value={stats[stat.key]}
          icon={stat.icon}
          color={stat.color}
          trend={null}
        />
      ))}
    </div>
  );
};

export default EmployeeStats;