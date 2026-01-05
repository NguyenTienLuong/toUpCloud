from flask import Blueprint, jsonify, request
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.models.branches import Branch
from hus_bakery_app.services.admin.order_management_services import (
    get_order_detail_service, delete_order,
    get_all_orders_service
)

order_admin_bp = Blueprint('order_management', __name__)


def get_branch_id_from_token():
    """Hàm bổ trợ lấy branch_id từ manager_id (identity trong token)"""
    try:
        identity = json.loads(get_jwt_identity())
        employee_id = identity.get("id")  # Hoặc identity.get("employee_id") tùy cấu hình token

        # Tìm chi nhánh có manager_id khớp với ID nhân viên trong token
        branch = Branch.query.filter_by(manager_id=employee_id).first()
        return branch.branch_id if branch else None
    except:
        return None


@order_admin_bp.route("/order_detail", methods=['GET'])
@jwt_required()
def get_order_detail_api():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xem chi tiết đơn hàng"}), 403

    order_id = request.args.get('order_id')
    print(f"DEBUG - order_id: {order_id}")
    print(f"DEBUG - type(order_id): {type(order_id)}")
    order_detail, msg = get_order_detail_service(order_id)
    if not order_detail:
        return jsonify({"error": msg}), 400
    return jsonify({
        "status": "success",
        "data": order_detail
    }), 200


@order_admin_bp.route("/delete_order/<int:order_id>", methods=['DELETE'])
@jwt_required()
def delete_order_api(order_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xóa đơn hàng"}), 403


    success = delete_order(order_id)
    if success:
        return jsonify({"message": "Xóa đơn hàng thành công"}), 200
    return jsonify({"error": "Không tìm thấy đơn hàng hoặc bạn không có quyền xóa"}), 404




@order_admin_bp.route("/orders", methods=['GET'])
@jwt_required()
def get_orders():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền truy cập danh sách đơn hàng"}), 403

    branch_id = request.args.get('branch_id')

    if not branch_id:
        return jsonify({"success": False, "message": "Thiếu branch_id"}), 400

    try:
        raw_orders = get_all_orders_service(branch_id)
        return jsonify({
            "success": True,
            "branch_id": branch_id,
            "count": len(raw_orders),
            "data": raw_orders
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500