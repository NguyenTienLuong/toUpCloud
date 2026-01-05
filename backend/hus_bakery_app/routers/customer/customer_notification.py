from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from hus_bakery_app.services.customer.notification_services import (
    check_pending_reviews_for_customer,
    mark_customer_notification_read,
    get_new_success_order_notification,
    get_all_success_order_notifications
)
from hus_bakery_app.models.customer_notifications import CustomerNotification

customer_noti_bp = Blueprint("customer_noti", __name__)


@customer_noti_bp.route("/pending-reviews", methods=["GET"])
@jwt_required()
def get_pending_reviews():
    # Lấy thông tin khách hàng từ Token
    identity = json.loads(get_jwt_identity())
    customer_id = identity["id"]

    # Gọi hàm service bạn đã viết
    notifications = check_pending_reviews_for_customer(customer_id)

    return jsonify({
        "success": True,
        "data": notifications
    }), 200

@customer_noti_bp.route("/mark-read/<int:order_id>", methods=["POST"])
@jwt_required()
def mark_as_read(order_id):
    """
    API để Frontend gọi sau khi khách hàng nhấn vào đơn hàng hoặc hoàn tất đánh giá.
    """
    success = mark_customer_notification_read(order_id)
    if success:
        return jsonify({"success": True, "message": "Đã đánh dấu đã đọc"}), 200
    return jsonify({"success": False, "message": "Không tìm thấy thông báo"}), 404


@customer_noti_bp.route('/all_notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    # 1. Lấy tham số page và per_page từ query string (mặc định page=1, per_page=10)
    identity = json.loads(get_jwt_identity())
    customer_id = identity["id"]

    page = request.args.get('page', default=1, type=int)
    per_page = 10

    # 2. Gọi hàm xử lý logic với tham số phân trang
    # Kết quả trả về là một dict: {"items": [...], "total_pages": ..., "current_page": ..., "total_items": ...}
    result = get_all_success_order_notifications(customer_id, page=page, per_page=per_page)

    # 3. Kiểm tra nếu danh sách items trống
    if not result['items']:
        return jsonify({
            "status": "success",
            "message": "Không có thông báo mới",
            "data": [],
            "pagination": {
                "total_items": 0,
                "total_pages": 0,
                "current_page": page
            }
        }), 200

    # 4. Trả về dữ liệu kèm thông tin phân trang
    return jsonify({
        "status": "success",
        "data": result['items'],
        "pagination": {
            "total_items": result['total_items'],
            "total_pages": result['total_pages'],
            "current_page": result['current_page'],
            "per_page": per_page
        }
    }), 200


@customer_noti_bp.route("/check-status", methods=["GET"])
@jwt_required()
def check_notification_status():
    """
    API CỰC NHẸ để polling mỗi 5s
    Chỉ trả về: tổng số thông báo + latest_id
    Frontend dùng để detect có thông báo mới không
    """
    try:
        identity = json.loads(get_jwt_identity())
        customer_id = identity["id"]

        # Đếm TỔNG SỐ thông báo (tất cả, không phân biệt đã đọc)
        total_count = CustomerNotification.query.filter_by(
            customer_id=customer_id
        ).count()

        # Lấy ID của notification mới nhất
        latest = CustomerNotification.query.filter_by(
            customer_id=customer_id
        ).order_by(CustomerNotification.created_at.desc()).first()

        return jsonify({
            "success": True,
            "total_count": total_count,
            "latest_id": latest.id if latest else None
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@customer_noti_bp.route("/check-latest-success", methods=["GET"])
@jwt_required()
def check_latest_success():
    identity = json.loads(get_jwt_identity())
    customer_id = identity["customer_id"]

    order_notification = get_new_success_order_notification(customer_id)

    if order_notification:
        return jsonify({
            "success": True,
            "data": order_notification
        }), 200

    return jsonify({
        "success": False,
        "message": "Không có đơn hàng mới hoàn thành"
    }), 200