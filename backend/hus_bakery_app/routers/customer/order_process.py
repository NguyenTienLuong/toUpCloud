from unittest import result
from flask import Blueprint, json, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.models.order import Order
from hus_bakery_app.services.customer.cart_services import (
    add_to_cart,
    update_selected,
    get_cart,
    coupon_of_customer,
    coupon_info,
    remove_from_cart,
    update_cart_quantity
)
from ...models.order import Order
from hus_bakery_app.services.customer.order_services import create_order, get_order_detail_service

order_bp = Blueprint("order_bp", __name__)


# ==========================
# 1. GET CART
# ==========================
@order_bp.route("/cart", methods=["GET"])
@jwt_required()
def api_get_cart():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str)
    customer_id = identity["id"]
    cart = get_cart(customer_id)
    return jsonify(cart), 200


@order_bp.route("/addToCart", methods=["POST"])
def api_add_to_cart():
    data = request.json
    customer_id = data.get("customer_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    item = add_to_cart(customer_id, product_id, quantity)
    # Lưu ý: item có thể là object, cần lấy product_id để trả về json
    return jsonify({"message": "Added to cart", "item": item.product_id}), 200


# ==========================
# 2. CHANGE QUANTITY
# ==========================
@order_bp.route("/changeQuantity", methods=["POST"])
@jwt_required()
def api_change_quantity():
    # ✅ LẤY customer_id TỪ JWT
    identity = json.loads(get_jwt_identity())
    customer_id = identity["id"]
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    item = update_cart_quantity(customer_id, product_id, quantity)
    # Lưu ý: item có thể là object, cần lấy product_id để trả về json
    if item is None:
        return jsonify({"error": "Item not found"}), 404

    if item == "deleted":
        return jsonify({
            "message": "Item removed from cart",
            "product_id": product_id
        }), 200

    # result là CartItem object
    return jsonify({
        "message": "Quantity updated",
        "item": {
            "product_id": item.product_id,
            "quantity": item.quantity
        }
    }), 200


# ==========================
# 3. UPDATE SELECTED ITEM
# ==========================
@order_bp.route("/cart/select", methods=["PUT"])
def api_update_selected():
    data = request.json
    customer_id = data.get("customer_id")
    product_id = data.get("product_id")
    selected = data.get("selected")

    item = update_selected(customer_id, product_id, selected)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"message": "Selection updated"}), 200


# ==========================
# 4. GET COUPONS OF CUSTOMER
# ==========================
@order_bp.route("/my-coupons", methods=["GET"])
@jwt_required()
def my_coupons():
    identity_str = get_jwt_identity()
    identity = json.loads(identity_str)
    customer_id = identity["id"]
    coupons = coupon_of_customer(customer_id)
    return jsonify(coupons), 200


# ==========================
# 5. GET COUPON INFO
# ==========================
@order_bp.route("/coupon/info/<int:coupon_id>", methods=["GET"])
def api_coupon_info(coupon_id):
    info = coupon_info(coupon_id)
    if not info:
        return jsonify({"error": "Invalid coupon"}), 400

    return jsonify(info), 200


# ==========================
# 6. CREATE ORDER
# ==========================
@order_bp.route("/order", methods=["POST"])
@jwt_required()
def api_create_order():
    identity = json.loads(get_jwt_identity())
    customer_id = identity["id"]
    data = request.json

    order, msg = create_order(
        customer_id=customer_id,
        recipient_name=data.get("recipient_name"),
        payment_method=data.get("payment_method"),
        total_amount=data.get("total_amount"),
        phone=data.get("phone"),
        branch_id=data.get("branch_id"),
        shipping_address=data.get("shipping_address"),
        note=data.get("note"),
        coupon_id=data.get("coupon_id"),
    )

    if not order:
        return jsonify({"error": msg}), 400

    return jsonify({
        "message": msg,
        "order_id": order.shipper_id
    }), 200


@order_bp.route("/cart/remove", methods=["DELETE"])
@jwt_required()
def api_remove_from_cart():
    # ✅ LẤY customer_id TỪ JWT
    identity = json.loads(get_jwt_identity())
    customer_id = identity["id"]

    data = request.json
    product_id = data.get("product_id")

    if not product_id:
        return jsonify({"error": "Missing product_id"}), 400

    success = remove_from_cart(customer_id, product_id)

    if not success:
        return jsonify({"error": "Item not found in cart"}), 404

    return jsonify({"message": "Item removed from cart"}), 200


@order_bp.route("/order_details", methods=["POST"])
def api_order_details():
    data = request.json
    order_id = data.get("order_id")
    # ⭐ THÊM DEBUG
    print(f"DEBUG - data: {data}")
    print(f"DEBUG - order_id: {order_id}")
    print(f"DEBUG - type(order_id): {type(order_id)}")
    order_detail, msg = get_order_detail_service(order_id)
    if not order_detail:
        return jsonify({"error": msg}), 400
    return jsonify({
        "status": "success",
        "data": order_detail
    }), 200