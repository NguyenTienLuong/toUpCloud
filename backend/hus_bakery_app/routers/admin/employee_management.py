from flask import Blueprint, request, jsonify
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.services.admin.employee_management_services import (
    get_all_employees_service, add_employee_service,
    edit_employee_service, delete_employee_service
)

employee_admin_bp = Blueprint('employee_admin_bp', __name__)


@employee_admin_bp.route('/employee', methods=['GET'])
@jwt_required()
def get_employees():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xem danh sách nhân viên"}), 403

    branch_id = request.args.get('branch_id')
    status_filter = request.args.get('status')
    raw_employees = get_all_employees_service(branch_id)

    employee_list = []
    for e in raw_employees:
        if status_filter and e.status != status_filter:
            continue

        employee_list.append({
            'employee_id': e.employee_id,
            'employee_name': e.employee_name,
            'role_name': e.role_name,
            'email': e.email,
            'salary': float(e.salary) if e.salary else 0,
            'status': e.status,
            'branch_id': e.branch_id
        })

    return jsonify(employee_list), 200


@employee_admin_bp.route('/add_employee', methods=['POST'])
@jwt_required()
def add_employee():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Chỉ Admin mới có thể thêm nhân viên"}), 403

    data = request.json
    try:
        new_emp = add_employee_service(data)
        return jsonify({"message": "Thêm nhân viên thành công", "id": new_emp.employee_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@employee_admin_bp.route('/update_employee/<int:emp_id>', methods=['PUT'])
@jwt_required()
def update_employee(emp_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền chỉnh sửa nhân sự"}), 403

    data = request.json
    updated_emp = edit_employee_service(emp_id, data)
    if updated_emp:
        return jsonify({"message": "Cập nhật thành công"}), 200
    return jsonify({"error": "Không tìm thấy nhân viên"}), 404


@employee_admin_bp.route('/delete_employee/<int:emp_id>', methods=['DELETE'])
@jwt_required()
def delete_employee(emp_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xóa nhân sự"}), 403

    if delete_employee_service(emp_id):
        return jsonify({"message": "Xóa nhân viên thành công"}), 200
    return jsonify({"error": "Không tìm thấy nhân viên"}), 404