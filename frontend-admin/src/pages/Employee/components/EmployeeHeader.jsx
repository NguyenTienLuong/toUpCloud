// ===============================================
// Location: src/pages/Employee/components/EmployeeHeader.jsx
// ===============================================
import React from 'react';

const EmployeeHeader = ({ title, subtitle }) => {
  return (
    <div className="employee-header">
      <h1 className="employee-title">{title}</h1>
      <p className="employee-subtitle">{subtitle}</p>
    </div>
  );
};

export default EmployeeHeader;