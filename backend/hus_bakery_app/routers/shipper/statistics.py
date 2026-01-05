from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from hus_bakery_app.services.shipper.shipper_statistics_service import (
    count_total_orders,
    count_successful_orders,
    count_failed_orders,
    calculate_avg_rating,
    get_shipper_all_order_history
)

shipper_stats_bp = Blueprint("shipper_stats", __name__)


# Hàm tiện ích để lấy shipper_id từ token (đỡ phải viết lại nhiều lần)
def get_current_shipper_id():
    identity_str = get_jwt_identity()
    try:
        if isinstance(identity_str, str):
            identity = json.loads(identity_str)
        else:
            identity = identity_str
        return identity.get("id"), identity.get("role")
    except:
        return None, None


# API 1: Lấy tổng đơn hàng
@shipper_stats_bp.route("/stats/total-orders", methods=["GET"])
@jwt_required()
def api_total_orders():
    shipper_id, role = get_current_shipper_id()
    if role != "shipper": return jsonify({"message": "Forbidden"}), 403

    total = count_total_orders(shipper_id)
    return jsonify({"status": "success", "data": total}), 200


# API 2: Lấy đơn thành công
@shipper_stats_bp.route("/stats/successful", methods=["GET"])
@jwt_required()
def api_successful_orders():
    shipper_id, role = get_current_shipper_id()
    if role != "shipper": return jsonify({"message": "Forbidden"}), 403

    count = count_successful_orders(shipper_id)
    return jsonify({"status": "success", "data": count}), 200


# API 3: Lấy đơn thất bại
@shipper_stats_bp.route("/stats/failed", methods=["GET"])
@jwt_required()
def api_failed_orders():
    shipper_id, role = get_current_shipper_id()
    if role != "shipper": return jsonify({"message": "Forbidden"}), 403

    count = count_failed_orders(shipper_id)
    return jsonify({"status": "success", "data": count}), 200


# API 4: Lấy điểm đánh giá (Sao)
@shipper_stats_bp.route("/stats/rating", methods=["GET"])
@jwt_required()
def api_rating():
    shipper_id, role = get_current_shipper_id()
    if role != "shipper": return jsonify({"message": "Forbidden"}), 403

    rating = calculate_avg_rating(shipper_id)
    return jsonify({"status": "success", "data": rating}), 200


@shipper_stats_bp.route("/history", methods=["GET"])
@jwt_required()
def api_shipper_history():
    shipper_id, role = get_current_shipper_id()
    if role != "shipper": return jsonify({"message": "Forbidden"}), 403

    # Lấy tham số phân trang từ URL
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)

    # Gọi hàm xử lý
    result = get_shipper_all_order_history(shipper_id, page, limit)

    return jsonify({
        "status": "success",
        "data": result["data"],
        "pagination": result["pagination"]
    }), 200