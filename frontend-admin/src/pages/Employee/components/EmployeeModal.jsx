// ===============================================
// Location: src/pages/Employee/components/EmployeeModal.jsx
// ===============================================
import React from "react";
import { FiUser } from "react-icons/fi";
import FormModal from "../../../components/FormModal/FormModal";
import { EMPLOYEE_FIELDS, EMPLOYEE_EDIT_FIELDS } from "../utils/employeeConstants";

const EmployeeModal = ({
  isOpen,
  mode,
  selectedEmployee,
  branches,
  loadingBranches,
  branchError,
  currentBranchId,
  onClose,
  onSubmit,
}) => {
  const getFormFields = () => {
    const baseFields = mode === "edit" ? EMPLOYEE_EDIT_FIELDS : EMPLOYEE_FIELDS;

    if (mode === "add") {
      return baseFields.map((field) => {
        if (field.name === "branch_id") {
          return {
            ...field,
            options: branches,
            disabled: loadingBranches || branchError !== null,
            placeholder: loadingBranches ? "Đang tải..." : "Chọn chi nhánh",
            defaultValue: currentBranchId ? String(currentBranchId) : "",
          };
        }
        return field;
      });
    }

    return baseFields;
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={{
        add: "Thêm nhân viên mới",
        addDesc: "Điền thông tin nhân viên vào form bên dưới",
        edit: "Chỉnh sửa nhân viên",
        editDesc: "Cập nhật thông tin nhân viên",
      }}
      icon={FiUser}
      data={selectedEmployee}
      fields={getFormFields()}
    />
  );
};

export default EmployeeModal;