import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.services.admin.coupon_management_services import (
    get_all_coupons_service, add_coupon_service,
    edit_coupon_service, delete_coupon_service
)

coupon_admin_bp = Blueprint('coupon_admin_bp', __name__)

@coupon_admin_bp.route('/coupon', methods=['GET'])
@jwt_required()
def get_coupons():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền truy cập dữ liệu này"}), 403

    status_filter = request.args.get('status')
    raw_coupons = get_all_coupons_service()

    coupon_list = []
    for c in raw_coupons:
        if status_filter and c.status != status_filter:
            continue

        coupon_list.append({
            'coupon_id': c.coupon_id,
            "description": c.description,
            "discount_percent": c.discount_percent,
            'discount_value': float(c.discount_value) if c.discount_value else 0,
            'discount_type': c.discount_type,
            'min_purchase': float(c.min_purchase) if c.min_purchase else 0,
            'max_discount': float(c.max_discount) if c.max_discount else 0,
            'begin_date': c.begin_date,
            'end_date': c.end_date,
            'status': c.status,
            'created_at': c.created_at,
        })

    return jsonify(coupon_list), 200


@coupon_admin_bp.route('/add_coupon', methods=['POST'])
@jwt_required()
def add_coupon():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    data = request.json
    try:
        new_coupon = add_coupon_service(data)
        return jsonify({"message": "Thêm mã giảm giá thành công", "id": new_coupon.coupon_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@coupon_admin_bp.route('/update_coupon/<int:coupon_id>', methods=['PUT'])
@jwt_required()
def update_coupon(coupon_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền chỉnh sửa dữ liệu"}), 403

    data = request.json
    if edit_coupon_service(coupon_id, data):
        return jsonify({"message": "Cập nhật thành công"}), 200
    return jsonify({"error": "Không tìm thấy mã giảm giá"}), 404

@coupon_admin_bp.route('/delete_coupon/<int:coupon_id>', methods=['DELETE'])
@jwt_required()
def delete_coupon(coupon_id):
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền xóa dữ liệu"}), 403

    if delete_coupon_service(coupon_id):
        return jsonify({"message": "Xóa mã giảm giá thành công"}), 200
    return jsonify({"error": "Không tìm thấy mã giảm giá"}), 404