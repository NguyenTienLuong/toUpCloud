/* =============================================== */
/*  Location: src/components/Table/Table.jsx */
/* =============================================== */
import React from 'react';
import { Table } from 'antd';
import './Table.css';

/**
 * Reusable DataTable Component
 */
const DataTable = ({
  columns,
  dataSource,
  loading = false,
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: false,
  },
  onChange,
  rowKey = 'id',
  scroll = { x: 1200 },
  emptyText = 'Không có dữ liệu',
  ...restProps
}) => {
  const customPagination = pagination ? {
    ...pagination,
    showTotal: (total) => {
      const totalPages = Math.ceil(total / (pagination.pageSize || 10));
      const currentPage = pagination.current || 1;
      return `Trang ${currentPage}/${totalPages} • ${total} kết quả`;
    },
  } : false;

  return (
    <div className="data-table-container">
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={customPagination}
        onChange={onChange}
        rowKey={rowKey}
        scroll={scroll}
        locale={{
          emptyText: (
            <div className="empty-state">
              <p>{emptyText}</p>
            </div>
          ),
        }}
        {...restProps}
      />
    </div>
  );
};

export default DataTable;