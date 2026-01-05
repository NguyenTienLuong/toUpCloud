from flask import Blueprint, request, jsonify
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.services.admin.shipper_management_services import (
    get_all_shippers_service, add_shipper_service,
    edit_shipper_service, delete_shipper_service,
    total_successful_order_of_shipper
)
from hus_bakery_app.services.shipper.shipper_statistics_service import calculate_avg_rating

shipper_admin_bp = Blueprint('shipper_admin_bp', __name__)

@shipper_admin_bp.route('/infomation', methods=['GET'])
@jwt_required()
def get_shippers():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xem thông tin shipper"}), 403

    status_filter = request.args.get('status')
    branch_id = request.args.get('branch_id')
    raw_shippers = get_all_shippers_service(branch_id)

    shipper_list = []
    for s in raw_shippers:
        # 1. Kiểm tra điều kiện lọc status
        if status_filter and s.status != status_filter:
            continue

        success_count = total_successful_order_of_shipper(s.shipper_id)
        average_star = calculate_avg_rating(s.shipper_id)

        shipper_list.append({
            'shipper_id': s.shipper_id,
            'shipper_name': s.name,
            'phone': s.phone,
            'email': s.email,
            'status': s.status,
            'branch_id': s.branch_id,
            'total_success': success_count,
            'rating': average_star
        })

    return jsonify(shipper_list), 200

@shipper_admin_bp.route('/add_shipper', methods=['POST'])
@jwt_required()
def add_shipper():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Chỉ Admin mới có thể thêm shipper"}), 403

    data = request.json
    try:
        new_shipper = add_shipper_service(data)
        return jsonify({
            "message": "Thêm shipper thành công",
            "shipper_id": new_shipper.shipper_id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@shipper_admin_bp.route('/update_shipper/<int:shipper_id>', methods=['PUT'])
@jwt_required()
def update_shipper(shipper_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền cập nhật thông tin shipper"}), 403

    data = request.json
    updated_shipper = edit_shipper_service(shipper_id, data)
    if updated_shipper:
        return jsonify({"message": "Cập nhật shipper thành công"}), 200
    return jsonify({"error": "Không tìm thấy shipper"}), 404

@shipper_admin_bp.route('/delete_shipper/<int:shipper_id>', methods=['DELETE'])
@jwt_required()
def delete_shipper(shipper_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xóa shipper"}), 403

    if delete_shipper_service(shipper_id):
        return jsonify({"message": "Xóa shipper thành công"}), 200
    return jsonify({"error": "Không tìm thấy shipper"}), 404
