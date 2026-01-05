from flask import Blueprint, request, jsonify

from hus_bakery_app.models.branches import Branch
from hus_bakery_app.services.superadmin.edit_services import (
    add_branch_service,
    update_branch_service,
    create_employee_service,
    update_employee_service,
    add_product_service,
    update_product_service,
    create_coupon_service,
    update_coupon_service,
    get_branch_detail_service,
    get_branch_manager_info_service,
    get_all_products_service,
    delete_product_service,
    delete_coupon_service,
    delete_employee_service,
    delete_branch_service
)
import json
from flask_jwt_extended import jwt_required, get_jwt_identity

admin_mgmt_bp = Blueprint('admin_mgmt', __name__)

#==============================BRANCHES=========================================
@admin_mgmt_bp.route('/add_branch', methods=['POST'])
@jwt_required()
def create_branch():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    data = request.json
    branch = add_branch_service(data)
    return jsonify({"success": True, "message": "Thêm chi nhánh thành công", "id": branch.branch_id}), 201

@admin_mgmt_bp.route('/update_branch/<int:id>', methods=['PUT'])
@jwt_required()
def update_branch(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    data = request.json
    branch = update_branch_service(id, data)
    if branch:
        return jsonify({"success": True, "message": "Cập nhật chi nhánh thành công"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy chi nhánh"}), 404

# Chi tiết chi nhánh
@admin_mgmt_bp.route('/branch/<int:id>', methods=['GET'])
@jwt_required()
def get_branch_detail(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    branch_data = get_branch_detail_service(id)
    if branch_data:
        return jsonify({
            "success": True,
            "data": branch_data
        }), 200

    return jsonify({
        "success": False,
        "message": "Không tìm thấy thông tin chi nhánh"
    }), 404

@admin_mgmt_bp.route('/branch/<int:id>/manager', methods=['GET'])
@jwt_required()
def get_branch_manager(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    manager_info = get_branch_manager_info_service(id)

    if manager_info:
        return jsonify({
            "success": True,
            "data": manager_info
        }), 200

    return jsonify({
        "success": False,
        "message": "Chi nhánh này chưa được gán quản lý hoặc không tồn tại"
    }), 404

@admin_mgmt_bp.route('/delete_branch/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_branch(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    success, message = delete_branch_service(id)
    if success:
        return jsonify({"success": True, "message": message}), 200
    return jsonify({"success": False, "message": message}), 400


@admin_mgmt_bp.route('/api/branches', methods=['GET'])
@jwt_required()
def get_all_branches():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    try:
        # 1. Truy vấn toàn bộ danh sách chi nhánh
        branches = Branch.query.all()

        # 2. Chuyển đổi list các object thành list các dictionary (Serialization)
        res = []
        for b in branches:
            res.append({
                "branch_id": b.branch_id,
                "name": b.name,
                "address": b.address,
                "phone": b.phone,
                "email": b.email,
                "mapSrc": b.mapSrc,
                # Ép kiểu float để đảm bảo JSON có thể đọc được (vì Decimal thường lỗi)
                "lat": float(b.lat) if b.lat else None,
                "lng": float(b.lng) if b.lng else None,
                "manager_id": b.manager_id
            })

        # 3. Trả về định dạng JSON và mã trạng thái 200 (Success)
        return jsonify(res), 200

    except Exception as e:
        # Xử lý lỗi nếu có vấn đề với database
        return jsonify({"error": str(e)}), 500
#==============================EMPLOYEES=========================================
@admin_mgmt_bp.route('/add_admin', methods=['POST'])
@jwt_required()
def create_employee():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    data = request.json
    emp = create_employee_service(data)
    return jsonify({"success": True, "message": "Thêm quản lí thành công", "id": emp.employee_id}), 201

@admin_mgmt_bp.route('/update_admin/<int:id>', methods=['PUT'])
@jwt_required()
def update_employee(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    data = request.json
    emp = update_employee_service(id, data)
    if emp:
        return jsonify({"success": True, "message": "Cập nhật quản lí thành công"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy nhân viên"}), 404

@admin_mgmt_bp.route('/delete_admin/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_employee(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    success, message = delete_employee_service(id)
    if success:
        return jsonify({"success": True, "message": message}), 200
    return jsonify({"success": False, "message": message}), 400


#==============================COUPONS=========================================
@admin_mgmt_bp.route('/add_coupons', methods=['POST'])
@jwt_required()
def create_coupon():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    data = request.json
    coupon = create_coupon_service(data)
    return jsonify({"success": True, "message": "Tạo mã giảm giá thành công", "id": coupon.coupon_id}), 201

@admin_mgmt_bp.route('/update_coupons/<int:id>', methods=['PUT'])
@jwt_required()
def update_coupon(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    data = request.json
    coupon = update_coupon_service(id, data)
    if coupon:
        return jsonify({"success": True, "message": "Cập nhật mã giảm giá thành công"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy mã giảm giá"}), 404

@admin_mgmt_bp.route('/delete_coupons/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_coupon(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    success = delete_coupon_service(id)
    if success:
        return jsonify({"success": True, "message": "Xóa mã giảm giá thành công"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy mã giảm giá hoặc mã đã được sử dụng"}), 404



#==============================PRODUCTS=========================================
@admin_mgmt_bp.route('/products', methods=['GET'])
@jwt_required()
def get_all_products():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    try:
        products = get_all_products_service()
        return jsonify({
            "success": True,
            "count": len(products),
            "data": products
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@admin_mgmt_bp.route('/add_products', methods=['POST'])
@jwt_required()
def create_product():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    data = request.json
    product = add_product_service(data)
    return jsonify({"success": True, "message": "Thêm sản phẩm thành công", "id": product.product_id}), 201

@admin_mgmt_bp.route('/update_products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    data = request.json
    product = update_product_service(id, data)
    if product:
        return jsonify({"success": True, "message": "Cập nhật sản phẩm thành công"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy sản phẩm"}), 404

@admin_mgmt_bp.route('/delete_products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    success = delete_product_service(id)
    if success:
        return jsonify({"success": True, "message": "Xóa sản phẩm thành công"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy sản phẩm hoặc không thể xóa"}), 404