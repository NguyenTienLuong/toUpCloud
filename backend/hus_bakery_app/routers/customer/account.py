from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.services.customer.account_services import update_profile, change_password, update_avatar, \
    total_amount_of_customer, get_customer_rank_service, get_order_history_service, get_latest_active_order_id, \
    get_product_was_bought, get_branch_detail
from hus_bakery_app.models.customer import Customer
import json
from hus_bakery_app.services.customer.order_services import get_order_detail_service

account_bp = Blueprint("account", __name__)


@account_bp.route("/rank", methods=["GET"])
@jwt_required()
def rank():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str)
    current_user_id = identity["id"]
    total_amount = total_amount_of_customer(current_user_id)
    rank = get_customer_rank_service(total_amount)

    return jsonify({
        "customer_id": current_user_id,
        "total_amount_spent": total_amount,
        "rank": rank
    }), 200

@account_bp.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def profile_api():
    identity_str = get_jwt_identity()  # Lúc này là chuỗi '{"id": 17, "role": "customer"}'

    try:
        identity = json.loads(identity_str)
        current_user_id = identity["id"]
    except Exception:
        # Phòng trường hợp Token cũ vẫn còn là dạng số
        current_user_id = identity_str

    user = Customer.query.get(current_user_id)
    if not user:
        return jsonify({"message": "Không tìm thấy người dùng"}), 404

    if request.method == "GET":
        return jsonify({
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "avatar": f"/static/avatars/{user.avatar}" if user.avatar else None
        })

    # Xử lý PUT
    data = request.get_json()
    success, msg = update_profile(current_user_id, data)
    # Trả về key "message" để Frontend dễ đọc
    return jsonify({"message": msg}), (200 if success else 400)


@account_bp.route("/avatar", methods=["POST"])
@jwt_required()
def update_avatar_api():
    identity = get_jwt_identity()
    current_user_id = identity["id"]

    if "avatar" not in request.files:
        return jsonify({"message": "Không tìm thấy file"}), 400

    file = request.files["avatar"]
    success, result = update_avatar(current_user_id, file)

    if success:
        return jsonify({"status": "success", "avatar_url": result}), 200
    return jsonify({"status": "fail", "message": result}), 400


@account_bp.route(
    "/change-password",
    methods=["PUT"],
)
@jwt_required()
def change_password_api():
    identity = get_jwt_identity()
    user_data = json.loads(identity) if isinstance(identity, str) else identity
    current_user_id = user_data.get("id")
    current_role = user_data.get("role")
    data = request.json

    success, msg = change_password(
        role=current_role,
        id=current_user_id,
        old_password=data.get("old_password"),
        new_password=data.get("new_password"),
        confirm_password=data.get("confirm_password"),
    )

    return jsonify({"success": success, "message": msg}), (200 if success else 400)


@account_bp.route("/order_history", methods=["GET"])
@jwt_required()
def history_api():
    identity_str = get_jwt_identity()
    try:
        identity = json.loads(identity_str)
        current_user_id = identity["id"]
    except Exception:
        current_user_id = identity_str

    data = get_order_history_service(current_user_id)

    return jsonify({
        "status": "success",
        "data": data
    }), 200


@account_bp.route("/current-active-order", methods=["GET"])
@jwt_required()
def api_get_current_order():
    identity = json.loads(get_jwt_identity())
    customer_id = identity["id"]

    # Bước 1: Tìm ID đơn hàng active mới nhất
    orders, error = get_latest_active_order_id(customer_id)

    if error:
        return jsonify({"message": error}), 500

    result = [
        {
            "order_id": order_id,
            "status": status
        }
        for order_id, status in orders
    ]

    return jsonify(result), 200

@account_bp.route("/bought_products", methods=["GET"])
@jwt_required()
def api_get_bought_products():
    try:
        identity_data = get_jwt_identity()
        if isinstance(identity_data, str):
            identity = json.loads(identity_data)
        else:
            identity = identity_data

        customer_id = identity.get("id")

        if not customer_id:
            return jsonify({
                "status": "error",
                "total": None,
                "message": "Không tìm thấy ID khách hàng trong token"
            }), 400

        products = get_product_was_bought(customer_id)

        return jsonify({
            "status": "success",
            "total": len(products),
            "data": products
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "total": None,
            "message": f"Đã xảy ra lỗi: {str(e)}"
        }), 500


@account_bp.route("/branch_detail", methods=["GET"])
def api_get_branch_info():
    details = get_branch_detail()

    return jsonify({
        "status": "success",
        "details": details
    }), 200