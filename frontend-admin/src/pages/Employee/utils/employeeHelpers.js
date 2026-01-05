// ===============================================
// Location: src/pages/Employee/utils/employeeHelpers.js
// ===============================================
import { getBranchName } from "./employeeConstants";

/**
 * Export employees data to CSV file
 * @param {Array} employees - List of employees to export
 * @param {Array} branches - List of branches for mapping branch names
 */
export const exportEmployeesToCSV = (employees, branches) => {
  if (employees.length === 0) {
    console.warn("No employees to export");
    return;
  }

  // Define CSV headers
  const headers = [
    "ID",
    "Tên",
    "Email",
    "Vai trò",
    "Lương",
    "Chi nhánh",
    "Trạng thái",
  ];

  // Map employees to CSV rows
  const rows = employees.map((emp) => [
    emp.employee_id,
    emp.name,
    emp.email,
    emp.role,
    emp.salary,
    getBranchName(emp.branch_id, branches),
    emp.status,
  ]);

  // Create CSV content
  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
    "\n"
  );

  // Create blob and download
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `employees_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  console.log("CSV exported successfully");
};